import { EncryptionEngine } from "../encryption/interface";
import { UXEngine } from "../userInterface/interface";

type Path = string;

/**
 * Define the set of capabilities a repository must have.
 *
 * For now the unique implementation is Git, later on it can be also Mercurial, GridFS, ....
 *
 * @export
 * @interface RepositoryEngine
 */
export interface RepositoryEngine {
  /**
   * uxEngine to provides log, or cli ux
   *
   * @type {UXEngine}
   * @memberof RepositoryEngine
   */
  uxEngine: UXEngine;

  // #region engine

  /**
   * Get the name of the io engine
   *
   * Eg: "Git" (later on "Hg", "S3", ect)
   *
   * @type {string}
   * @memberof RepositoryEngine
   */
  engineName: string;

  /**
   * Check if the engine is `<name>` and return a boolean
   *
   * @param {string} name
   * @returns {boolean}
   * @memberof RepositoryEngine
   */
  isEngine(name: string): boolean;

  // #endregion engine

  // -------------------------------------------------------------------

  // #region safety-checks & status

  /**
   * Run a serial of safety check to determine if the backend is healthy.
   *
   * Eg: a git backend must be inside a git directory
   *
   * @returns {Promise<boolean>}
   * @memberof RepositoryEngine
   */
  isHealthy(): Promise<boolean>;

  /**
   * Check the content are in a "clean" state were operation can be safely proceed, without data losses
   *
   * For git that means repository is clean and pushed (?)
   *
   * @returns {Promise<void>}
   * @memberof RepositoryEngine
   */
  isClean(): Promise<void>;

  // #endregion safety-checks & status

  // -------------------------------------------------------------------

  // #region command

  /**
   * Check the parent process and return if it is launched by an internal command
   *
   * Eg, git filter clean must be run by git, not directly
   *
   * @returns {Promise<boolean>}
   * @memberof RepositoryEngine
   */
  isProcessInternal(): Promise<boolean>;

  /**
   * Check the parent process and return if it is not launched by an internal command
   *
   * @returns {Promise<boolean>}
   * @memberof RepositoryEngine
   */
  isProcessExternal(): Promise<boolean>;

  /**
   * Check the parent process and return if it is not launched by an internal command.
   * Also check if the process is interactive
   *
   * @returns {Promise<void>}
   * @memberof RepositoryEngine
   */
  isProcessExternalAndInteractive(): Promise<void>;

  // #endregion command

  // -------------------------------------------------------------------

  // #region io

  /**
   * Check the raw content of a file, without conversion.
   *
   * For git that the blob content, that will be visible to
   * external users that have no keys to decrypt.
   *
   * @param {Path} filePath
   * @returns {Promise<string>}
   * @memberof RepositoryEngine
   */
  getRawContent(filePath: Path): Promise<string>;

  /**
   * Check the converted content of a file.
   *
   * For git that the working directory content, that will be
   * visible to users that have install and configure marauder.
   *
   * @param {Path} filePath
   * @returns {Promise<string>}
   * @memberof RepositoryEngine
   */
  getConvertedContent(filePath: Path): Promise<string>;

  /**
   * List file paths matching a pattern
   *
   * Eg "*.env" will match "<root>/.env", "<root>/.prod.env", "<root>/some/path/.prod.env"
   *
   * @param {string} globPattern
   * @returns {Promise<string>}
   * @memberof RepositoryEngine
   */
  listFilePathsMatching(globPattern: string): Promise<Path[]>;

  /**
   * Given a glob, setup the repository so every clear files matching the glob will be encrypted
   *
   * @param {string} globPattern
   * @returns {Promise<void>}
   * @memberof RepositoryEngine
   */
  taintFiles(globPattern: string): Promise<void>;

  /**
   * Given a glob, remove encryption on file matching the taint
   *
   * @param {string} globPattern
   * @returns {Promise<void>}
   * @memberof RepositoryEngine
   */
  untaintFiles(globPattern: string): Promise<void>;

  /**
   * Given a glob, checks files taint status
   *
   * @param {string} globPattern
   * @returns {Promise<void>}
   * @memberof RepositoryEngine
   */
  checkFilesTaintStatus(globPattern: string): Promise<{ path: Path; status: "cleartext" | "encrypted" }>;

  /**
   * Transform a cleartext stream into an ciphertext stream
   *
   * @type {TransformStream}
   * @memberof RepositoryEngine
   */
  encryptStream: TransformStream;

  /**
   * Transform a ciphertext stream into an cleartext stream
   *
   * @type {TransformStream}
   * @memberof RepositoryEngine
   */
  decryptStream: TransformStream;

  // #endregion io

  // #region config

  /**
   * Checks if marauder is initialized in the current repository
   *
   * @returns {Promise<string>}
   * @memberof RepositoryEngine
   */
  isInitialized(): Promise<string>;

  /**
   * Checks if marauder is initialized in the current repository
   *
   * @returns {Promise<string>}
   * @memberof RepositoryEngine
   */
  initialized(secureEngine: EncryptionEngine): Promise<string>;

  // #endregion config

  // #region secretkey

  /**
   * Check if the repository has a secret key configured
   *
   * @returns {Promise<boolean>}
   * @memberof RepositoryEngine
   */
  hasSecretKey(): Promise<boolean>;

  /**
   * Configure the repository secret key
   *
   * @returns {Promise<boolean>}
   * @memberof RepositoryEngine
   */
  setSecretKey(secretKey: Buffer): Promise<void>;

  // #endregion secretkey
}
