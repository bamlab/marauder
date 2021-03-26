import { GitCommand } from "../gitCommand";

export class LsTreeGitCommand extends GitCommand {
  constructor(branch: string, path: string) {
    super();
    this.args.push(branch, path);
  }

  name = "ls-tree";

  parseOutput(output: string[]): { kind: "blob" | "tree"; perm: string; hash: string; path: string } {
    if (output.length <= 1) {
      throw new Error(`Blob not found for file "${this.args[1]}" in branch "${this.args[0]}"`);
    }
    const [perm, kind, hash, path, _] = output;
    if (kind !== "blob" && kind !== "tree") {
      throw new Error(`Unknown kind "${kind}", expected blob or tree`);
    }
    return { kind, perm, hash, path };
  }
}
