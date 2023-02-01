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
swanky plugins:link [PATH_TO_REPO]
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
* [`phala help [COMMAND]`](#phala-help-command)
* [`phala phala account create`](#phala-phala-account-create)
* [`phala phala account list`](#phala-phala-account-list)
* [`phala phala check [FILE]`](#phala-phala-check-file)
* [`phala phala contract call [FILE]`](#phala-phala-contract-call-file)
* [`phala phala contract compile [CONTRACTNAME] [WATCHFLAG] [RELEASEFLAG]`](#phala-phala-contract-compile-contractname-watchflag-releaseflag)
* [`phala phala contract deploy CONTRACTNAME CONTRACTCONSTRUCTOR [CTORARGS]`](#phala-phala-contract-deploy-contractname-contractconstructor-ctorargs)
* [`phala phala contract list`](#phala-phala-contract-list)
* [`phala phala contract new [FILE]`](#phala-phala-contract-new-file)
* [`phala phala contract test [FILE]`](#phala-phala-contract-test-file)
* [`phala phala contract typegen CONTRACTNAME [WATCHFLAG]`](#phala-phala-contract-typegen-contractname-watchflag)
* [`phala phala init PROJECTNAME`](#phala-phala-init-projectname)
* [`phala phala node setup`](#phala-phala-node-setup)
* [`phala phala node start`](#phala-phala-node-start)
* [`phala plugins`](#phala-plugins)
* [`phala plugins:install PLUGIN...`](#phala-pluginsinstall-plugin)
* [`phala plugins:inspect PLUGIN...`](#phala-pluginsinspect-plugin)
* [`phala plugins:install PLUGIN...`](#phala-pluginsinstall-plugin-1)
* [`phala plugins:link PLUGIN`](#phala-pluginslink-plugin)
* [`phala plugins:uninstall PLUGIN...`](#phala-pluginsuninstall-plugin)
* [`phala plugins:uninstall PLUGIN...`](#phala-pluginsuninstall-plugin-1)
* [`phala plugins:uninstall PLUGIN...`](#phala-pluginsuninstall-plugin-2)
* [`phala plugins update`](#phala-plugins-update)

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.17/src/commands/help.ts)_

## `phala phala account create`

Create a new dev account in config

```
USAGE
  $ phala phala account create [-g] [-d]

FLAGS
  -d, --dev
  -g, --generate

DESCRIPTION
  Create a new dev account in config
```

## `phala phala account list`

List dev accounts stored in config

```
USAGE
  $ phala phala account list

DESCRIPTION
  List dev accounts stored in config

EXAMPLES
  $ phala phala account list
```

## `phala phala check [FILE]`

Check the current configuration of the Phala dev environment.

```
USAGE
  $ phala phala check [FILE] [-n <value>] [-f]

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  Check the current configuration of the Phala dev environment.

EXAMPLES
  $ phala phala check
```

## `phala phala contract call [FILE]`

Not Available

```
USAGE
  $ phala phala contract call [FILE] [-n <value>] [-f]

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  Not Available

EXAMPLES
  $ phala phala contract call
```

## `phala phala contract compile [CONTRACTNAME] [WATCHFLAG] [RELEASEFLAG]`

Compile Contract

```
USAGE
  $ phala phala contract compile [CONTRACTNAME] [WATCHFLAG] [RELEASEFLAG] [-v]

ARGUMENTS
  CONTRACTNAME  contract name of phat contract
  WATCHFLAG     watch for changes
  RELEASEFLAG   cargo contract build --release

FLAGS
  -v, --verbose

DESCRIPTION
  Compile Contract

EXAMPLES
  $ phala phala contract compile [contractName] [--watch] [--release]
```

## `phala phala contract deploy CONTRACTNAME CONTRACTCONSTRUCTOR [CTORARGS]`

Deploy contract

```
USAGE
  $ phala phala contract deploy [CONTRACTNAME] [CONTRACTCONSTRUCTOR] [CTORARGS] [-t <value>] [-n <value>] [-l <value>] [-a
    <value>]

ARGUMENTS
  CONTRACTNAME         Contract name
  CONTRACTCONSTRUCTOR  Contract constructor
  CTORARGS             Contract constructor arguments

FLAGS
  -a, --account=<value>       [default: alice] Account used to deploy (alice default)
  -l, --clusterId=<value>     [default: 0x0000000000000000000000000000000000000000000000000000000000000000] Target
                              cluster id
  -n, --network=<value>       [default: local] Target network to deploy (local default)
  -t, --contractType=<value>  [default: InkCode] Contract type (InkCode default)

DESCRIPTION
  Deploy contract

EXAMPLES
  $ phala phala contract deploy [CONTRACT_NAME] [CONSTRUCTOR] -t [CONTRACT_TYPE] -n [NETWORK] -l [CLUSTER_ID] -a [ACCOUNT] [ctorArgs...]
```

## `phala phala contract list`

Display contracts list

```
USAGE
  $ phala phala contract list

DESCRIPTION
  Display contracts list

EXAMPLES
  $ phala phala contract list
```

## `phala phala contract new [FILE]`

Not Available

```
USAGE
  $ phala phala contract new [FILE] [-n <value>] [-f]

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  Not Available

EXAMPLES
  $ phala phala contract new
```

## `phala phala contract test [FILE]`

Not Available

```
USAGE
  $ phala phala contract test [FILE] [-n <value>] [-f]

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  Not Available

EXAMPLES
  $ phala phala contract test
```

## `phala phala contract typegen CONTRACTNAME [WATCHFLAG]`

Generates types for a contract

```
USAGE
  $ phala phala contract typegen [CONTRACTNAME] [WATCHFLAG] [-v]

ARGUMENTS
  CONTRACTNAME  Contract name
  WATCHFLAG     Watch for changes

FLAGS
  -v, --verbose

DESCRIPTION
  Generates types for a contract

EXAMPLES
  $ phala phala contract typegen [contractName] [--watch]
```

## `phala phala init PROJECTNAME`

Generate a new Phat Contract environment

```
USAGE
  $ phala phala init [PROJECTNAME] [-v]

ARGUMENTS
  PROJECTNAME  directory name of new project

FLAGS
  -v, --verbose

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

Starting local stack (phala-node + pruntime + pherry)

```
USAGE
  $ phala phala node start

DESCRIPTION
  Starting local stack (phala-node + pruntime + pherry)

EXAMPLES
  $ phala phala node start
```

## `phala plugins`

List installed plugins.

```
USAGE
  $ phala plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ phala plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.3.0/src/commands/plugins/index.ts)_

## `phala plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ phala plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ phala plugins add

EXAMPLES
  $ phala plugins:install myplugin 

  $ phala plugins:install https://github.com/someuser/someplugin

  $ phala plugins:install someuser/someplugin
```

## `phala plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ phala plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ phala plugins:inspect myplugin
```

## `phala plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ phala plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ phala plugins add

EXAMPLES
  $ phala plugins:install myplugin 

  $ phala plugins:install https://github.com/someuser/someplugin

  $ phala plugins:install someuser/someplugin
```

## `phala plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ phala plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ phala plugins:link myplugin
```

## `phala plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ phala plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ phala plugins unlink
  $ phala plugins remove
```

## `phala plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ phala plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ phala plugins unlink
  $ phala plugins remove
```

## `phala plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ phala plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ phala plugins unlink
  $ phala plugins remove
```

## `phala plugins update`

Update installed plugins.

```
USAGE
  $ phala plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
