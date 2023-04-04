import {Command, Flags} from '@oclif/core'
import {RunMode, RuntimeContext, StackSetupMode, Tester} from '@devphase/service';

export default class PhalaContractTest extends Command {
  static description = '[Unstable] Run tests for specified contract(s)'

  static examples = [
    '<%= config.bin %> <%= command.id %> -t [TEST_SUITE_NAME] -n [NETWORK] -e [EXTERNAL_STACK] -m [STACK_SETUP_MODE]',
  ]

  public static flags = {
    suite: Flags.string({
      summary: 'Test suite name (directory in tests)',
      char: 't',
    }),
    network: Flags.string({
      summary: 'Network key',
      char: 'n',
      default: RuntimeContext.NETWORK_LOCAL,
    }),
    externalStack: Flags.boolean({
      summary: 'Don\'t spawn local stack (use external)',
      char: 'e',
      default: false,
    }),
    stackSetupMode: Flags.string({
      summary: 'Stack setup mode',
      char: 'm',
      options: Object.values(StackSetupMode).map(m => m.toString()),
      default: StackSetupMode.Minimal.toString(),
    })
  };

  public async run(): Promise<void> {
    const {flags} = await this.parse(PhalaContractTest)

    const runtimeContext = await RuntimeContext.getSingleton();
    await runtimeContext.initContext(RunMode.Testing);
    await runtimeContext.requestProjectDirectory();
    await runtimeContext.requestStackBinaries();

    this.log('Running test suite for contracts');
    const tester = new Tester(runtimeContext);
    return tester.runTests({
      suite: flags.suite,
      network: flags.network,
      spawnStack: flags.externalStack,
      stackSetupMode: <any>flags.stackSetupMode,
    });

  }
}
