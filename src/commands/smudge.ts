import { Command } from "@oclif/command";

import { decode } from "../transforms/decode";
import { ProcessUtils } from "../utils/process";

export default class Clean extends Command {
  static hidden = true;
  static description = "(Git command) When fetching and pulling, decode files.";

  async run() {
    const [isLaunchedByGit, failureReason] = await ProcessUtils.isLaunchedByGit();
    !isLaunchedByGit && this.error(failureReason);

    process.stdin.pipe(decode).pipe(process.stdout);
  }
}
