export interface UXEngine {
  /**
   * Log an error, and exit with status code 1
   *
   * @param {string} key
   * @memberof UXEngine
   */
  error(key: string): void;

  /**
   * Log a warning
   *
   * @param {string} key
   * @memberof UXEngine
   */
  warn(key: string): void;

  /**
   * Log a normal log
   *
   * @param {string} key
   * @memberof UXEngine
   */
  log(key: string): void;

  /**
   * Log a debug log
   *
   * @param {string} key
   * @memberof UXEngine
   */
  debug(key: string): void;

  /**
   * Assert a condition is true, or log an error and exit with status code 1
   *
   * @param {string} key
   * @memberof UXEngine
   */
  assert(condition: string): void;

  /**
   * Assert a condition is true, or log a warning
   *
   * @param {string} key
   * @memberof UXEngine
   */
  check(condition: string): void;
}
