import { Command } from "@oclif/command";
// import { default as split2 } from "split2";

/**
 * (Used by git, not for direct usage) Interact with Git using long-running process protocol
 *
 * This allows better performance.
 * https://git-scm.com/docs/gitattributes#_long_running_filter_process
 * When viewing file, decode the blob them before writing them in directory.
 *
 * @export
 * @class GitFilterClean
 * @deprecate work in progress
 * @extends {Command}
 */
export default class GitProcess extends Command {
  static hidden = true;

  // TODO: clean up description
  static description = "(Git command) Interact with Git using long-running process protocol";

  // TODO: add debug https://oclif.io/docs/debugging
  async run(): Promise<void> {
    // process.stdin.pipe(split2()).on("data", (buff: Buffer) => {
    //   const header = buff.slice(0, 4);
    //   if (header.length !== 4) {
    //     process.stderr.write("Message ignored");
    //     process.stderr.write("\n");
    //     return;
    //   }
    //   const size = parseInt(header.toString(), 16);
    //   if (isNaN(size)) {
    //     process.stderr.write("Message ignored");
    //     process.stderr.write("\n");
    //     return;
    //   }
    //   if (buff.length !== size) {
    //     process.stderr.write("Message ignored");
    //     process.stderr.write("\n");
    //     return;
    //   }
    //   console.log(buff.toString());
    // });
  }
}
