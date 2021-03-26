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
}
