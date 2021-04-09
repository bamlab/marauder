import cp from "child_process";

import { GitCommand } from "./git-command";

export type ChildProcessWithoutNullStreams = ReturnType<typeof cp.spawn>;

export class GitWorker {
  private readonly command: GitCommand;

  constructor(command: GitCommand) {
    this.command = command;
  }

  // TODO: add debug https://oclif.io/docs/debugging
  run() {
    return cp.spawn("git", this.command.toArgs());
  }
}
