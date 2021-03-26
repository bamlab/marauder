import { Command } from "@oclif/command";

import { Git } from "../git/git";

export default class Spy extends Command {
  static description = "Show the real content of a file, as git store it, before sending it to the server.";

  static args = [
    {
      name: "path",
      required: true,
    },
  ];

  async run() {
    const { args } = this.parse(Spy);
    const { branches } = await Git.branch();
    const activeBranch = branches.find((b) => b.current)?.name as string;
    const { hash } = await Git.lsTree(activeBranch, args.path);
    const { data } = await Git.catFile("blob", hash);
    this.log(data);
  }
}
