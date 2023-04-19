import {Command, Flags} from '@oclif/core'
import {RunMode, RuntimeContext, StackManager} from '@devphase/service';

export default class PhalaNodeStart extends Command {
  static description = 'Starting local testnet stack (phala-node + pruntime + pherry)'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  public static flags = {
    'save-logs': Flags.boolean({
      summary: 'Save logs to file',
      default: false
    }),
  };

  public async run(): Promise<void> {
    const {flags} = await this.parse(PhalaNodeStart);

    this.log(`Starting local tesnet stack`);

    const runtimeContext = await RuntimeContext.getSingleton();
    await runtimeContext.initContext(RunMode.Simple);

    await runtimeContext.requestProjectDirectory();
    await runtimeContext.requestStackBinaries();

    const stackManager = new StackManager(runtimeContext);

    try {
      await stackManager.startStack(
        RunMode.Simple,
        {
          saveLogs: flags['save-logs'],
        }
      );
    }
    catch (e) {
      await stackManager.stopStack();
      throw e;
    }

    process.on('SIGINT', async() => {
      this.error('Got SIGINT - shutting down');

      await stackManager.stopStack();
    });

  }
}
