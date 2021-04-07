import { Command } from "@oclif/command";

import { Git } from "../git/git";

export default class Spy extends Command {
  static description = "Show the real content of a file, as git store it, before sending it to the server.";

  static usage = "spy PATH";

  static examples = [
    `$ marauder spy e.txt

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

  async run() {
    const { args } = this.parse(Spy);
    const { branches } = await Git.getCurrentBranches();
    const activeBranch = branches.find((b) => b.current)?.name as string;
    const { hash } = await Git.lsTree(activeBranch, args.path);
    // TODO: verify that kind is "blob". Otherwise this won't work if kind is "tree". Of course.
    const { data } = await Git.catFile("blob", hash);
    this.log(data);
  }
}
