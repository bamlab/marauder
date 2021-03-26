import { Command } from "@oclif/command";

import { Git } from "../git/git";
import { ConfigService } from "../services/config";
import { LockUtils } from "../utils/lock";

export default class Spy extends Command {
  static description = "Init marauder";

  static usage = "init";

  static examples = [`$ git-marauder init`];

  static args = [
    {
      name: "path",
      required: true,
    },
  ];

  async run() {
    const isMarauderInstalled = await ConfigService.isMarauderInstalled();
    if (!isMarauderInstalled) {
      await ConfigService.installMarauder();
    }
  }
}
