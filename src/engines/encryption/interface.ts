import { UXEngine } from "../userInterface/interface";

export interface EncryptionEngine {
  /**
   * uxEngine to provides log, or cli ux
   *
   * @type {UXEngine}
   * @memberof IOEngines
   */
  uxEngine: UXEngine;

  /**
   * Given a clear text (as a Buffer), return a cipherMessage containing ciphertext (or link to it) and metadata
   *
   * Eg, for symmetric cryptography, the cipherMessage would likely contains:
   * - an header, identifying the algorithm
   * - a nonce, for algorithm IV (initialization vector)
   * - the cipher text, which contains encrypted message and authentication tag
   *
   * @param {Buffer} cleartext
   * @returns {Promise<{ cipherMessage: Buffer }>}
   * @memberof EncryptionEngine
   */
  encryptMessage(cleartext: Buffer): Promise<Buffer>;

  /**
   * Given a cipherMessage containing ciphertext and metadata, returns cleartext (as a Buffer)
   *
   * Eg, for symmetric cryptography, the cipherMessage would likely contains:
   * - an header, identifying the algorithm
   * - a nonce, for algorithm IV (initialization vector)
   * - the cipher text, which contains encrypted message and authentication tag
   *
   * @param {Buffer} cleartext
   * @returns {Promise<{ cipherMessage: Buffer }>}
   * @memberof EncryptionEngine
   */
  decryptMessage(cipherMessage: Buffer): Promise<Buffer>;

  /**
   * Given a cipherMessage containing ciphertext and metadata, returns wether this backend thinks the message is encrypted
   *
   * @param {Buffer} cleartext
   * @returns {Promise<{ cipherMessage: Buffer }>}
   * @memberof EncryptionEngine
   */
  isEncrypted(cleartext: Buffer): Promise<boolean>;
}
