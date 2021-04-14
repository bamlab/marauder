import { Command } from "@oclif/command";

import * as fs from "fs";

import { ConfigService } from "../old/config";
import { Decoder } from "../old/security/transforms/decode";
import { ProcessUtils } from "../old/utils/process";

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

  // TODO: add debug https://oclif.io/docs/debugging
  async run(): Promise<void> {
    // TODO: use monadic result struct
    const [isLaunchedByGit, processError] = await ProcessUtils.isLaunchedByGit();
    // TODO: create an invariant(condition, error)
    !isLaunchedByGit && this.error(processError);

    // TODO: handle error if path is not passed
    const { args } = this.parse(GitDiffTextconv);

    const secretKey = await ConfigService.getSecretKey();
    !secretKey && this.error("Please generate a secretKey");

    // TODO: investigate how to display error in git (stderr ?)
    const decode = new Decoder(secretKey);
    fs.createReadStream(args.path).pipe(decode).pipe(process.stdout);
  }
}
