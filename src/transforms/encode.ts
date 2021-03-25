import { Transform } from "stream";

class Encoder extends Transform {
  _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {
    callback(null, chunk.toString().toUpperCase());
  }
}

export const encode = new Encoder();
