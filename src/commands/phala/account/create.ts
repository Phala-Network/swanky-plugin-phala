import {Command, Flags} from '@oclif/core'
import {Spinner} from "@astar-network/swanky-core";
import execa from "execa";
import path = require("node:path");

export default class PhalaAccountCreate extends Command {
  static description = "Create a new dev account in config";

  static flags = {
    generate: Flags.boolean({
      char: "g",
    }),
    dev: Flags.boolean({
      char: "d",
    }),
  };

  static args = [];

  public async run(): Promise<void> {
    const {flags} = await this.parse(PhalaAccountCreate)

    const projectPath = path.resolve()
    const spinner = new Spinner(flags.verbose);

    this.log(`Creating account`)
    await spinner.runCommand(
      async () => {
        const {stdout} = await
          execa.command(`yarn devphase account create`, { cwd: projectPath })
        this.log(stdout);
      },
      `Creating Account`
    )

    this.log("Phat Contract compiled successfully!");
  }
}
