# Phala Swanky Setup

## Swanky Suite

Swanky Suite aims to be an "all-in-one" tool for Wasm smart contract developers. It is modeled on existing tools like `cargo contract CLI` and `polkadot.js`. The `swanky-cli` tool is built with the `oclif` (Open CLI Framework [repo](https://oclif.io/docs/introduction)).

Building with `oclif` allows for the `swanky-cli` to be extended through the [plugin-plugin](https://github.com/oclif/plugin-plugins) feature. Now the `swanky-phala-plugin` plugin can be added to the `swanky-cli` (note: must install `swanky-cli`first) with the command `swanky plugins:link [PATH_TO_REPO]`. Specific installation instructions and examples will be displayed later, so do not worry about getting this set up now.

### DevPHAse

DevPHAse is a developer tool built and maintained by Phala community member 100k. DevPhase is a command line utility that enables a developer building Phat Contracts to:

- Install binaries for phala-node, pherry and pruntime.
- Install local testnet configuration files to allow for Phat Contracts to be deployed into a cluster with a systems contract to enable SideVM for logging.
- Create testnet accounts.
- Start the local testnet.
- Configure the local testnet by:
  - Registering Workers and their endpoints
  - Register Gatekeeper
  - Upload systems contract code
  - Deploy a Cluster with the `su` account (Default: Alice)
  - Deploy driver contract code
    - Phat Contract Tokenomics
    - SideVm Deployer
  - Authorize Logger SideVM Contract
  - Upload SideVM Logger to cluster and Deploy SideVM Logger
- Compile Phat contracts into a `.wasm`, `metadata.json` and `.contract` file(combines the `.wasm` and `metadata.json` file into one `.contract` file).
- Upload and Instantiate a compiled Phat Contract to a cluster on the local testnet.
- Call (queries and transactions) instantiated Phat Contracts directly.
- Check local dev environment setup.

# Getting Started

## Installation

> *Currently `swanky phala` will only support Ubuntu Linux. Other Linux operating systems are support, but this requires downloading and compiling `phala-node`, `pherry` and `pruntime` binaries locally. Then copy the binaries to the `stacks/` folder.*
>

### Install Swanky CLI

Follow the instructions from Astar Network wiki [here](https://docs.astar.network/docs/wasm/sc-dev/swanky#installing).

### Install Swanky Phala Plugin

**npm**

> **Note:** Currently, not officially published, yet. Instead, use the next option.
>

```bash
npm install -g @phala/swanky-phala-plugin
```

or

```bash
npx @phala/swanky-phala-plugin
```

**************locally**************

Clone the `swanky-phala-plugin` GitHub repository.

```bash
git clone git@github.com:Phala-Network/swanky-plugin-phala.git
cd swanky-plugin-phala
yarn install
yarn build
```

### Add `swanky-phala-plugin` to `swanky` CLI

Use `plugins:install` for **npm**

```bash
swanky plugins:install @phala/swanky-phala-plugin
```

or **GitHub URL**

```bash
swanky plugins:install https://github.com/Phala-Network/swanky-plugin-phala.git
```

If installed and built **locally** then use `plugins:link` to link `swanky` to the local path to `swanky-phala-plugin`

```bash
swanky plugins:link [PATH_TO_REPO]
```

example:

```bash
swanky plugins:link ~/Projects/swanky-phala-plugin

@astar-network/swanky-cli: linking plugin @phala/swanky-plugin-phala... done
```

### Commands

Now there should be a `swanky phala` CLI available. Execute the `swanky phala --help` command to check available commands.

```bash
swanky phala --help
Swanky plugin to setup Phala developer environment for Phat Contracts.

USAGE
  $ swanky phala COMMAND

TOPICS
  phala account   Create or list accounts.
  phala contract  Create, compile, deploy, test or call Phat Contracts.
  phala node      Download binaries to start local testnet and configure for Phat Contract development.

COMMANDS
  phala check  Not Available
  phala init   Generate a new Phat Contract environment
```

### Initialize a Project

Easily get started with a new Phat Contract project by executing `swanky phala init [PROJECT_NAME]`

```bash
swanky phala init test-swanky-phala
```

This will initiate a round of questions to get your Phat Contract template configured. First question will ask:

```bash
? Which contract language should we use? (Use arrow keys)
❯ pink
```

At this moment, `pink` is the only contract language option at this time. `pink` is the Phala `ink` library to support rust-based [ink! language](https://paritytech.github.io/ink/) in Phala’s `pRuntime` workers.

Next you’ll be asked the what contract template to use (`blank`, `http_client`, or `phat_hello` more to come!).

```bash
? Which contract template should we use? (Use arrow keys)
  blank 
❯ http_client 
  phat_hello
```

Now that you have a Phat Contract language and template picked, you will be asked to create a name for the PC. (*****default is the template name*****)

```bash
? What should we name your contract? (http_client)
```

After you select a name, you’ll be asked for your `git` username (default is `git config --get user.name`) and email.

```bash
? What is your name? (HashWarlock)
? What is your email?
```

An expected final output will display when the template files and project directory is created.

```bash
? Which contract template should we use? pink
? Which contract template should we use? http_client
? What should we name your contract? http_client
? What is your name? HashWarlock
? What is your email? 
✔ Checking dependencies OK
Initializing
✔ Copying template files OK
✔ Processing templates OK
✔ Initializing git OK
✔ Installing dependencies OK
⠼ Downloading Phala binaries for local testnet...yarn run v1.22.18
$ /Users/hashwarlock/Projects/Phala/Swanky/test-swanky-phala/test-swanky-phala/node_modules/.bin/devphase init
[Init] Initiation
[Initializer] Creating files
[Initializer] accounts.json
[Initializer] devphase.config.ts
[Initializer] Creating directories
[Initializer] tests
Done in 1.90s.
✔ Downloading Phala binaries for local testnet... OK
Phat Contract project successfully initialised!
```

Execute `ls` to list the new project directory called `test-swanky-phala` in the current working directory.

```bash
ls
total 0
drwxr-xr-x   3 hashwarlock  staff    96B Jan 19 20:45 .
drwxr-xr-x   5 hashwarlock  staff   160B Jan 19 18:37 ..
drwxr-xr-x  15 hashwarlock  staff   480B Jan 19 20:46 test-swanky-phala
```

`cd` into `test-swanky-phala` and execute `ls`.

```bash
cd test-swanky-phala
ls
total 240
drwxr-xr-x   15 hashwarlock  staff   480B Jan 19 20:46 .
drwxr-xr-x    3 hashwarlock  staff    96B Jan 19 20:45 ..
drwxr-xr-x    3 hashwarlock  staff    96B Jan 19 20:46 .devphase
drwxr-xr-x    9 hashwarlock  staff   288B Jan 19 20:45 .git
-rw-r--r--    1 hashwarlock  staff   3.8K Jan 19 20:45 .gitignore
-rw-r--r--    1 hashwarlock  staff   143B Jan 19 20:46 accounts.json
drwxr-xr-x    3 hashwarlock  staff    96B Jan 19 20:45 contracts
-rw-r--r--    1 hashwarlock  staff   3.6K Jan 19 20:46 devphase.config.ts
drwxr-xr-x  224 hashwarlock  staff   7.0K Jan 19 20:46 node_modules
-rw-r--r--    1 hashwarlock  staff   287B Jan 19 20:45 package.json
drwxr-xr-x    3 hashwarlock  staff    96B Jan 19 20:45 patches
drwxr-xr-x    3 hashwarlock  staff    96B Jan 19 20:45 test
drwxr-xr-x    2 hashwarlock  staff    64B Jan 19 20:46 tests
-rw-r--r--    1 hashwarlock  staff   271B Jan 19 20:45 tsconfig.json
-rw-r--r--    1 hashwarlock  staff    97K Jan 19 20:46 yarn.lock
```

### Download Phala Binaries

> **Note:** Currently there are no separate commands to download/start/stop the binaries (`phala-node`, `pherry`, `pruntime`) but this will be available soon. For now, `swanky phala node start` will download the binaries and auto-start the local testnet.
>

Here is an example of how the directory structure looks like:

```bash
➜  test-swanky-phala git:(master) ✗ ls                                                                                                                                          ~/Projects/Phala/Swanky/test-swanky-phala/test-swanky-phala
total 240
drwxr-xr-x   16 hashwarlock  staff   512B Jan 19 21:00 .
drwxr-xr-x    3 hashwarlock  staff    96B Jan 19 20:45 ..
drwxr-xr-x    3 hashwarlock  staff    96B Jan 19 20:46 .devphase
drwxr-xr-x    9 hashwarlock  staff   288B Jan 19 20:45 .git
-rw-r--r--    1 hashwarlock  staff   3.8K Jan 19 20:45 .gitignore
-rw-r--r--    1 hashwarlock  staff   143B Jan 19 20:46 accounts.json
drwxr-xr-x    3 hashwarlock  staff    96B Jan 19 20:45 contracts
-rw-r--r--    1 hashwarlock  staff   3.6K Jan 19 20:46 devphase.config.ts
drwxr-xr-x  224 hashwarlock  staff   7.0K Jan 19 20:46 node_modules
-rw-r--r--    1 hashwarlock  staff   287B Jan 19 20:45 package.json
drwxr-xr-x    3 hashwarlock  staff    96B Jan 19 20:45 patches
drwxr-xr-x    4 hashwarlock  staff   128B Jan 19 21:00 stacks
drwxr-xr-x    3 hashwarlock  staff    96B Jan 19 20:45 test
drwxr-xr-x    2 hashwarlock  staff    64B Jan 19 20:46 tests
-rw-r--r--    1 hashwarlock  staff   271B Jan 19 20:45 tsconfig.json
-rw-r--r--    1 hashwarlock  staff    97K Jan 19 20:46 yarn.lock
➜  test-swanky-phala git:(master) ✗ cd stacks                                                                                                                                   ~/Projects/Phala/Swanky/test-swanky-phala/test-swanky-phala
➜  stacks git:(master) ✗ ls                                                                                                                                              ~/Projects/Phala/Swanky/test-swanky-phala/test-swanky-phala/stacks
total 0
drwxr-xr-x   4 hashwarlock  staff   128B Jan 19 21:00 .
drwxr-xr-x  16 hashwarlock  staff   512B Jan 19 21:00 ..
drwxr-xr-x   3 hashwarlock  staff    96B Jan 19 21:00 .data
drwxr-xr-x  10 hashwarlock  staff   320B Jan 19 21:00 nightly-2023-01-20
➜  stacks git:(master) ✗ cd nightly-2023-01-20                                                                                                                           ~/Projects/Phala/Swanky/test-swanky-phala/test-swanky-phala/stacks
➜  nightly-2023-01-20 git:(master) ✗ ls                                                                                                               ~/Projects/Phala/Swanky/test-swanky-phala/test-swanky-phala/stacks/nightly-2023-01-20
total 264888
drwxr-xr-x  10 hashwarlock  staff   320B Jan 19 21:00 .
drwxr-xr-x   4 hashwarlock  staff   128B Jan 19 21:00 ..
-rw-r--r--   1 hashwarlock  staff    17K Jan 19 21:00 log_server.contract
-rw-r--r--   1 hashwarlock  staff   200K Jan 19 21:00 log_server.sidevm.wasm
-rwxr-xr-x   1 hashwarlock  staff    84M Jan 19 21:00 phala-node
-rwxr-xr-x   1 hashwarlock  staff    17M Jan 19 21:00 pherry
-rwxr-xr-x   1 hashwarlock  staff    28M Jan 19 21:00 pruntime
-rw-r--r--   1 hashwarlock  staff    12K Jan 19 21:00 sidevm_deployer.contract
-rw-r--r--   1 hashwarlock  staff    36K Jan 19 21:00 system.contract
-rw-r--r--   1 hashwarlock  staff   8.1K Jan 19 21:00 tokenomic.contract
```

### Start a Phala Local Testnet

`swanky phala node start` will check if the following exists in the current directory or up:

- `devphase.config.ts`
- `stack/`
  - `phala-node`
  - `pruntime`
  - `pherry`

Once verified file are downloaded and there is not an instance running currently, the local testnet will start.

```bash
swanky phala node start
$ /Users/hashwarlock/Projects/Phala/Swanky/test-swanky-phala/test-swanky-phala/node_modules/.bin/devphase stack
    [Stack] Starting
    [StackBinaryDownloader] Creating stack directory
    [StackBinaryDownloader] Downloading stack binaries nightly-2023-01-20
    [StackBinaryDownloader] log_server.contract
    [StackBinaryDownloader] log_server.sidevm.wasm
    [StackBinaryDownloader] phala-node
    [StackBinaryDownloader] pherry
    [StackBinaryDownloader] pruntime
    [StackBinaryDownloader] sidevm_deployer.contract
    [StackBinaryDownloader] system.contract
    [StackBinaryDownloader] tokenomic.contract
    [StackManager] Waiting for phala-node to start with 10.0 s timeout.
    [phala-node]
		[pruntime]
		[pherry]
```

> ********Note:******** Currently the local testnet will start, but the CLI will not output the logs of `phala-node`, `pruntime` and `pherry`. This will be fixed in the future.
>

### Configure the Running Local Testnet for Phat Contract Deployment

A Phala local testnet needs the following for Phat Contracts to be deployed and instantiated to a cluster:

- Register the Workers and setup their endpoints;
- Register the Gatekeepers;
- Create Cluster 0x0 with `Alice` as the owner and the System contract above;
- Register two Drivers to the System contract
  - the log server printing all the Phat contracts' log;
  - the SideVM deployer controlling which contracts can start the SideVM;

This is accomplished by executing `swanky phala node setup`.

```bash
swanky phala node setup
TODO add output from successful setup
```

### Compile Your Contract

We have accomplished the following:

- Created a project directory with a configured template Phat Contract.
- Downloaded Phala binaries, drivers, system contracts and sideVM programs.
- Started and set up a local testnet to start deploying Phat Contracts to a worker node in the deployed `0x0` cluster.

Let’s begin the process of deploying the Phat Contract, but first the PC must be compiled to get the `contract.wasm`, `metadata.json` and `contract.contract` files that will be used to upload and instantiate the PC to the local testnet cluster.

> ************Note:************ Follow these [installation steps](https://wiki.phala.network/en-us/build/stateless/setup/) before continuing to ensure you can compile your Phat Contract.
>

We can compile the PC with `swanky phala contract compile [CONTRACT_NAME]` and will look like the follow:

```bash
swanky phala contract compile http_client
Compile contract(s)
⠏ Compiling Phat Contract http_clientyarn run v1.22.18
Original wasm size: 39.7K, Optimized: 15.8K

The contract was built in DEBUG mode.

Your contract artifacts are ready. You can find them in:
/Users/hashwarlock/Projects/Phala/Swanky/test-swanky-phala/test-swanky-phala/contracts/http_client/target/ink

  - http_client.contract (code + metadata)
  - http_client.wasm (the contract's code)
  - metadata.json (the contract's metadata)
[Compiler] Files generated under:
artifacts/http_client/http_client.contract
artifacts/http_client/http_client.wasm
artifacts/http_client/metadata.json
[TypeBinder] Generating type bindings for: http_client
Done in 47.67s.
✔ Compiling Phat Contract http_client OK
Phat Contract compiled successfully!
```

### Generate Types for Contract

If you have compiled your contract already, the types will be auto-generated at the end of a successful compilation. In the case that the types were not generated for the contract, execute the `swanky phala contract typegen [CONTRACT_NAME]`.

An example of the output will create `typings/` folder with a TypeScript file of the contract's generated types.
```bash
└─[$]> swanky phala contract typegen phat_hello
Create type bindings for contracts
⠹ Creating type bindings for Phat Contract phat_helloyarn run v1.22.17
$ /home/hashwarlock/Projects/Phala/Swanky/phala-swankster/node_modules/.bin/devphase typings phat_hello undefined
[Typings] Starting
[MultiContractExecutor] Criteria: phat_hello
[MultiContractExecutor] Matched contracts: [ 'phat_hello' ]
[TypeBinder] Generating type bindings for: phat_hello
Done in 0.91s.
✔ Creating type bindings for Phat Contract phat_hello OK
Phat Contract typings created successfully!
```

### Deploy and Instantiate Contract

> ************Note:************ TODO
>

### Interact with Deployed Contract

> ************Note:************  TODO
>
