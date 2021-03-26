import { CryptographyKey, SodiumPlus, X25519PublicKey } from "sodium-plus";

export class CryptoService {
  static async generateRepositorySecretKey(): Promise<string> {
    const sodium = await SodiumPlus.auto();
    const key = await sodium.crypto_secretbox_keygen();
    return key.getBuffer().toString("base64");
  }

  static async generateClientKeypair(): Promise<string> {
    const sodium = await SodiumPlus.auto();
    const keypair = await sodium.crypto_kx_keypair();
    return keypair.getBuffer().toString("base64");
  }

  static async generateServerKeypair(): Promise<string> {
    const sodium = await SodiumPlus.auto();
    const keypair = await sodium.crypto_kx_seed_keypair("marauder");
    return keypair.getBuffer().toString("base64");
  }

  static async getPublicKey(storedKeyPair: string): Promise<string> {
    const sodium = await SodiumPlus.auto();
    const keypair = CryptographyKey.from(storedKeyPair, "base64");
    const key = await sodium.crypto_box_publickey(keypair);
    return key.getBuffer().toString("base64");
  }

  static async getServerExchangeKeypair(serverStoredKeypair: string, clientStoredPublicKey: string) {
    const sodium = await SodiumPlus.auto();
    const serverKeyPair = CryptographyKey.from(serverStoredKeypair, "base64");
    const serverSecretKey = await sodium.crypto_box_secretkey(serverKeyPair);
    const serverPublicKey = await sodium.crypto_box_publickey(serverKeyPair);
    const clientPublicKey = X25519PublicKey.from(clientStoredPublicKey, "base64");
    const [serverIncomingKey, serverOutgoingKey] = await sodium.crypto_kx_server_session_keys(
      serverPublicKey,
      serverSecretKey,
      clientPublicKey
    );
    return [serverIncomingKey.getBuffer().toString("base64"), serverOutgoingKey.getBuffer().toString("base64")];
  }

  static async getClientExchangeKeypair(clientStoredKeypair: string, serverStoredPublicKey: string) {
    const sodium = await SodiumPlus.auto();
    const clientKeyPair = CryptographyKey.from(clientStoredKeypair, "base64");
    const clientSecretKey = await sodium.crypto_box_secretkey(clientKeyPair);
    const clientPublicKey = await sodium.crypto_box_publickey(clientKeyPair);
    const serverPublicKey = X25519PublicKey.from(serverStoredPublicKey, "base64");
    const [clientIncomingKey, clientOutgoingKey] = await sodium.crypto_kx_client_session_keys(
      clientPublicKey,
      clientSecretKey,
      serverPublicKey
    );
    return [clientIncomingKey.getBuffer().toString("base64"), clientOutgoingKey.getBuffer().toString("base64")];
  }

  static async cipherSecret(storedSecretKey: string, message: string): Promise<[nonce: string, ciphertext: string]> {
    const sodium = await SodiumPlus.auto();
    const plaintext = Buffer.from(message, "base64");
    const secretKey = CryptographyKey.from(storedSecretKey, "base64");
    const nonce = await sodium.crypto_generichash(plaintext, secretKey, 24); // https://security.stackexchange.com/questions/238134/can-i-hmac-my-plaintext-for-use-as-a-nacl-secretbox-nonce
    const ciphertext = await sodium.crypto_secretbox(plaintext, nonce, secretKey);
    return [nonce.toString("base64"), ciphertext.toString("base64")];
  }

  static async decipherSecret(storedSecretKey: string, storedNonce: string, cipheredMessage: string): Promise<string> {
    const sodium = await SodiumPlus.auto();
    const ciphertext = Buffer.from(cipheredMessage, "base64");
    const nonce = Buffer.from(storedNonce, "base64");
    const secretKey = CryptographyKey.from(storedSecretKey, "base64");
    const cleartext = await sodium.crypto_secretbox_open(ciphertext, nonce, secretKey);
    return cleartext.toString("base64");
  }
}