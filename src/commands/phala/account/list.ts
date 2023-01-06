/*import { Command } from "@oclif/core";
import chalk = require("chalk");
import { AccountData, ensureSwankyProject, getSwankyConfig } from "@astar-network/swanky-core";

export class CreateAccount extends Command {
  static description = "List dev accounts stored in config";
  static aliases = [`account:ls`];

  async run(): Promise<void> {
    await ensureSwankyProject();

    const config = await getSwankyConfig();
    this.log(`${chalk.greenBright("✔")} Stored dev accounts:`);

    config.accounts.forEach((account: AccountData) => {
      this.log(`\t${chalk.yellowBright("Alias: ")} ${account.alias}`);
    });
  }
}
*/

import {Command, Flags} from '@oclif/core'

export default class PhalaAccountList extends Command {
  static description = 'describe the command here'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: Flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(PhalaAccountList)

    const name = flags.name ?? 'world'
    this.log(`hello ${name} from /home/hashwarlock/Projects/Phala/Swanky/swanky-plugin-phala/src/commands/phala/account/list.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}

