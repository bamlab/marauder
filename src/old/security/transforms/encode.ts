import { Transform } from "stream";
import { CryptoService } from "../crypto";

export class Encoder extends Transform {
  constructor(private readonly secretKey: string) {
    super();
  }

  _transform(chunk: Buffer, encoding: BufferEncoding, callback: TransformCallback): void {
    CryptoService.cipherSecret(this.secretKey, chunk.toString()).then((data) => callback(null, data));
  }
}
