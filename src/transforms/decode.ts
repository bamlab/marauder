import { Transform } from "stream";
import { TransformCallback } from "../types/stream";

class Decoder extends Transform {
  _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {
    callback(null, chunk.toString().toLowerCase());
  }
}

export const decode = new Decoder();
