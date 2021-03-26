import { GetCurrentBranchesGitCommand } from "./commands/branch";
import { CatFileGitCommand } from "./commands/cat-file";
import { LsTreeGitCommand } from "./commands/ls-tree";
import { GitCommand } from "./git-command";
import { ChildProcessWithoutNullStreams, GitWorker } from "./git-worker";

export class Git {
  private static async accumulateData(stream: ChildProcessWithoutNullStreams): Promise<string[]> {
    let data = "";
    stream.stdout?.on("data", (additionalData) => {
      data += additionalData;
    });
    return new Promise((resolve, reject) => {
      stream.stdout?.on("close", () => {
        const lineData = data.split(/[ \t\n]/);
        resolve(lineData);
      });
      stream.stdout?.on("error", (err) => {
        reject(err);
      });
    });
  }

  private static async execute<T extends GitCommand>(command: T): Promise<ReturnType<T["parseOutput"]>> {
    const worker = new GitWorker(command);
    const gitStream = worker.run();
    const data = await Git.accumulateData(gitStream);
    return command.parseOutput(data) as ReturnType<T["parseOutput"]>;
  }

  public static async getCurrentBranches() {
    const command = new GetCurrentBranchesGitCommand();
    return Git.execute(command);
  }

  public static async lsTree(branch: string, path: string) {
    const command = new LsTreeGitCommand(branch, path);
    return Git.execute(command);
  }

  public static async catFile(kind: "blob", hash: string) {
    const command = new CatFileGitCommand(kind, hash);
    return Git.execute(command);
  }
}
