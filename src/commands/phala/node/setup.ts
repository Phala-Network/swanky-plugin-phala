import {Command, Flags} from '@oclif/core'
import chalk from 'chalk';
import { Spinner } from "@astar-network/swanky-core";
import {DevPhase, RunMode, RuntimeContext, StackSetupMode, StackSetupService} from "@devphase/service";

export default class PhalaNodeSetup extends Command {
  static description = 'Setup local testnet stack'

  static examples = [
    '<%= config.bin %> <%= command.id %> -n [NETWORK_KEY] -m [SETUP_MODE]',
  ]

  public static flags = {
    network: Flags.string({
      summary: 'Network key',
      char: 'n',
      default: RuntimeContext.NETWORK_LOCAL
    }),
    setupMode: Flags.string({
      summary: 'Stack setup mode',
      char: 'm',
      default: StackSetupMode.WithLogger.toString(),
      options: Object.values(StackSetupMode).map(m => m.toString()),
    })
  };

  public async run(): Promise<void> {
    const {flags} = await this.parse(PhalaNodeSetup)
    const spinner = new Spinner(flags.verbose);
    const runtimeContext = await RuntimeContext.getSingleton();
    await runtimeContext.initContext(RunMode.Simple);

    this.log(`Setting up Phala local testnet stack`);

    const devPhase = await DevPhase.create(
      runtimeContext,
      flags.network
    );

    const stackSetupService = new StackSetupService(devPhase);

    await spinner.runCommand(
      async () => {
        const result =
          await stackSetupService.setupStack({
            ...runtimeContext.config.stack.setupOptions,
            mode: Number(flags.setupMode),
          });
        this.log(chalk.green('Stack is ready'));
        this.log(chalk.blue('Cluster Id'));
        this.log(result.clusterId);
      },
      "Setting up local testnet stack"
    );

    await spinner.runCommand(
      async () => await devPhase.cleanup(),
      "Cleanup",
    );

    this.log("😎 Phala local testnet configured successfully! 😎");
  }
}
