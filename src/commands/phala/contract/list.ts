import {Command} from '@oclif/core'
import {Spinner} from "@astar-network/swanky-core";
import execa from "execa";
import path = require("node:path");
import chalk = require("chalk");

export default class PhalaContractList extends Command {
  static description = 'Display contracts list'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  public async run(): Promise<void> {
    this.log(`${chalk.greenBright("✔")} Stored dev contracts:`);

    const projectPath = path.resolve()
    const spinner = new Spinner(false);

    await spinner.runCommand(
      async () => {
        const {stdout} = await
          execa.command(`yarn devphase contract list`, { cwd: projectPath })
        this.log(stdout);
      },
      `Retrieving contracts list`
    )
  }
}
