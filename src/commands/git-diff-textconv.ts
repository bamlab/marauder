import { Command } from "@oclif/command";

import * as fs from "fs";

import { decode } from "../transforms/decode";
import { ProcessUtils } from "../utils/process";

/**
 *  (Used by git, not for direct usage) Decode file
 *
 * When diffing file, decode them before from blob before diffing.
 *
 * @export
 * @class GitDiffTextconv
 * @extends {Command}
 */
export default class GitDiffTextconv extends Command {
  static hidden = true;

  static description = "(Git command) When diffing, decode files.";

  static args = [
    {
      name: "path",
      required: true,
    },
  ];

  async run(): Promise<void> {
    // TODO: use monadic result struct
    const [isLaunchedByGit, processError] = await ProcessUtils.isLaunchedByGit();
    // TODO: create an invariant(condition, error)
    !isLaunchedByGit && this.error(processError);

    // TODO: handle error if path is not passed
    const { args } = this.parse(GitDiffTextconv);

    // TODO: investigate how to display error in git (stderr ?)
    fs.createReadStream(args.path).pipe(decode).pipe(process.stdout);
  }
}