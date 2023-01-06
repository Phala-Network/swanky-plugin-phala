/*import { Command, Flags } from "@oclif/core";
import path = require("node:path");
import fs = require("fs-extra");
import { readJSON, readFile, writeJSON } from "fs-extra";
import { cryptoWaitReady } from "@polkadot/util-crypto";
import {
  ensureSwankyProject,
  getSwankyConfig,
  resolveNetworkUrl,
  DeployApi,
  ChainAccount,
  Spinner,
  AccountData,
  Encrypted,
  decrypt,
  AbiType as Abi,
} from "@astar-network/swanky-core";
import inquirer from "inquirer";
import chalk = require("chalk");

export class DeployContract extends Command {
  static description = "Deploy contract to a running node";

  static flags = {
    account: Flags.string({
      required: true,
      description: "Alias of account to be used",
    }),
    gas: Flags.integer({
      required: false,
      char: "g",
    }),
    args: Flags.string({
      char: "a",
      multiple: true,
    }),
    network: Flags.string({
      char: "n",
      description: "Network name to connect to",
    }),
    cluster: Flags.string( {
      char: "c",
      description: "Cluster id to deploy contract to",
    }),
  };

  static args = [
    {
      name: "contractName",
      required: true,
      description: "Name of the contract to deploy",
    },
  ];

  async run(): Promise<void> {
    // TODO: change when devphase implements command-utils like swanky
    const configExists = await fs.pathExists("devphase.config.ts");
    if (!configExists) {
      throw new Error("No 'devphase.config.ts' detected in current folder!");
    }
    const { args, flags } = await this.parse(DeployContract);

    const config = await getSwankyConfig();

    const spinner = new Spinner();

    const contractInfo = config.contracts[args.contractName];
    if (!contractInfo) {
      this.error(`Cannot find a contract named ${args.contractName} in swanky.config.json`);
    }

    const accountData = config.accounts.find(
      (account: AccountData) => account.alias === flags.account
    );
    if (!accountData) {
      this.error("Provided account alias not found in swanky.config.json");
    }

    const mnemonic = accountData.isDev
      ? (accountData.mnemonic as string)
      : decrypt(
        accountData.mnemonic as Encrypted,
        (
          await inquirer.prompt([
            {
              type: "password",
              message: `Enter password for ${chalk.yellowBright(accountData.alias)}: `,
              name: "password",
            },
          ])
        ).password
      );

    const account = (await spinner.runCommand(async () => {
      await cryptoWaitReady();
      return new ChainAccount(mnemonic);
    }, "Initialising")) as ChainAccount;

    const { abi, wasm } = (await spinner.runCommand(async () => {
      if (!contractInfo.build) {
        this.error(`No build info found for contract named ${args.contractName}`);
      }
      const abi = (await readJSON(
        path.resolve(contractInfo.build.artifactsPath, `${args.contractName}.json`)
      )) as Abi;
      let wasm;
      if (contractInfo.language === "ask") {
        wasm = await readFile(
          path.resolve(contractInfo.build.artifactsPath, `${args.contractName}.wasm`)
        );
      } else {
        const contract = await readJSON(
          path.resolve(contractInfo.build.artifactsPath, `${args.contractName}.wasm`)
        );
        wasm = contract.source.wasm;
      }
      return { abi, wasm };
    }, "Getting WASM")) as { abi: Abi; wasm: Buffer };

    const networkUrl = resolveNetworkUrl(config, flags.network ?? "");

    const api = (await spinner.runCommand(async () => {
      const api = new DeployApi(networkUrl);
      await api.start();
      return api;
    }, "Connecting to node")) as DeployApi;

    const contractAddress = (await spinner.runCommand(async () => {
      try {
        const contractAddress = await api.deploy(
          abi,
          wasm,
          account.pair,
          flags.gas,
          flags.args as string[]
        );
        return contractAddress;
      } catch (e) {
        console.error(e);
        throw new Error("Error deploying!");
      }
    }, "Deploying")) as string;

    await spinner.runCommand(async () => {
      contractInfo.deployments = [
        ...contractInfo.deployments,
        {
          timestamp: Date.now(),
          address: contractAddress,
          networkUrl,
          deployerAlias: flags.account,
        },
      ];

      await writeJSON(path.resolve("swanky.config.json"), config, {
        spaces: 2,
      });
    }, "Writing config");

    this.log(`Contract deployed!`);
    this.log(`Contract address: ${contractAddress}`);
  }
}
*/
import {Command, Flags} from '@oclif/core'

export default class PhalaContractDeploy extends Command {
  static description = 'describe the command here'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: Flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(PhalaContractDeploy)

    const name = flags.name ?? 'world'
    this.log(`hello ${name} from /home/hashwarlock/Projects/Phala/Swanky/swanky-plugin-phala/src/commands/phala/contract/deploy.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
