import * as fs from "fs";
import * as path from "path";
import * as stream from "stream";

type Headers = { [key: string]: string };

class RequestBody {
  async writeTo(
    _: stream.Writable | null,
    countbytes: boolean = false
  ): Promise<number> {
    return countbytes ? 0 : 0;
  }
}

class StringBody extends RequestBody {
  buffer: Buffer;

  constructor(value: string) {
    super();
    this.buffer = Buffer.from(value);
  }

  async writeTo(stream: stream.Writable, countbytes: boolean = false) {
    countbytes && stream.write(this.buffer);
    return this.buffer.length;
  }

  static create(value: string) {
    return new StringBody(value);
  }
}

class FileBody extends RequestBody {
  filePath: fs.PathLike;
  constructor(filePath: fs.PathLike) {
    super();
    this.filePath = filePath;
  }

  async writeTo(stream: stream.Writable, countbytes = false) {
    const is = fs.createReadStream(this.filePath, {
      encoding: "binary",
      autoClose: false,
    });
    return new Promise<number>((resolve, reject) => {
      let length = 0;
      is.on("data", (buf: Buffer) => {
        length += buf.length;
        countbytes && stream.write(buf);
      });
      is.once("end", () => {
        is.close();
      });
      is.once("close", () => {
        resolve(length);
      });
      is.once("error", reject);
      is.read();
    });
  }

  static create(filePath: fs.PathLike) {
    return new FileBody(filePath);
  }
}

export class Part {
  body: RequestBody;
  headers: Headers;

  constructor(body: RequestBody, headers: Headers) {
    this.body = body;
    this.headers = headers;
  }

  static create(
    name: string,
    value: string | null,
    filePath?: fs.PathLike,
    fileName?: string
  ) {
    const headers: Headers = {};
    if (filePath) {
      fileName = fileName || path.parse(filePath.toString()).base;
    }
    // Content-Disposition: form-data; name="file"; filename="vue.md"
    if (fileName) {
      headers[
        "Content-Disposition"
      ] = `form-data; name="${name}"; filename="${fileName}"`;
      headers["Content-Type"] = "application/octet-stream";
    } else {
      headers["Content-Disposition"] = `form-data; name="${name}"`;
    }
    let body;
    if (filePath) {
      body = FileBody.create(filePath);
    } else {
      body = StringBody.create(value || "");
    }
    const part = new Part(body, headers);
    return part;
  }
}

export class MulityBody extends RequestBody {
  static BOUNDARY_START = Buffer.from("--");
  static CRLF = Buffer.from("\r\n");
  static DOT = Buffer.from(": ");

  _parts: Part[] = [];
  _boundary = Buffer.from("----WebKitFormBoundary8GhhQudAXmGK3zlb");

  constructor() {
    super();
  }

  get parts(): Part[] {
    return this._parts;
  }

  add(part: Part): MulityBody {
    this._parts.push(part);
    return this;
  }

  /**
   * 获取body长度
   * @returns
   */
  countLength() {
    return this.writeTo(null);
  }

  /**
   * 写入body到流中
   * @param stream 写入流，为null时不写入，只返回body的总长度
   * @returns 写入数据的长度
   */
  async writeTo(stream: stream.Writable | null) {
    let byteCount = 0;
    const streamProxy = {
      write: (data: Buffer | string) => {
        if (!(data instanceof Buffer)) {
          data = Buffer.from(data);
        }
        byteCount += data.length;
        if (!stream) {
          return;
        }
        stream.write(data);
      },
    };
    for (let i = 0; i < this.parts.length; i++) {
      const part = this.parts[i];
      streamProxy.write(MulityBody.BOUNDARY_START);
      streamProxy.write(this._boundary);
      streamProxy.write(MulityBody.CRLF);
      const headers = part.headers || {};
      Object.keys(headers).forEach((key) => {
        streamProxy.write(key);
        streamProxy.write(MulityBody.DOT);
        streamProxy.write(headers[key]);
        streamProxy.write(MulityBody.CRLF);
      });
      streamProxy.write(MulityBody.CRLF);
      byteCount += await part.body.writeTo(stream, !!stream);
      streamProxy.write(MulityBody.CRLF);
    }
    streamProxy.write(MulityBody.BOUNDARY_START);
    streamProxy.write(this._boundary);
    streamProxy.write(MulityBody.BOUNDARY_START);
    streamProxy.write(MulityBody.CRLF);
    return byteCount;
  }
}
