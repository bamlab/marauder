import { Command, flags } from "@oclif/command";

import { ConfigService } from "../io/config";

// TODO: document this
// TODO: add debug https://oclif.io/docs/debugging
export default class Init extends Command {
  // TODO: improve description
  static description = "Init marauder";

  static usage = "init";

  static flags = {
    "with-secret-key": flags.string({
      char: "s",
      description: "initialize the repository with a given secret key",
      multiple: false,
      env: "MARAUDER_SECRET_KEY",
      required: false,
    }),
  };

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
