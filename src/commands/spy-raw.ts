import { Command } from "@oclif/command";

import { Git } from "../git/git";

/**
 * Given a path, show the content as stored by Git
 *
 * Git store content in blob.
 * Those blob are sent to the server.
 * Thus showing the actual content helps to see if the file is really encrypted.
 *
 * @export
 * @class SpyRaw
 * @extends {Command}
 */
// TODO: add debug https://oclif.io/docs/debugging
export default class SpyRaw extends Command {
  static description = "Show the real content of a file, as git store it, before sending it to the server.";

  static usage = "spy-raw PATH";

  static aliases = ["spy"];

  static examples = [
    `$ marauder spy-raw-file e.txt

~(^marauder^)~
8cf027a41e74a383046da101c4379a16
faadd220be715fb582776bde776dcd2f
5bd00e63c3413b52896431b84e84c769
fe0ea581011cacc1650f77f5339f678b
90035d29e0c8b099cacb7916fb3863da`,
  ];

  static args = [
    {
      name: "path",
      required: true,
    },
  ];

  // TODO: handle errrors in the code
  async run(): Promise<void> {
    const { args } = this.parse(SpyRaw);
    const { branches } = await Git.getCurrentBranches();
    const activeBranch = branches.find((b) => b.current)?.name as string;
    const { hash } = await Git.lsTree(activeBranch, args.path);
    // TODO: verify that kind is "blob". Otherwise this won't work if kind is "tree". Of course.
    const { data } = await Git.catFile("blob", hash);
    this.log(data);
  }
}
