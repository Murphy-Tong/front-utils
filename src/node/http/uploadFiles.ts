import * as https from "https";
import * as url from "url";
import * as http from "http";
import * as fs from "fs";
import { MulityBody, Part } from "./formdata.js";

export function uploadFile(
  urlValue: string | url.URL,
  dir = "",
  fileName: string,
  filePath: fs.PathLike
) {
  const formData = new MulityBody();
  formData
    .add(Part.create("dir", dir))
    .add(Part.create("filename", fileName))
    .add(Part.create("file", null, filePath));
  if (!(urlValue instanceof url.URL)) {
    urlValue = new url.URL(urlValue);
  }
  const targetProtocol = urlValue.protocol === "https:" ? https : http;
  const contentType = `multipart/form-data; boundary=${formData._boundary.toString(
    "utf-8"
  )}`;
  return new Promise<String>(async (rs, rj) => {
    const length = await formData.writeTo(null);
    const client = targetProtocol.request(
      urlValue,
      {
        method: "POST",
        headers: {
          "Content-Length": length,
          "Content-Type": contentType,
        },
      },
      (res) => {
        if (res.statusCode !== 200) {
          rj(new Error(res.statusMessage));
          return;
        }
        const bufs: Buffer[] = [];
        res.on("data", (buf) => {
          bufs.push(buf);
        });
        res.on("end", () => {
          let str = "";
          bufs.forEach((buf) => {
            str += buf.toString("utf-8");
          });
          const data = JSON.parse(str);
          client.destroy();
          if (data["success"] != 1) {
            rj(new Error(str));
          } else {
            rs(data["path"]);
          }
        });
      }
    );
    await formData.writeTo(client);
    client.end();
  });
}
