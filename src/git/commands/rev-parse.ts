import { GitCommand } from "../git-command";

export class ShowTopLevelGitCommand extends GitCommand {
  constructor() {
    super();
    this.args.push("--show-toplevel");
  }

  name = "rev-parse";

  parseOutput(output: string[]): { path: string } {
    if (output.length <= 1) {
      throw new Error(`Not in a git directory.`);
    }
    return { path: output[0] };
  }
}
