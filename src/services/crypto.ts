import { CryptographyKey, SodiumPlus } from "sodium-plus";

// TODO: add debug https://oclif.io/docs/debugging
export class CryptoService {
  static async generateRepositorySecretKey(): Promise<string> {
    const sodium = await SodiumPlus.auto();
    const key = await sodium.crypto_secretbox_keygen();
    return key.getBuffer().toString("base64");
  }

  static async cipherSecret(storedSecretKey: string, message: string): Promise<string> {
    const sodium = await SodiumPlus.auto();
    const plaintext = Buffer.from(message, "base64");
    const secretKey = CryptographyKey.from(storedSecretKey, "base64");
    const nonce = await sodium.crypto_generichash(plaintext, secretKey, 24); // https://security.stackexchange.com/questions/238134/can-i-hmac-my-plaintext-for-use-as-a-nacl-secretbox-nonce
    const ciphertext = await sodium.crypto_secretbox(plaintext, nonce, secretKey);
    return Buffer.concat([nonce, ciphertext]).toString("binary");
  }

  static async decipherSecret(storedSecretKey: string, cipheredMessage: string): Promise<string> {
    const sodium = await SodiumPlus.auto();
    const cipher = Buffer.from(cipheredMessage, "binary");
    const nonce = cipher.slice(0, 24);
    const ciphertext = cipher.slice(24, cipher.length);
    const secretKey = CryptographyKey.from(storedSecretKey, "base64");
    const cleartext = await sodium.crypto_secretbox_open(ciphertext, nonce, secretKey);
    return cleartext.toString("base64");
  }
}
