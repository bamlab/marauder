import { GitConfigSource } from "../git/commands/config";
import { Git } from "../git/git";
import { LockUtils } from "../utils/lock";

const acquireGitConfigLock = (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: Parameters<typeof originalMethod>) {
    await ConfigService.lockLocalGitConfig();
    const result = await originalMethod.apply(this, args);
    await ConfigService.unlockLocalGitConfig();
    return result;
  };

  return descriptor;
};

export class ConfigService {
  static async getLocalGitConfigPath() {
    const gitRoot = await Git.showTopLevel();
    return `${gitRoot}/.git/config`;
  }
  static async lockLocalGitConfig() {
    const config = await this.getLocalGitConfigPath();
    return LockUtils.lockFile(config);
  }
  static async unlockLocalGitConfig() {
    const config = await this.getLocalGitConfigPath();
    return LockUtils.unlockFile(config);
  }

  @acquireGitConfigLock
  static async isMarauderInstalled() {
    const configSource: GitConfigSource = "local";
    const value = await Git.getConfig("marauder.m-a-r-a-u-d-e-r", configSource);
    return value === "marauder";
  }

  static async installMarauder() {
    const configSource: GitConfigSource = "local";
    await Git.addConfig("marauder.m-a-r-a-u-d-e-r", "marauder", configSource);
    await Git.addConfig("filter.marauder.clean", "git-marauder clean", configSource);
    await Git.addConfig("filter.marauder.smudge", "git-marauder smudge", configSource);
    await Git.addConfig("filter.marauder.required", "true", configSource);
    await Git.addConfig("diff.marauder.textconv", "git-marauder diff", configSource);
    await Git.addConfig("diff.marauder.cachetextconv", "true", configSource);
    await Git.addConfig("diff.marauder.binary", "true", configSource);
  }
}
