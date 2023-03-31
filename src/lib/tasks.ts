import execa from 'execa';
import { ensureDir, rename, copy, readFile, rm, writeFile } from 'fs-extra';
import path from 'node:path';
import globby from 'globby';
import handlebars from 'handlebars';
import { Spinner } from './spinner';

export async function checkCliDependencies(spinner: Spinner) {
    const dependencyList = [
        { dependencyName: 'rust', versionCommand: 'rustc --version' },
        { dependencyName: 'cargo', versionCommand: 'cargo -V' },
        {
            dependencyName: 'cargo contract',
            versionCommand: 'cargo contract -V',
        },
    ];

    for (const dep of dependencyList) {
        spinner.text(`  Checking ${dep.dependencyName}`);
        await execa.command(dep.versionCommand);
    }
}

export async function copyTemplateFiles(
    templatesPath: string,
    contractTemplatePath: string,
    contractName: string,
    projectPath: string
) {
    await ensureDir(projectPath);
    const commonFiles = await globby('*', { cwd: templatesPath });
    await Promise.all(
        commonFiles.map(async (file) => {
            await copy(path.resolve(templatesPath, file), path.resolve(projectPath, file));
        })
    );
    await rename(path.resolve(projectPath, 'gitignore'), path.resolve(projectPath, '.gitignore'));
    await copyContractTemplateFiles(contractTemplatePath, contractName, projectPath);
}

export async function copyContractTemplateFiles(
    contractTemplatePath: string,
    contractName: string,
    projectPath: string
) {
    await copy(
        path.resolve(contractTemplatePath, 'contract'),
        path.resolve(projectPath, 'contracts', contractName)
    );
    await copy(
        path.resolve(contractTemplatePath, 'tests'),
        path.resolve(projectPath, 'tests', contractName)
    );
}

export async function processTemplates(projectPath: string, templateData: Record<string, string>) {
    const templateFiles = await globby(projectPath, {
        expandDirectories: { extensions: [ 'hbs' ] },
        gitignore: true,
    });

    handlebars.registerHelper('if_eq', function (a, b, options): boolean {
        if (a === b) {
            // @ts-ignore
            return options.fn(this);
        } else {
            // @ts-ignore
            return options.inverse(this);
        }
    });

    await Promise.all(
        templateFiles.map(async (tplFilePath) => {
            const rawTemplate = await readFile(tplFilePath, 'utf8');
            const template = handlebars.compile(rawTemplate);
            const compiledFile = template(templateData);
            await rm(tplFilePath);
            await writeFile(tplFilePath.split('.hbs')[0], compiledFile);
        })
    );
}

export async function installDeps(projectPath: string) {
    let installCommand = 'npm install';

    try {
        await execa.command('yarn --version');
        installCommand = 'yarn install';
    } catch (_error) {
        console.log('\n\t >>Yarn not detected, using NPM');
    } finally {
        await execa.command(installCommand, { cwd: projectPath });
    }
}
