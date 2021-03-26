import { promises as fs, constants } from "fs";
import { PartialAttemptOptions, retry } from "@lifeomic/attempt";

export class LockUtils {
  static async lockFile(path: string) {
    const lockPath = `${path}.lock`;

    // Create if not exists, fail if already exists and read/write.
    const flags = constants.O_CREAT | constants.O_EXCL | constants.O_RDWR;

    const operation = () => fs.open(lockPath, flags);
    const retryOptions: PartialAttemptOptions<fs.FileHandle> = { delay: 10, factor: 2, maxDelay: 1000 };
    const handle = await retry(operation, retryOptions);

    await handle.close();
  }

  static async unlockFile(path: string) {
    const lockPath = `${path}.lock`;
    await fs.unlink(lockPath).catch(() => LockUtils.unlockFile(path));
  }
}