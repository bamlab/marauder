import cp from "child_process";

import { GitCommand } from "./gitCommand";

export type ChildProcessWithoutNullStreams = ReturnType<typeof cp.spawn>;

export class GitWorker {
  constructor(private readonly command: GitCommand) {}

  run() {
    return cp.spawn("git", this.command.toArgs());
  }
}
