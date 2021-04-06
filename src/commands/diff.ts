import { Command } from "@oclif/command";

import * as fs from "fs";

import { decode } from "../transforms/decode";
import { ProcessUtils } from "../utils/process";

// TODO: rename to GitDiffTextConv
export default class Diff extends Command {
  static hidden = true;

  static description = "(Git command) When diffing, encode files.";

  static args = [
    {
      name: "path",
      required: true,
    },
  ];

  async run() {
    const [isLaunchedByGit, processError] = await ProcessUtils.isLaunchedByGit();
    !isLaunchedByGit && this.error(processError);

    const { args } = this.parse(Diff);

    fs.createReadStream(args.path).pipe(decode).pipe(process.stdout);
  }
}
