import {Command, Flags} from '@oclif/core'
import execa from 'execa'
import fs = require("fs-extra");
import path = require("node:path")
import { Spinner } from "@astar-network/swanky-core";

export default class PhalaNodeSetup extends Command {
  static description = 'Configuring the local testnet'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    verbose: Flags.boolean({ char: "v" }),
  };

  public async run(): Promise<void> {
    const configExists = await fs.pathExists("devphase.config.ts");
    if (!configExists) {
      throw new Error("No 'devphase.config.ts' detected in current folder!");
    }
    const {flags} = await this.parse(PhalaNodeSetup)
    const spinner = new Spinner(flags.verbose);

    this.log(`Setting up Phala Stack`)

    const projectPath = path.resolve()
    await spinner.runCommand(
      async () => {
        const {stdout} = await execa.command(`yarn devphase stack:setup`, { cwd: projectPath });
        this.log(stdout);
      },
      "Configuring Phala local testnet..."
    )

    this.log("Phala local testnet configured successfully!");
  }
}
