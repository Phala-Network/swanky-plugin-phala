import {Command, Flags} from '@oclif/core'
import {Spinner} from '../../../lib/spinner';
import {ContractManager, RunMode, RuntimeContext} from "@devphase/service";

export default class PhalaContractCompile extends Command {
  static description = 'Compile Contract'

  static examples = [
    '<%= config.bin %> <%= command.id %> -c [contractName] -w [bool] -r [bool]',
  ]

  public static flags = {
    contract: Flags.string({
      summary: 'Contract name',
      char: 'c'
    }),
    watch: Flags.boolean({
      summary: 'Watch changes',
      char: 'w',
      default: false,
    }),
    release: Flags.boolean({
      summary: 'Compile in release mode',
      char: 'r',
      default: false,
    })
  };

  public async run(): Promise<void> {
    const {flags} = await this.parse(PhalaContractCompile);

    const runtimeContext = await RuntimeContext.getSingleton();
    await runtimeContext.initContext(RunMode.Simple);
    await runtimeContext.requestProjectDirectory();

    this.log(`Compile contract(s)`)
    const spinner = new Spinner(flags.watch);
    const contractManager = new ContractManager(runtimeContext);

    await spinner.runCommand(
      async () => {
        const result = await contractManager.compile({
          contractName: flags.contract,
          watch: flags.watch,
          release: flags.release,
        });
        this.log(`${result}`);
      },
      `Compiling Phat Contract ${flags.contract}`
    );

    this.log("😎 Phat Contract compiled successfully! 😎");
  }
}
