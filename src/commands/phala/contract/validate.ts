import {Command, Flags} from '@oclif/core';
import chalk from 'chalk';
import path from "path";
import {RunMode, RuntimeContext} from "@devphase/service";
import {Spinner} from "../../../lib/spinner";
import {validateCompiledWasm} from "../../../lib/tasks";

export default class PhalaContractValidate extends Command {
  static description = 'Validate compiled Phat Contract'

  static examples = [
    '<%= config.bin %> <%= command.id %> - c [CONTRACT_NAME]',
  ];

  public static flags = {
    contract: Flags.string({
      summary: 'Contract name',
      char: 'c'
    })
  };

  public async run(): Promise<void> {
    const {flags} = await this.parse(PhalaContractValidate);

    const runtimeContext = await RuntimeContext.getSingleton();
    await runtimeContext.initContext(RunMode.Simple);
    await runtimeContext.requestProjectDirectory();

    const result = await validateCompiledWasm(runtimeContext, flags.contract);
    if (result) this.log("😎 Phat Contract validated successfully! 😎");
  }

}
