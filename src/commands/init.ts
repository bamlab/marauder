import { Command } from "@oclif/command";

import { ConfigService } from "../services/config";

// TODO: document this
// TODO: add debug https://oclif.io/docs/debugging
export default class Init extends Command {
  // TODO: improve description
  static description = "Init marauder";

  static usage = "init";

  // TODO: improve example
  static examples = [
    `$ marauder init

todo`,
    `$ marauder init --with-secret-key

todo`,
  ];

  // TODO: add --with-secret-key flags so init can be used in CI

  async run(): Promise<void> {
    // TODO: check in git repository
    const isMarauderInstalled = await ConfigService.isMarauderInstalled();
    if (!isMarauderInstalled) {
      await ConfigService.installMarauder();
    }
    // TODO: log next steps
  }
}
