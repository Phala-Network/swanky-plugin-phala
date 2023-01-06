/*import { Command, Flags } from "@oclif/core";
import chalk = require("chalk");
import { writeJSON } from "fs-extra";
import {
  ensureSwankyProject,
  getSwankyConfig,
  ChainAccount,
  encrypt,
  AccountData,
} from "@astar-network/swanky-core";
import inquirer from "inquirer";
export class CreateAccount extends Command {
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

  async run(): Promise<void> {
    await ensureSwankyProject();
    const { flags } = await this.parse(CreateAccount);

    const isDev =
      flags.dev ??
      (
        await inquirer.prompt([
          { type: "confirm", message: "Is this a DEV account? ", name: "isDev", default: false },
        ])
      ).isDev;

    if (isDev) {
      console.log(
        `${chalk.redBright(
          "DEV account mnemonic will be stored in plain text. DO NOT USE IN PROD!"
        )}`
      );
    }

    let tmpMnemonic = "";
    if (flags.generate) {
      tmpMnemonic = ChainAccount.generate();
      console.log(
        `${
          isDev
            ? ""
            : chalk.yellowBright(
              "This is your mnemonic. Copy it to a secure place, as it will be encrypted and not accessible anymore."
            )
        }
        ${"-".repeat(tmpMnemonic.length)}
        ${tmpMnemonic}
        ${"-".repeat(tmpMnemonic.length)}`
      );
    } else {
      tmpMnemonic = (
        await inquirer.prompt([{ type: "input", message: "Enter mnemonic: ", name: "mnemonic" }])
      ).mnemonic;
    }

    const accountData: AccountData = {
      mnemonic: "",
      isDev,
      alias: (await inquirer.prompt([{ type: "input", message: "Enter alias: ", name: "alias" }]))
        .alias,
      address: new ChainAccount(tmpMnemonic).pair.address,
    };

    if (!isDev) {
      const password = (
        await inquirer.prompt([
          { type: "password", message: "Enter encryption password: ", name: "password" },
        ])
      ).password;
      accountData.mnemonic = encrypt(tmpMnemonic, password);
    } else {
      accountData.mnemonic = tmpMnemonic;
    }

    const config = await getSwankyConfig();

    config.accounts.push(accountData);

    await writeJSON("swanky.config.json", config, { spaces: 2 });

    this.log(
      `${chalk.greenBright("✔")} Account with alias ${chalk.yellowBright(
        accountData.alias
      )} stored to config`
    );
  }
}
*/
import {Command, Flags} from '@oclif/core'

export default class PhalaAccountCreate extends Command {
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
    const {args, flags} = await this.parse(PhalaAccountCreate)

    const name = flags.name ?? 'world'
    this.log(`hello ${name} from /home/hashwarlock/Projects/Phala/Swanky/swanky-plugin-phala/src/commands/phala/account/create.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
