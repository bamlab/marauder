import { Command } from "@oclif/command";

import { ConfigService } from "../old/config";
import { Decoder } from "../old/security/transforms/decode";
import { ProcessUtils } from "../old/utils/process";

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

    const secretKey = await ConfigService.getSecretKey();
    !secretKey && this.error("Please generate a secretKey");

    // TODO: investigate how to display error in git (stderr ?)
    const decode = new Decoder(secretKey);
    process.stdin.pipe(decode).pipe(process.stdout);
  }
}
