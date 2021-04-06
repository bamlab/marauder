import { Command } from "@oclif/command";

import { encode } from "../transforms/encode";
import { ProcessUtils } from "../utils/process";

// TODO: rename to GitFilterClean
export default class Clean extends Command {
  static hidden = true;

  static description = "(Git command) When staging and committing, encode files.";

  async run() {
    const [isNotTTY, ttyError] = await ProcessUtils.isLaunchedByGit();
    !isNotTTY && this.error(ttyError);

    const [isLaunchedByGit, processError] = await ProcessUtils.isLaunchedByGit();
    !isLaunchedByGit && this.error(processError);

    process.stdin.pipe(encode).pipe(process.stdout);
  }
}
