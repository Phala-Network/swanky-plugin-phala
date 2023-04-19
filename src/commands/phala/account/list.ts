import {AccountManager, RunMode, RuntimeContext} from '@devphase/service';
import { ux, Command } from '@oclif/core';
import { table } from '@oclif/core/lib/cli-ux/styled/table';
import chalk from 'chalk';

export default class PhalaAccountList extends Command {
  static description = 'List dev accounts stored in config'

  public static flags = {
    ...ux.table.flags(),
  };

  public async run(): Promise<void> {
    const {flags} = await this.parse(PhalaAccountList);

    const runtimeContext = await RuntimeContext.getSingleton();
    await runtimeContext.initContext(RunMode.Simple);
    await runtimeContext.requestProjectDirectory();

    this.log(`${chalk.greenBright("✔")} Stored dev accounts:`);

    const accountManager = new AccountManager(runtimeContext);

    const accountsKeyrings = await accountManager.loadAccountsKeyringsFromStorageFile();
    const accounts = await accountManager.loadAccounts(
      accountsKeyrings,
      runtimeContext.config.general.ss58Format,
      false
    );

    const accountsOutput = Object.entries(accounts)
      .map(([ alias, account ]) => ({
        alias,
        address: account.address,
        protected: account.isLocked,
      }));

    if (!flags.json) {
      const columns : table.Columns<any> = {
        alias: {},
        address: {},
        protected: {},
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

      ux.table(accountsOutput, columns, options);
    }
  }
}

