import { Transform } from "stream";
import { CryptoService } from "../services/crypto";
import { TransformCallback } from "../types/stream";

export class Decoder extends Transform {
  constructor(private readonly secretKey: string) {
    super();
  }

  _transform(chunk: Buffer, encoding: BufferEncoding, callback: TransformCallback): void {
    CryptoService.decipherSecret(this.secretKey, chunk.toString()).then((data) => callback(null, data));
  }
}
