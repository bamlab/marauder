import { CryptographyKey, SodiumPlus } from "sodium-plus";

// TODO: add debug https://oclif.io/docs/debugging
export class CryptoService {
  private static magicHeader = Buffer.from("~(Marauder)~\n");

  static async generateRepositorySecretKey(): Promise<string> {
    const sodium = await SodiumPlus.auto();
    const key = await sodium.crypto_secretbox_keygen();
    return key.getBuffer().toString("base64");
  }

  static async cipherSecret(storedSecretKey: string, message: string): Promise<string> {
    const sodium = await SodiumPlus.auto();
    // TODO: document why utf16le ?
    const plaintext = Buffer.from(message, "utf16le");
    const secretKey = CryptographyKey.from(storedSecretKey, "base64");
    const nonce = await sodium.crypto_generichash(plaintext, secretKey, sodium.CRYPTO_SECRETBOX_NONCEBYTES); // https://security.stackexchange.com/questions/238134/can-i-hmac-my-plaintext-for-use-as-a-nacl-secretbox-nonce
    const ciphertext = await sodium.crypto_secretbox(plaintext, nonce, secretKey);
    return Buffer.concat([this.magicHeader, nonce, ciphertext]).toString("utf16le");
  }

  static async decipherSecret(storedSecretKey: string, cipheredMessage: string): Promise<string> {
    const sodium = await SodiumPlus.auto();
    const cipher = Buffer.from(cipheredMessage, "binary");
    const magicHeader = cipher.slice(0, this.magicHeader.length);
    if (!magicHeader.equals(this.magicHeader)) {
      throw new Error("Incorrect magic Header");
    }
    const nonce = cipher.slice(this.magicHeader.length, this.magicHeader.length + sodium.CRYPTO_SECRETBOX_NONCEBYTES);
    const ciphertext = cipher.slice(this.magicHeader.length + sodium.CRYPTO_SECRETBOX_NONCEBYTES, cipher.length);
    const secretKey = CryptographyKey.from(storedSecretKey, "base64");
    const cleartext = await sodium.crypto_secretbox_open(ciphertext, nonce, secretKey);
    return cleartext.toString("utf16le");
  }

  static isEncrypted(cipheredMessage: string): boolean {
    const cipher = Buffer.from(cipheredMessage, "utf16le");
    const magicHeader = cipher.slice(0, this.magicHeader.length);
    if (!magicHeader.equals(this.magicHeader)) {
      return false;
    }
    return true;
  }
}
