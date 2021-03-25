import findProcess from "find-process";

type Process = ArrayElement<UnwrapPromise<ReturnType<typeof findProcess>>>;

export class ProcessUtils {
  static async isNotTTY(): Promise<[boolean, string]> {
    if (process.stdin.isTTY) {
      return [false, "This command is mean to be used by git, but it is used in computer terminal (TTY)"];
    }
    return [true, ""];
  }

  static async isLaunchedByGit(): Promise<[boolean, string]> {
    const parentProcesses = await findProcess("pid", process.ppid);
    const isProcessGit = (process: Process) => process.name === "git";
    const hasGitInParentProcesses = parentProcesses.find(isProcessGit);

    if (!hasGitInParentProcesses) {
      const parentProcessesNames = parentProcesses.map((p) => p.name).join(", ");
      return [false, `One of the parent processes should be "git", found ${parentProcessesNames}`];
    }

    return [true, ""];
  }
}
