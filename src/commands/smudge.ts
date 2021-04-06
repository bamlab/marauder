import { Command } from "@oclif/command";

import { decode } from "../transforms/decode";
import { ProcessUtils } from "../utils/process";

// TODO: rename to GitFilterSmudge
export default class Smudge extends Command {
  static hidden = true;

  static description = "(Git command) When fetching and pulling, decode files.";

  async run() {
    const [isNotTTY, ttyError] = await ProcessUtils.isLaunchedByGit();
    !isNotTTY && this.error(ttyError);

    const [isLaunchedByGit, processError] = await ProcessUtils.isLaunchedByGit();
    !isLaunchedByGit && this.error(processError);

    process.stdin.pipe(decode).pipe(process.stdout);
  }
}
