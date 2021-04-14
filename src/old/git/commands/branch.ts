import { GitCommand } from "../git-command";
import { chunk } from "lodash";

export class GetCurrentBranchesGitCommand extends GitCommand {
  name = "branch";

  parseOutput(output: string[]): { branches: { current: boolean; name: string }[] } {
    const branches = chunk(output, 3);
    const parsedBranch = branches.map(([star, name, _]) => ({ current: star === "*", name }));
    return { branches: parsedBranch };
  }
}
