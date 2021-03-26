import { Command } from "@oclif/command";

import { ConfigService } from "../services/config";

export default class Spy extends Command {
  static description = "Init marauder";

  static usage = "init";

  static examples = [
    `$ git-marauder init

todo`,
  ];

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
