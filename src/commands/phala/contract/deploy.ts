import {Command, Flags} from '@oclif/core'
import {Spinner} from "@astar-network/swanky-core";
import execa from "execa";
import path = require("node:path")

export default class PhalaContractDeploy extends Command {
  static description = 'Deploy contract'

  static examples = [
    '<%= config.bin %> <%= command.id %> [CONTRACT_NAME] [CONSTRUCTOR] -t [CONTRACT_TYPE] -n [NETWORK] -l [CLUSTER_ID] -a [ACCOUNT] [ctorArgs...]',
  ]

  static flags = {
    contractType: Flags.string({
      char: "t",
      required: false,
      description: "Contract type (InkCode default)",
      default: "InkCode",
    }),
    network: Flags.string({
      required: false,
      char: "n",
      description: "Target network to deploy (local default)",
      default: "local",
    }),
    clusterId: Flags.string({
      char: "l",
      required: false,
      description: "Target cluster id",
      default: "0x0000000000000000000000000000000000000000000000000000000000000000"
    }),
    account: Flags.string({
      char: "a",
      required: false,
      description: "Account used to deploy (alice default)",
      default: "alice",
    }),
  };

  static args = [
    {
      name: "contractName",
      required: true,
      description: "Contract name",
    },
    {
      name: "contractConstructor",
      required: true,
      description: "Contract constructor"
    },
    {
      name: "ctorArgs",
      required: false,
      description: "Contract constructor arguments"
    }
  ];

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(PhalaContractDeploy)
    const projectPath = path.resolve()
    const spinner = new Spinner(flags.verbose);

    this.log(`Deploy contract`)
    await spinner.runCommand(
      async () => {
        const {stdout} = await
          execa.command(`yarn devphase contract deploy ${args.contractName} ${args.contractConstructor} -t ${flags.contractType} -n ${flags.network} -l ${flags.clusterId} -a ${flags.account} ${args.releaseFlag}`, { cwd: projectPath })
        this.log(stdout);
      },
      `Deploying Phat Contract ${args.contractName}`
    )

    this.log("Phat Contract compiled successfully!");
  }
}
