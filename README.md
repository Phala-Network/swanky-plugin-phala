# swanky-plugin-phala

This is an example plugin for swanky-cli, meant to demonstrate how to build one.
It adds `phala node download` commands to swanky-cli's `swanky` command.
When called, it downloads phala-node from https://github.com/Phala-Network/phala-blockchain/releases/download/poc2-3.0-alpha1/phala-node and puts it in `bin/` folder.

## How to use:

Install swanky-cli globally:

```
npm i -g @astar-network/swanky-cli
```

Clone this repo, run `yarn install` then run `yarn build`, and link it to swanky-cli:

```
swanky plugins:install [PATH_TO_REPO]
```

> **NOTE** This does not work currently. Use dev commands instead by executing `./bin/dev phala [command]` instead.
> 

Now you can run `swanky phala init`

## swanky-core

Most of the core functionality has been extracted to swanky-core package so it can be reused:

[source](https://github.com/AstarNetwork/swanky-cli/tree/feature/convert-to-monorepo/packages/core)

[package](https://www.npmjs.com/package/@astar-network/swanky-core/v/1.0.0-alpha.7)

## oclif docs:

https://oclif.io/docs/introduction
https://oclif.io/docs/plugins
https://github.com/oclif/plugin-plugins

# Generated README:

<!-- toc -->
* [swanky-plugin-phala](#swanky-plugin-phala)
* [Generated README:](#generated-readme)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g @phala/swanky-plugin-phala
$ phala COMMAND
running command...
$ phala (--version|-V|-v)
@phala/swanky-plugin-phala/0.0.1 linux-x64 node-v18.12.1
$ phala --help [COMMAND]
USAGE
  $ phala COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
- [x] [`phala help [COMMAND]`](#phala-help-command)
- [ ] [`phala phala account create [FILE]`](#phala-phala-account-create-file)
- [ ] [`phala phala account list [FILE]`](#phala-phala-account-list-file)
- [ ] [`phala phala check [FILE]`](#phala-phala-check-file)
- [ ] [`phala phala contract call [FILE]`](#phala-phala-contract-call-file)
- [x] [`phala phala contract compile CONTRACTNAME [WATCHFLAG]`](#phala-phala-contract-compile-contractname-watchflag)
- [ ] [`phala phala contract deploy [FILE]`](#phala-phala-contract-deploy-file)
- [ ] [`phala phala contract new [FILE]`](#phala-phala-contract-new-file)
- [ ] [`phala phala contract test [FILE]`](#phala-phala-contract-test-file)
- [x] [`phala phala contract typegen CONTRACTNAME [WATCHFLAG]`](#phala-phala-contract-typegen-contractname-watchflag)
- [x] [`phala phala init PROJECTNAME`](#phala-phala-init-projectname)
- [x] [`phala phala node setup`](#phala-phala-node-setup)
- [x] [`phala phala node start`](#phala-phala-node-start)

## `phala help [COMMAND]`

Display help for phala.

```
USAGE
  $ phala help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for phala.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.19/src/commands/help.ts)_

## `phala phala account create [FILE]`

describe the command here

```
USAGE
  $ phala phala account create [FILE] [-n <value>] [-f]

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  describe the command here

EXAMPLES
  $ phala phala account create
```

## `phala phala account list [FILE]`

describe the command here

```
USAGE
  $ phala phala account list [FILE] [-n <value>] [-f]

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  describe the command here

EXAMPLES
  $ phala phala account list
```

## `phala phala check [FILE]`

describe the command here

```
USAGE
  $ phala phala check [FILE] [-n <value>] [-f]

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  describe the command here

EXAMPLES
  $ phala phala check
```

## `phala phala contract call [FILE]`

describe the command here

```
USAGE
  $ phala phala contract call [FILE] [-n <value>] [-f]

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  describe the command here

EXAMPLES
  $ phala phala contract call
```

## `phala phala contract compile CONTRACTNAME [WATCHFLAG]`

Compile Contract

```
USAGE
  $ phala phala contract compile [CONTRACTNAME] [WATCHFLAG] [-v]

ARGUMENTS
  CONTRACTNAME  contract name of phat contract
  WATCHFLAG     watch for changes

FLAGS
  -v, --verbose

DESCRIPTION
  Compile Contract

EXAMPLES
  $ phala phala contract compile [contractName] [--watch] [--release]
```

## `phala phala contract deploy [FILE]`

describe the command here

```
USAGE
  $ phala phala contract deploy [FILE] [-n <value>] [-f]

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  describe the command here

EXAMPLES
  $ phala phala contract deploy
```

## `phala phala contract new [FILE]`

describe the command here

```
USAGE
  $ phala phala contract new [FILE] [-n <value>] [-f]

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  describe the command here

EXAMPLES
  $ phala phala contract new
```

## `phala phala contract test [FILE]`

describe the command here

```
USAGE
  $ phala phala contract test [FILE] [-n <value>] [-f]

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  describe the command here

EXAMPLES
  $ phala phala contract test
```

## `phala phala contract typegen CONTRACTNAME [WATCHFLAG]`

Typings

```
USAGE
  $ phala phala contract typegen [CONTRACTNAME] [WATCHFLAG] [-v]

ARGUMENTS
  CONTRACTNAME  contract name of phat contract
  WATCHFLAG     watch for changes

FLAGS
  -v, --verbose

DESCRIPTION
  Typings

EXAMPLES
  $ phala phala contract typegen [contractName] [--watch]
```

## `phala phala init PROJECTNAME`

Generate a new Phat Contract environment

```
USAGE
  $ phala phala init [PROJECTNAME] [--phala-node] [--template blank|http_client|phat_hello] [-v]

ARGUMENTS
  PROJECTNAME  directory name of new project

FLAGS
  -v, --verbose
  --phala-node
  --template=<option>  <options: blank|http_client|phat_hello>

DESCRIPTION
  Generate a new Phat Contract environment

EXAMPLES
  $ phala phala init [projectName]
```

## `phala phala node setup`

Configuring the local testnet

```
USAGE
  $ phala phala node setup [-v]

FLAGS
  -v, --verbose

DESCRIPTION
  Configuring the local testnet

EXAMPLES
  $ phala phala node setup
```

## `phala phala node start`

Starting local stack (node + pruntime + pherry)

```
USAGE
  $ phala phala node start

DESCRIPTION
  Starting local stack (node + pruntime + pherry)

EXAMPLES
  $ phala phala node start
```
<!-- commandsstop -->
