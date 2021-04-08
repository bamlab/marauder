import { Command } from "@oclif/command";

/**
 * Checks that marauder is installed correctly
 *
 * @export
 * @class Doctor
 * @deprecate work in progress
 * @extends {Command}
 */
export default class Doctor extends Command {
  // TODO: turn that to true once implemented
  static hidden = true;

  // TODO: clean up description
  static description = "Checks that marauder is installed correctly";

  // TODO: add debug https://oclif.io/docs/debugging
  async run(): Promise<void> {
    // TODO: implement
  }
}
