import { GitCommand } from "../git-command";

export class CatFileGitCommand extends GitCommand {
  constructor(kind: "blob" | "tree", hash: string) {
    super();
    this.args.push(kind, hash);
  }

  name = "cat-file";

  parseOutput(output: string[]): { data: string } {
    return { data: output.join("\n") };
  }
}
