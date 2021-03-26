export abstract class GitCommand {
  protected name = "";

  protected args: string[] = [];

  constructor() {}

  toArgs() {
    return [this.name, ...this.args];
  }

  abstract parseOutput(output: string[]): Record<string, any>;
}
