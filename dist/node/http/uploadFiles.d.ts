/// <reference types="node" />
import * as url from "url";
import * as fs from "fs";
export declare function uploadFile(urlValue: string | url.URL, dir: string | undefined, fileName: string, filePath: fs.PathLike): Promise<String>;
