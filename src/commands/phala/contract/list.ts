import {ux, Command} from '@oclif/core'
import {ContractDefinition, ContractManager, RunMode, RuntimeContext} from '@devphase/service';
import { table } from '@oclif/core/lib/cli-ux/styled/table';
import chalk from 'chalk';
import sortBy from 'lodash/sortBy';

export default class PhalaContractList extends Command {
  static description = 'Display deployed contracts list'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  public static flags = {
    ...ux.table.flags(),
  };

  public async run(): Promise<void> {
    const {flags} = await this.parse(PhalaContractList);

    const runtimeContext = await RuntimeContext.getSingleton();
    await runtimeContext.initContext(RunMode.Simple);
    await runtimeContext.requestProjectDirectory();
    this.log(`${chalk.greenBright("✔")} Stored dev contracts:`);

    const contractManager = new ContractManager(runtimeContext);

    let contractDefinitions : ContractDefinition[] = await contractManager.loadContractsDefFromStorageFile();
    contractDefinitions = sortBy(contractDefinitions, [ 'type', 'network', 'name' ]);

    const contractsOutput = Object.values(contractDefinitions)
      .map(contract => ({
        name: chalk.cyan(contract.name),
        type: contract.type,
        network: contract.network,
        contractId: contract.contractId,
        clusterId: contract.clusterId,
      }));

    if (!flags.json) {
      const columns : table.Columns<any> = {
        name: {},
        type: {},
        network: {},
        contractId: {},
        clusterId: {},
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

      ux.table(contractsOutput, columns, options);
    }
  }
}
