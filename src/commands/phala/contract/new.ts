import {Command, Args} from '@oclif/core'
import {paramCase, pascalCase, snakeCase} from "change-case";
import inquirer from 'inquirer';

import {email, name, pickLanguage, pickTemplate} from "../../../lib/prompts";
import execa from 'execa'
import {readdirSync} from "node:fs";
import {RunMode, RuntimeContext} from '@devphase/service';
import path = require("node:path");
import {
  checkCliDependencies,
  copyTemplateFiles,
  processTemplates,
} from '../../../lib/tasks';
import {Spinner} from '../../../lib/spinner';
import {ensureDir, pathExistsSync} from "fs-extra";


export function getTemplates(language = "pink") {
  const templatesPath = path.resolve(__dirname, "../../..", "templates");
  const contractTemplatesPath = path.resolve(templatesPath, "contracts", language);
  const fileList = readdirSync(contractTemplatesPath, {
    withFileTypes: true,
  });
  const contractTemplatesList = fileList
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({
      message: entry.name,
      value: entry.name,
    }));

  return { templatesPath, contractTemplatesPath, contractTemplatesList };
}

export default class PhalaContractNew extends Command {
  static description = 'Creates new contract from template'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static args = {
    contractName: Args.string({
      name: "contractName",
      required: true,
      description: "Name of the new contract",
    }),
  };

  public async run(): Promise<void> {
    const {args} = await this.parse(PhalaContractNew);
    const runtimeContext = await RuntimeContext.getSingleton();
    await runtimeContext.initContext(RunMode.Simple);
    await runtimeContext.requestProjectDirectory();

    const projectPath = path.resolve();

    this.log(`Creating new Phat Contract`);
    const { contractLanguage } = await inquirer.prompt([pickLanguage()]);

    const templates = getTemplates();

    const questions = [
      pickTemplate(templates.contractTemplatesList),
      name("contract", () => args.contractName, "What should we name your contract?"),
      name(
        "author",
        () => execa.commandSync("git config --get user.name").stdout,
        "What is your name?"
      ),
      email(),
    ];

    const answers = await inquirer.prompt(questions);

    if (
      pathExistsSync(path.join(projectPath, "contracts", answers.contractName))
    ) {
      throw new Error(`Contract folder '${answers.contractName}' already exists`);
    }

    const spinner = new Spinner(false);

    await spinner.runCommand(() => checkCliDependencies(spinner), "Checking dependencies");

    this.log(`Initializing`)

    await spinner.runCommand(
      () =>
        copyTemplateFiles(
          templates.templatesPath,
          path.resolve(templates.contractTemplatesPath, answers.contractTemplate),
          answers.contractName,
          projectPath
        ),
      "Copying template files"
    );

    await spinner.runCommand(
      () =>
        processTemplates(projectPath, {
          project_name: paramCase(this.config.pjson.name),
          author_name: answers.authorName,
          author_email: answers.email,
          swanky_version: this.config.pjson.version,
          contract_name: answers.contractName,
          contract_name_snake: snakeCase(answers.contractName),
          contract_name_pascal: pascalCase(answers.contractName),
          contract_language: contractLanguage,
        }),
      "Processing templates"
    );

    await ensureDir(path.resolve(projectPath, "stacks", answers.contractName));
    await ensureDir(path.resolve(projectPath, "test", answers.contractName));

    this.log(`😎 Successfully created new Phat Contract! 😎`);
  }
}

