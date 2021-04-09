import { GitCommand } from "../git-command";

export type GitConfigSource = "system" | "global" | "local" | { kind: "config"; file: string };

function argsParseSource(source?: GitConfigSource) {
  if (!source) {
    return [];
  }
  if (source === "system") {
    return ["--system"];
  }
  if (source === "global") {
    return ["--global"];
  }
  if (source === "local") {
    return ["--local"];
  }
  if (source.kind && source.kind === "config") {
    return ["--config", source.kind];
  }
  return [];
}

export class GetConfigGitCommand extends GitCommand {
  constructor(key: string, source?: GitConfigSource) {
    super();
    this.args.push(...argsParseSource(source), "--get", key);
  }

  name = "config";

  parseOutput(output: string[]): { value: string } {
    return { value: output[0] };
  }
}

export class AddConfigGitCommand extends GitCommand {
  constructor(key: string, value: string, source?: GitConfigSource) {
    super();
    this.args.push(...argsParseSource(source), "--add", key, value);
  }

  name = "config";

  parseOutput(output: string[]): { value: string } {
    return { value: output[0] };
  }
}

export class SetConfigGitCommand extends GitCommand {
  constructor(key: string, value: string, source?: GitConfigSource) {
    super();
    this.args.push(...argsParseSource(source), key, value);
  }

  name = "config";

  parseOutput(output: string[]): { value: string } {
    return { value: output[0] };
  }
}
