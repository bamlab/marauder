import { Command } from "@oclif/command";

import { ConfigService } from "../services/config";

export default class Spy extends Command {
  // TODO: improve description
  static description = "Init marauder";

  static usage = "init";

  static examples = [
    `$ git-marauder init

todo`,
  ];

  async run() {
    // TODO: check in git repository
    const isMarauderInstalled = await ConfigService.isMarauderInstalled();
    if (!isMarauderInstalled) {
      await ConfigService.installMarauder();
    }
    // TODO: log next steps
  }
}
