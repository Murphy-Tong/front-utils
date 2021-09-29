"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MulityBody = exports.Part = void 0;
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var RequestBody = /** @class */ (function () {
    function RequestBody() {
    }
    RequestBody.prototype.writeTo = function (_, countbytes) {
        if (countbytes === void 0) { countbytes = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, countbytes ? 0 : 0];
            });
        });
    };
    return RequestBody;
}());
var StringBody = /** @class */ (function (_super) {
    __extends(StringBody, _super);
    function StringBody(value) {
        var _this = _super.call(this) || this;
        _this.buffer = Buffer.from(value);
        return _this;
    }
    StringBody.prototype.writeTo = function (stream, countbytes) {
        if (countbytes === void 0) { countbytes = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                countbytes && stream.write(this.buffer);
                return [2 /*return*/, this.buffer.length];
            });
        });
    };
    StringBody.create = function (value) {
        return new StringBody(value);
    };
    return StringBody;
}(RequestBody));
var FileBody = /** @class */ (function (_super) {
    __extends(FileBody, _super);
    function FileBody(filePath) {
        var _this = _super.call(this) || this;
        _this.filePath = filePath;
        return _this;
    }
    FileBody.prototype.writeTo = function (stream, countbytes) {
        if (countbytes === void 0) { countbytes = false; }
        return __awaiter(this, void 0, void 0, function () {
            var is;
            return __generator(this, function (_a) {
                is = fs.createReadStream(this.filePath, {
                    encoding: "binary",
                    autoClose: false,
                });
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var length = 0;
                        is.on("data", function (buf) {
                            length += buf.length;
                            countbytes && stream.write(buf);
                        });
                        is.once("end", function () {
                            is.close();
                        });
                        is.once("close", function () {
                            resolve(length);
                        });
                        is.once("error", reject);
                        is.read();
                    })];
            });
        });
    };
    FileBody.create = function (filePath) {
        return new FileBody(filePath);
    };
    return FileBody;
}(RequestBody));
var Part = /** @class */ (function () {
    function Part(body, headers) {
        this.body = body;
        this.headers = headers;
    }
    Part.create = function (name, value, filePath, fileName) {
        var headers = {};
        if (filePath) {
            fileName = fileName || path.parse(filePath.toString()).base;
        }
        // Content-Disposition: form-data; name="file"; filename="vue.md"
        if (fileName) {
            headers["Content-Disposition"] = "form-data; name=\"" + name + "\"; filename=\"" + fileName + "\"";
            headers["Content-Type"] = "application/octet-stream";
        }
        else {
            headers["Content-Disposition"] = "form-data; name=\"" + name + "\"";
        }
        var body;
        if (filePath) {
            body = FileBody.create(filePath);
        }
        else {
            body = StringBody.create(value || "");
        }
        var part = new Part(body, headers);
        return part;
    };
    return Part;
}());
exports.Part = Part;
var MulityBody = /** @class */ (function (_super) {
    __extends(MulityBody, _super);
    function MulityBody() {
        var _this = _super.call(this) || this;
        _this._parts = [];
        _this._boundary = Buffer.from("----WebKitFormBoundary8GhhQudAXmGK3zlb");
        return _this;
    }
    Object.defineProperty(MulityBody.prototype, "parts", {
        get: function () {
            return this._parts;
        },
        enumerable: false,
        configurable: true
    });
    MulityBody.prototype.add = function (part) {
        this._parts.push(part);
        return this;
    };
    /**
     * 获取body长度
     * @returns
     */
    MulityBody.prototype.countLength = function () {
        return this.writeTo(null);
    };
    /**
     * 写入body到流中
     * @param stream 写入流，为null时不写入，只返回body的总长度
     * @returns 写入数据的长度
     */
    MulityBody.prototype.writeTo = function (stream) {
        return __awaiter(this, void 0, void 0, function () {
            var byteCount, streamProxy, _loop_1, this_1, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        byteCount = 0;
                        streamProxy = {
                            write: function (data) {
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
                        _loop_1 = function (i) {
                            var part, headers, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        part = this_1.parts[i];
                                        streamProxy.write(MulityBody.BOUNDARY_START);
                                        streamProxy.write(this_1._boundary);
                                        streamProxy.write(MulityBody.CRLF);
                                        headers = part.headers || {};
                                        Object.keys(headers).forEach(function (key) {
                                            streamProxy.write(key);
                                            streamProxy.write(MulityBody.DOT);
                                            streamProxy.write(headers[key]);
                                            streamProxy.write(MulityBody.CRLF);
                                        });
                                        streamProxy.write(MulityBody.CRLF);
                                        _b = byteCount;
                                        return [4 /*yield*/, part.body.writeTo(stream, !!stream)];
                                    case 1:
                                        byteCount = _b + _c.sent();
                                        streamProxy.write(MulityBody.CRLF);
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.parts.length)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1(i)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        streamProxy.write(MulityBody.BOUNDARY_START);
                        streamProxy.write(this._boundary);
                        streamProxy.write(MulityBody.BOUNDARY_START);
                        streamProxy.write(MulityBody.CRLF);
                        return [2 /*return*/, byteCount];
                }
            });
        });
    };
    MulityBody.BOUNDARY_START = Buffer.from("--");
    MulityBody.CRLF = Buffer.from("\r\n");
    MulityBody.DOT = Buffer.from(": ");
    return MulityBody;
}(RequestBody));
exports.MulityBody = MulityBody;
