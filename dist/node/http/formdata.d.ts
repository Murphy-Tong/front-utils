/// <reference types="node" />
import * as fs from "fs";
import * as stream from "stream";
declare type Headers = {
    [key: string]: string;
};
declare class RequestBody {
    writeTo(_: stream.Writable | null, countbytes?: boolean): Promise<number>;
}
export declare class Part {
    body: RequestBody;
    headers: Headers;
    constructor(body: RequestBody, headers: Headers);
    static create(name: string, value: string | null, filePath?: fs.PathLike, fileName?: string): Part;
}
export declare class MulityBody extends RequestBody {
    static BOUNDARY_START: Buffer;
    static CRLF: Buffer;
    static DOT: Buffer;
    _parts: Part[];
    _boundary: Buffer;
    constructor();
    get parts(): Part[];
    add(part: Part): MulityBody;
    /**
     * 获取body长度
     * @returns
     */
    countLength(): Promise<number>;
    /**
     * 写入body到流中
     * @param stream 写入流，为null时不写入，只返回body的总长度
     * @returns 写入数据的长度
     */
    writeTo(stream: stream.Writable | null): Promise<number>;
}
export {};
