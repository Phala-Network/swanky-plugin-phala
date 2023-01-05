import {Command} from '@oclif/core'
import execa from 'execa'
import fs = require("fs-extra");
import path = require("node:path")

export default class PhalaStack extends Command {
  static description = 'Starting local stack (node + pruntime + pherry)'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  public async run(): Promise<void> {
    // TODO: change when devphase implements command-utils like swanky
    const configExists = await fs.pathExists("devphase.config.ts");
    if (!configExists) {
      throw new Error("No 'devphase.config.ts' detected in current folder!");
    }
    this.log(`Starting Stack`)

    const projectPath = path.resolve()

    await execa.command(`yarn devphase stack`, { cwd: projectPath })

  }
}
