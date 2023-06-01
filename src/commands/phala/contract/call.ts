import {Args, Command, Flags} from '@oclif/core';
import { ContractCallType, ContractManager, ContractType, RunMode, RuntimeContext } from '@devphase/service';
import chalk from 'chalk';

export default class PhalaContractCall extends Command {
  static description = 'Call a Phat Contract'

  static examples = [
    '<%= config.bin %> <%= command.id %> -c [CONTRACT_NAME] -t [CONTRACT_TYPE] -i [CONTRACT_ID] -r [REQUEST_TYPE] -m [METHOD] -n [NETWORK] -l [CLUSTER_ID] -a [ACCOUNT] -p [..ARGS]',
  ]

  public static flags = {
    contract: Flags.string({
      summary: 'Contract name',
      char: 'c',
      required: true,
    }),
    type: Flags.string({
      summary: '',
      char: 't',
      default: ContractType.InkCode,
      options: Object.values(ContractType)
    }),
    id: Flags.string({
      summary: 'Contract ID',
      char: 'i',
      required: true,
    }),
    request: Flags.string({
      summary: 'Request type: transaction or query',
      char: 'r',
      default: ContractCallType.Query,
      options: Object.values(ContractCallType)
    }),
    method: Flags.string({
      summary: 'Contract method to call (name)',
      char: 'm',
      required: true,
    }),
    network: Flags.string({
      summary: 'Target network to deploy (local default)',
      char: 'n',
      default: RuntimeContext.NETWORK_LOCAL,
    }),
    cluster: Flags.string({
      summary: 'Target cluster Id',
      char: 'l'
    }),
    account: Flags.string({
      summary: 'Account used to call (managed account key)',
      char: 'a',
      default: 'alice'
    }),
    params: Flags.string({
      required: false,
      description: "Arguments supplied to the message",
      multiple: true,
      default: [],
      char: "p",
    }),
  };

  public async run(): Promise<void> {
    const {flags} = await this.parse(PhalaContractCall)

    const runtimeContext = await RuntimeContext.getSingleton();
    await runtimeContext.initContext(RunMode.Simple);
    await runtimeContext.requestProjectDirectory();

    this.log(`Executing call to Phat Contract`)

    const contractManager = new ContractManager(runtimeContext);

    const outcome = await contractManager.contractCall(
      flags.contract,
      flags.id,
      <any>flags.request,
      flags.method,
      flags.params,
      {
        contractType: <any>flags.type,
        clusterId: flags.cluster,
        network: flags.network,
        account: flags.account
      }
    );

    this.log(chalk.blue('Call result:'));
    this.log(outcome);
  }
}
