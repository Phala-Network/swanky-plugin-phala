import {Args, Command} from '@oclif/core'
import {Spinner} from "../../../lib/spinner";
import {RunMode, RuntimeContext, TypeBinder} from "@devphase/service";

export default class PhalaContractTypegen extends Command {
  static description = 'Generate type bindings for compiled contract'

  static examples = [
    '<%= config.bin %> <%= command.id %> [contractName]',
  ]

  static args = {
    contractName: Args.string({
      name: "contractName",
      required: true,
      description: "Contract name",
    }),
  };

  public async run(): Promise<void> {
    const {args} = await this.parse(PhalaContractTypegen);

    const runtimeContext = await RuntimeContext.getSingleton();
    await runtimeContext.initContext(RunMode.Simple);
    await runtimeContext.requestProjectDirectory();

    this.log(`Create type bindings for contracts`)

    const spinner = new Spinner();
    const binder = new TypeBinder(runtimeContext);
    await spinner.runCommand(
      async () => await binder.createBindings(args.contractName),
      `Creating type bindings for Phat Contract ${args.contractName}`,
    );

    this.log("😎 Phat Contract types generated successfully! 😎");
  }
}
