import { GitConfigSource } from "./git/commands/config";
import { Git } from "./git/git";
import { LockUtils } from "./utils/lock";

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
    await Git.setConfig("marauder.m-a-r-a-u-d-e-r", "marauder", configSource);
    // TODO: determine if "marauder git-filter-clean" or "yarn marauder git-filter-clean" based on how marauder is installed (if local, use local)
    await Git.setConfig("filter.marauder.clean", "marauder git-filter-clean", configSource);
    // TODO: determine if "marauder git-filter-smudge" or "yarn marauder git-filter-smudge" based on how marauder is installed (if local, use local)
    await Git.setConfig("filter.marauder.smudge", "marauder git-filter-smudge", configSource);
    // TODO: enable git-process for performance once implemented
    // TODO: determine if "marauder git-process" or "yarn marauder git-process" based on how marauder is installed (if local, use local)
    // await Git.setConfig("filter.marauder.process", "marauder git-process", configSource);
    await Git.setConfig("filter.marauder.required", "true", configSource);
    // TODO: determine if "marauder git-diff-textconv" or "yarn marauder git-diff-textconv" based on how marauder is installed (if local, use local)
    await Git.setConfig("diff.marauder.textconv", "marauder git-diff-textconv", configSource);
    await Git.setConfig("diff.marauder.cachetextconv", "true", configSource);
    await Git.setConfig("diff.marauder.binary", "true", configSource);
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
