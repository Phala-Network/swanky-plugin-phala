import {Args, Command, Flags} from '@oclif/core'
import {
  checkCliDependencies,
  copyTemplateFiles,
  installDeps,
  processTemplates,
  Spinner,
} from "@astar-network/swanky-core";
import {paramCase, pascalCase, snakeCase} from "change-case";
import inquirer from 'inquirer';

import {email, name, pickLanguage, pickTemplate} from "../../lib/prompts";
import execa from 'execa'
import {readdirSync} from "node:fs";
import {Initializer, RunMode, RuntimeContext} from '@devphase/service';
import path = require("node:path");

export function getTemplates(language = "pink") {
  const templatesPath = path.resolve(__dirname, "../..", "templates");
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

export default class PhalaInit extends Command {
  static description = 'Generate a new Phat Contract environment'

  static examples = [
    '<%= config.bin %> <%= command.id %> [projectName]',
  ]

  static flags = {
    verbose: Flags.boolean({ char: "v" }),
  };

  static args = {
    projectName: Args.string({
      name: "projectName",
      required: true,
      description: "directory name of new project",
    }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(PhalaInit);

    const projectPath = path.resolve(args.projectName);

    const { contractLanguage } = await inquirer.prompt([pickLanguage()]);

    const templates = getTemplates();

    const questions = [
      pickTemplate(templates.contractTemplatesList),
      name("contract", (ans) => ans.contractTemplate, "What should we name your contract?"),
      name(
        "author",
        () => execa.commandSync("git config --get user.name").stdout,
        "What is your name?"
      ),
      email(),
    ];

    const answers = await inquirer.prompt(questions);

    const spinner = new Spinner(flags.verbose);

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
          project_name: paramCase(args.projectName),
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

    await spinner.runCommand(
      () => execa.command("git init", { cwd: projectPath }),
      "Initializing git"
    );

    await spinner.runCommand(
      () => installDeps(projectPath),
      "Installing dependencies",
      "",
      "",
      false
    );

    // Change current directory to the project path
    process.chdir(projectPath);
    const runtimeContextPromise = await RuntimeContext.getSingleton();
    await runtimeContextPromise.initContext(RunMode.Simple);

    const initializer = new Initializer(runtimeContextPromise);
    await spinner.runCommand(
      async () => await initializer.init(),
      "Copying devphase config files",
    );

    await spinner.runCommand(
      async () => await runtimeContextPromise.requestStackBinaries(true),
      "Installing phala node, pruntime and pherry binaries",
    );

    await spinner.runCommand(
      () => execa.command("rm -r ./tests/", { cwd: projectPath }),
      ""
    );

    this.log("Phat Contract project successfully initialised!");
  }
}
