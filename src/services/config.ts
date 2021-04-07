import { GitConfigSource } from "../git/commands/config";
import { Git } from "../git/git";
import { LockUtils } from "../utils/lock";

const acquireGitConfigLock = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: Parameters<typeof originalMethod>) {
    await ConfigService.lockLocalGitConfig();
    const result = await originalMethod.apply(this, args);
    await ConfigService.unlockLocalGitConfig();
    return result;
  };

  return descriptor;
};

// TODO: add debug https://oclif.io/docs/debugging
export class ConfigService {
  static async getLocalGitConfigPath(): Promise<string> {
    const gitRoot = await Git.showTopLevel();
    return `${gitRoot}/.git/config`;
  }

  static async lockLocalGitConfig(): Promise<void> {
    const config = await this.getLocalGitConfigPath();
    return LockUtils.lockFile(config);
  }

  static async unlockLocalGitConfig(): Promise<void> {
    const config = await this.getLocalGitConfigPath();
    return LockUtils.unlockFile(config);
  }

  @acquireGitConfigLock
  static async isMarauderInstalled(): Promise<boolean> {
    const configSource: GitConfigSource = "local";
    const value = await Git.getConfig("marauder.m-a-r-a-u-d-e-r", configSource);
    return value === "marauder";
  }

  static async installMarauder(): Promise<void> {
    const configSource: GitConfigSource = "local";
    await Git.addConfig("marauder.m-a-r-a-u-d-e-r", "marauder", configSource);
    // TODO: determine if "marauder clean" or "yarn marauder clean" based on how marauder is installed (if local, use local)
    await Git.addConfig("filter.marauder.clean", "marauder clean", configSource);
    // TODO: determine if "marauder clean" or "yarn marauder clean" based on how marauder is installed (if local, use local)
    await Git.addConfig("filter.marauder.smudge", "marauder smudge", configSource);
    await Git.addConfig("filter.marauder.required", "true", configSource);
    // TODO: determine if "marauder clean" or "yarn marauder clean" based on how marauder is installed (if local, use local)
    await Git.addConfig("diff.marauder.textconv", "marauder diff", configSource);
    await Git.addConfig("diff.marauder.cachetextconv", "true", configSource);
    await Git.addConfig("diff.marauder.binary", "true", configSource);
    // TODO: add the config for merge, when the command is done
  }

  static async storeSecretKey(key: string): Promise<void> {
    const configSource: GitConfigSource = "local";
    await Git.setConfig("marauder.secretkey", key, configSource);
  }

  static async getSecretKey(): Promise<string> {
    const configSource: GitConfigSource = "local";
    const value = await Git.getConfig("marauder.secretkey", configSource);
    return value;
  }
}
