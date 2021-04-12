type Path = string;

export interface IOEngineInterface {
  // #region engine

  /**
   * Get the name of the io engine
   *
   * Eg: "Git" (later on "Hg", "S3", ect)
   */
  engineName: string;

  /**
   * Check if the engine is `<name>` and return a boolean
   */
  isEngine(name: string): boolean;

  // #endregion engine

  // #region safety checks

  /**
   * Run a serial of safety check to determine if the backend
   *  is healthy.
   *
   * Eg a git backend must be inside a git directory
   */
  isHealthy(): Promise<boolean>;

  // #endregion safety checks

  // #region command

  /**
   * Check the parent process and return if it is launched
   * by an internal command
   *
   * Eg, git filter clean must be run by git, not directly
   */
  isProcessInternal(): Promise<boolean>;

  /**
   * Check the parent process and return if it is not launched
   * by an internal command
   */
  isProcessExternal(): Promise<boolean>;

  /**
   * Check the parent process and return if it is not launched
   * by an internal command.
   * Also check if the process is interactive
   */
  isProcessExternalAndInteractive(): Promise<void>;

  // #endregion command

  // #region status

  /**
   * Check the content are in a "clean" state were operation
   * can be safely proceed, without data losses.
   *
   * For git that means repository is clean and pushed (?)
   */
  isClean(): Promise<void>;

  // #endregion status

  // #region io

  /**
   * Check the raw content of a file, without conversion.
   *
   * For git that the blob content, that will be visible to
   * external users that have no keys to decrypt.
   */
  getRawContent(filePath: Path): Promise<string>;

  /**
   * Check the converted content of a file.
   *
   * For git that the working directory content, that will be
   * visible to users that have install and configure marauder.
   */
  getConvertedContent(filePath: Path): Promise<string>;

  // TODO: document
  getFilePathsMatching(globPattern: string): Promise<string>;

  // #endregion io

  // TODO: document
  isConfigured(): Promise<string>;

  // TODO: document
  getSecretKey(key: string, value: string): Promise<void>;
}
