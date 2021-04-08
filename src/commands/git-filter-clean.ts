import { Command } from "@oclif/command";

import { ConfigService } from "../services/config";
import { Encoder } from "../transforms/encode";
import { ProcessUtils } from "../utils/process";

/**
 * (Used by git, not for direct usage) Encode file
 *
 * When committing file, encode them before storing them in blob.
 *
 * @export
 * @class GitFilterClean
 * @extends {Command}
 */
export default class GitFilterClean extends Command {
  static hidden = true;

  static description = "(Git command) When staging and committing, encode files.";

  // TODO: add debug https://oclif.io/docs/debugging
  async run(): Promise<void> {
    // TODO: use monadic result struct
    const [isNotTTY, ttyError] = await ProcessUtils.isNotTTY();
    // TODO: create an invariant(condition, error)
    !isNotTTY && this.error(ttyError);

    // TODO: use monadic result struct
    const [isLaunchedByGit, processError] = await ProcessUtils.isLaunchedByGit();
    // TODO: create an invariant(condition, error)
    !isLaunchedByGit && this.error(processError);

    const secretKey = await ConfigService.getSecretKey();
    !secretKey && this.error("Please generate a secretKey");

    // TODO: investigate how to display error in git (stderr ?)
    const encode = new Encoder(secretKey);
    process.stdin.pipe(encode).pipe(process.stdout);
  }
}
