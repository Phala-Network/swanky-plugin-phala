import {Command} from '@oclif/core'
import {Spinner} from "@astar-network/swanky-core";
import execa from "execa";
import path = require("node:path");
import chalk = require("chalk");

export default class PhalaAccountList extends Command {
  static description = 'List dev accounts stored in config'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  public async run(): Promise<void> {
    this.log(`${chalk.greenBright("✔")} Stored dev accounts:`);

    const projectPath = path.resolve()
    const spinner = new Spinner(false);

    await spinner.runCommand(
      async () => {
        const {stdout} = await
          execa.command(`yarn devphase account list`, { cwd: projectPath })
        this.log(stdout);
      },
      `Retrieving accounts list`
    )
  }
}

