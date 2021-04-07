import { Command } from "@oclif/command";

import { decode } from "../transforms/decode";
import { ProcessUtils } from "../utils/process";

/**
 * (Used by git, not for direct usage) Decode file
 *
 * When viewing file, decode the blob them before writing them in directory.
 *
 * @export
 * @class GitFilterClean
 * @extends {Command}
 */
export default class GitFilterSmudge extends Command {
  static hidden = true;

  // TODO: clean up description
  static description = "(Git command) When fetching and pulling, decode files.";

  // TODO: add debug https://oclif.io/docs/debugging
  async run(): Promise<void> {
    // TODO: use monadic result struct
    const [isNotTTY, ttyError] = await ProcessUtils.isLaunchedByGit();
    // TODO: create an invariant(condition, error)
    !isNotTTY && this.error(ttyError);

    // TODO: use monadic result struct
    const [isLaunchedByGit, processError] = await ProcessUtils.isLaunchedByGit();
    // TODO: create an invariant(condition, error)
    !isLaunchedByGit && this.error(processError);

    // TODO: investigate how to display error in git (stderr ?)
    process.stdin.pipe(decode).pipe(process.stdout);
  }
}
