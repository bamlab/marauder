import { Command } from "@oclif/command";

import { encode } from "../transforms/encode";
import { ProcessUtils } from "../utils/process";

export default class Clean extends Command {
  static hidden = true;
  static description = "(Git command) When staging and committing, encode files.";

  async run() {
    const [isLaunchedByGit, failureReason] = await ProcessUtils.isLaunchedByGit();
    !isLaunchedByGit && this.error(failureReason);

    process.stdin.pipe(encode).pipe(process.stdout);
  }
}
