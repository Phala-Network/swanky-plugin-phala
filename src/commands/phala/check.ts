import {Command} from '@oclif/core'
import {RunMode, RuntimeContext} from '@devphase/service';
import {checkCliDependencies, Spinner} from "@astar-network/swanky-core";
export default class PhalaCheck extends Command {
  static description = 'Check project configuration'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  public async run(): Promise<void> {
    const runtimeContext = await RuntimeContext.getSingleton();
    await runtimeContext.initContext(RunMode.Simple);

    const spinner = new Spinner();

    await spinner.runCommand(
      () => runtimeContext.requestProjectDirectory(),
      "Checking configuration file",
    );

    await spinner.runCommand(() => checkCliDependencies(spinner), "Checking dependencies");

    await spinner.runCommand(
      () => runtimeContext.requestStackBinaries(false),
      "Checking Phala stack binaries",
    );

    this.log(`😎 Dependencies check passed successfully! 😎`)
  }
}
