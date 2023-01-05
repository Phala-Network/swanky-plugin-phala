import {Command, Flags} from '@oclif/core'
import execa from "execa";
import path = require("node:path")
import { Spinner } from "@astar-network/swanky-core";

export default class PhalaCompile extends Command {
  static description = 'Compile Contract'

  static examples = [
    '<%= config.bin %> <%= command.id %> [contractName] [--watch] [--release]',
  ]

  static flags = {
    verbose: Flags.boolean({ char: "v" }),
  };

  static args = [
    {
      name: "contractName",
      required: true,
      description: "contract name of phat contract",
    },
    {
      name: "watchFlag",
      required: false,
      description: "watch for changes"
    }
  ];

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(PhalaCompile)
    const projectPath = path.resolve()
    const spinner = new Spinner(flags.verbose);

    this.log(`Compile contract(s)`)
    await spinner.runCommand(
      async () => {
        const {stdout} = await
          execa.command(`yarn devphase compile ${args.contractName} ${args.watchFlag}`, { cwd: projectPath })
        this.log(stdout);
      },
      `Compiling Phat Contract ${args.contractName}`
    )

    this.log("Phat Contract compiled successfully!");
  }
}
