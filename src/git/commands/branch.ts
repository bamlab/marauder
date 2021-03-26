import { GitCommand } from "../gitCommand";
import { chunk } from "lodash";

export class BranchGitCommand extends GitCommand {
  constructor() {
    super();
  }

  name = "branch";

  parseOutput(output: string[]): { branches: { current: boolean; name: string }[] } {
    const branches = chunk(output, 3);
    const parsedBranch = branches.map(([star, name, _]) => ({ current: star === "*", name }));
    return { branches: parsedBranch };
  }
}
