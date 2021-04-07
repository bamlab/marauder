import { Command } from "@oclif/command";

import { ConfigService } from "../services/config";

// TODO: add debug https://oclif.io/docs/debugging
export default class Spy extends Command {
  // TODO: improve description
  static description = "Init marauder";

  static usage = "init";

  static examples = [
    `$ marauder init

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
