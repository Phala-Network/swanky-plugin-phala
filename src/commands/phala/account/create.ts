import {AccountManager, RunMode, RuntimeContext} from '@devphase/service';
import { Flags, ux, Command } from '@oclif/core';
import { table } from '@oclif/core/lib/cli-ux/styled/table';
import chalk from 'chalk';
import inquirer from 'inquirer';
import {password, pickLanguage} from "../../../lib/prompts";

export default class PhalaAccountCreate extends Command {
  static description = "Create a dev account";

  static examples = [
    '<%= config.bin %> <%= command.id %> -a [ALIAS] -p [PASS_PHRASE] -n [bool]',
  ]

  public static flags = {
    alias: Flags.string({
      summary: 'Account alias',
      char: 'a',
      required: true,
    }),
    passphrase: Flags.string({
      summary: 'Passphrase used to protect keyring',
      char: 'p',
    }),
    'no-passphrase': Flags.boolean({
      summary: 'Force no passphrase (prompted if not specified)',
      char: 'n',
    })
  };

  public async run(): Promise<void> {
    const {flags} = await this.parse(PhalaAccountCreate)

    const runtimeContext = await RuntimeContext.getSingleton();
    await runtimeContext.initContext(RunMode.Simple);
    await runtimeContext.requestProjectDirectory();

    const accountManager = new AccountManager(runtimeContext);

    if (!flags.passphrase && !flags['no-passphrase']) {
      const passphrase = await inquirer.prompt([password("")]);
      if (!passphrase.password) {
        flags["no-passphrase"] = true;
        flags.passphrase = passphrase.password;
      } else {
        flags.passphrase = passphrase.password;
      }
    }
    const account = await accountManager.createAccount(
      {
        alias: flags.alias,
        passphrase: flags.passphrase,
        noPassphrase: flags['no-passphrase'],
      },
      runtimeContext.config.general.ss58Format
    );

    this.log(chalk.green('Account created\n'));

    const columns : table.Columns<any> = {
      alias: {},
      address: {},
      isLocked: {},
    };
    const options : table.Options = {
      columns: flags.columns,
      sort: flags.sort,
      filter: flags.filter,
      csv: flags.csv,
      extended: flags.extended,
      'no-truncate': flags['no-truncate'],
      'no-header': flags['no-header'],
    };

    ux.table([
      {
        alias: account.alias,
        address: account.keyring.address,
        protected: account.keyring.isLocked,
      }
    ], columns, options);

    this.log("😎 Account created successfully! 😎");
  }
}
