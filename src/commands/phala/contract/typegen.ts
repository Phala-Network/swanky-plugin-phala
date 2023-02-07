import {Command, Flags} from '@oclif/core'
import execa from "execa";
import fs = require("fs-extra");
import path = require("node:path")
import { Spinner } from "@astar-network/swanky-core";

export default class PhalaContractTypegen extends Command {
  static description = 'Generates types for a contract'

  static examples = [
    '<%= config.bin %> <%= command.id %> [contractName] [--watch]',
  ]

  static flags = {
    verbose: Flags.boolean({ char: "v" }),
  };

  static args = [
    {
      name: "contractName",
      required: true,
      description: "Contract name",
    },
    {
      name: "watchFlag",
      required: false,
      description: "Watch for changes"
    }
  ];

  public async run(): Promise<void> {
    const configExists = await fs.pathExists("devphase.config.ts");
    if (!configExists) {
      throw new Error("No 'devphase.config.ts' detected in current folder!");
    }
    const {args, flags} = await this.parse(PhalaContractTypegen);
    const spinner = new Spinner(flags.verbose);
    const projectPath = path.resolve();

    this.log(`Create type bindings for contracts`)
    await spinner.runCommand(
      async () => {
        const {stdout} = await execa.command(`yarn devphase typings ${args.contractName} ${args.watchFlag}`, {cwd: projectPath});
        this.log(stdout);
      },
      `Creating type bindings for Phat Contract ${args.contractName}`
    )

    this.log("Phat Contract types generated successfully!");
  }
}
