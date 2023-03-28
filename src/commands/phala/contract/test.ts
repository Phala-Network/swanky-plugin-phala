import {Command, Flags} from '@oclif/core'
import {RunMode, RuntimeContext, StackSetupMode, } from '@devphase/service';
import glob from 'glob';
import type { MochaOptions } from 'mocha';
import path from 'path';

export default class PhalaContractTest extends Command {
  static description = 'Run tests for specified contract(s)'

  static examples = [
    '<%= config.bin %> <%= command.id %> -s [TEST_SUITE_NAME] -n [NETWORK] -m [STACK_SETUP_MODE] -',
  ]

  public static flags = {
    suite: Flags.string({
      summary: 'Test suite name (directory)',
      char: 's',
    }),
    network: Flags.string({
      summary: 'Network key',
      char: 'n',
      default: RuntimeContext.NETWORK_LOCAL,
    }),
    setupMode: Flags.string({
      summary: 'Stack setup mode',
      char: 'm',
      default: StackSetupMode.Minimal.toString(),
      options: Object.values(StackSetupMode).map(m => m.toString()),
    })
  };

  public async run(): Promise<void> {
    const {flags} = await this.parse(PhalaContractTest)

    const runtimeContext = await RuntimeContext.getSingleton();
    await runtimeContext.initContext(RunMode.Testing, flags.network);
    await runtimeContext.requestProjectDirectory();
    await runtimeContext.requestStackBinaries();

    this.log('Running test suite for contracts');
    //const tester = new Tester(runtimeContext);
    runtimeContext.config.stack.setupOptions.mode = Number(flags.setupMode);

    const { default: Mocha } = await import('mocha');

    const mochaConfig : MochaOptions = {
      timeout: 10000,
      ...runtimeContext.config.testing.mocha
    };
    const mocha = new Mocha(mochaConfig);

    // add internals
    mocha.addFile(
      path.join(
        runtimeContext.paths.project,
        '/etc/mocha.global.ts'
      )
    );

    // grep test files
    const suitePath = flags.suite
      ? `/${flags.suite}/**/*.@(test|spec).@(ts|js)`
      : '/**/*.@(test|spec).@(ts|js)';

    const patterns = [
      [
        runtimeContext.config.directories.tests,
        suitePath
      ].join('')
    ];

    for (const pattern of patterns) {
      const files = glob.sync(pattern, { cwd: runtimeContext.paths.project });
      files.forEach(file => mocha.addFile(file));
    }

    await new Promise<number>((resolve) => {
      mocha.run(resolve);
    });

    mocha.dispose();

  }
}
