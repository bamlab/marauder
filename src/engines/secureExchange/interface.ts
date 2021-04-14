import { UXEngine } from "../userInterface/interface";

export interface SecureExchangeImportEngine {
  /**
   * uxEngine to provides log, or cli ux
   *
   * @type {UXEngine}
   * @memberof IOEngines
   */
  uxEngine: UXEngine;

  /**
   * A secure exchange engine is either "import" or "export"
   */
  kind: "import";

  /**
   * Return true if the engine can export
   *
   * @type {boolean}
   * @memberof SecureExchangeEngine
   */
  canExport: false;

  /**
   * Return true if the engine can import
   *
   * @type {boolean}
   * @memberof SecureExchangeEngine
   */
  canImport: true;

  /**
   * Given en encryptedMessage, decrypt and return the cleartext
   *
   * @param {Buffer} encryptedMessage
   * @returns {Promise<Buffer>}
   * @memberof SecureExchangeImportEngine
   */
  import(encryptedMessage: Buffer): Promise<Buffer>;

  /**
   * Serialize the import engine, so it can be stored and use later on
   *
   * @returns {Promise<Buffer>}
   * @memberof SecureExchangeImportEngine
   */
  serialize(): Promise<Buffer>;

  /**
   * Generate the export engine from the import engine
   *
   * @returns {SecureExchangeExportEngine}
   * @memberof SecureExchangeImportEngine
   */
  deriveExportEngine(): SecureExchangeExportEngine;
}

export interface SecureExchangeExportEngine {
  /**
   * uxEngine to provides log, or cli ux
   *
   * @type {UXEngine}
   * @memberof IOEngines
   */
  uxEngine: UXEngine;

  /**
   * A secure exchange engine is either "import" or "export"
   */
  kind: "export";

  /**
   * Return true if the engine can export
   *
   * @type {boolean}
   * @memberof SecureExchangeEngine
   */
  canExport: true;

  /**
   * Return true if the engine can import
   *
   * @type {boolean}
   * @memberof SecureExchangeEngine
   */
  canImport: false;

  /**
   * Given a cleartext, encrypt and return the encryptedMessage
   *
   * @param {Buffer} encryptedMessage
   * @returns {Promise<Buffer>}
   * @memberof SecureExchangeImportEngine
   */
  export(cleartext: Buffer): Promise<Buffer>;

  /**
   * Serialize the export engine so it can be transmitted and helps the one sending message to reconstruct export backend
   *
   * @returns {Promise<Buffer>}
   * @memberof SecureExchangeExportEngine
   */
  serialize(): Promise<Buffer>;
}
