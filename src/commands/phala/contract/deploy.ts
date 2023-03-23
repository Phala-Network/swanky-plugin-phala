import {Command, Flags} from '@oclif/core'
import {Spinner} from "@astar-network/swanky-core";
import {ContractManager, ContractType, RunMode, RuntimeContext} from "@devphase/service";
import chalk from "chalk";

export default class PhalaContractDeploy extends Command {
  static description = 'Deploy contract'

  static examples = [
    '<%= config.bin %> <%= command.id %> -c [CONTRACT_NAME] -t [CONTRACT_TYPE] -o [CONSTRUCTOR] -n [NETWORK] -l [CLUSTER_ID] -a [ACCOUNT] -p [..Args]',
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
    constructor: Flags.string({
      summary: 'Contract constructor to call (name)',
      char: 'o',
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
      summary: 'Account used to deploy (managed account key)',
      char: 'a',
      default: 'alice',
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
    const {flags} = await this.parse(PhalaContractDeploy)

    const runtimeContext = await RuntimeContext.getSingleton();
    await runtimeContext.initContext(RunMode.Simple);
    await runtimeContext.requestProjectDirectory();

    this.log(`Deploy contract`)
    const spinner = new Spinner();

    const contractManager = new ContractManager(runtimeContext);

    await spinner.runCommand(
      async () => {
        const instance = await contractManager.deploy(
          flags.contract,
          flags.constructor,
          flags.params,
          {
            contractType: <any>flags.type,
            clusterId: flags.cluster,
            network: flags.network,
            account: flags.account
          }
        );
        this.log(chalk.green('Contract deployed'));
        this.log('Contract Id:', instance.contractId);
        this.log('Cluster Id: ', instance.clusterId);
      },
      `Deploying contract ${flags.contract}`,
    );

    this.log("😎 Phat Contract deployed successfully! 😎");
  }
}
