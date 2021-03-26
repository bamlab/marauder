git-marauder
============

Encrypt secrets

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/git-marauder.svg)](https://npmjs.org/package/git-marauder)
[![Downloads/week](https://img.shields.io/npm/dw/git-marauder.svg)](https://npmjs.org/package/git-marauder)
[![License](https://img.shields.io/npm/l/git-marauder.svg)](https://github.com/tpucci/git-marauder/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage

```sh-session
$ npm install -g git-marauder
$ git-marauder COMMAND
running command...
$ git-marauder --help [COMMAND]
USAGE
  $ git-marauder COMMAND
...
```

# Commands
<!-- commands -->
* [`git-marauder gen-key`](#git-marauder-gen-key)
* [`git-marauder help [COMMAND]`](#git-marauder-help-command)
* [`git-marauder init`](#git-marauder-init)
* [`git-marauder spy PATH`](#git-marauder-spy-path)

## `git-marauder gen-key`

Init marauder

```
USAGE
  $ git-marauder gen-key

EXAMPLE
  $ git-marauder gen-key

  todo
```

_See code: [src/commands/gen-key.ts](https://github.com/bamlab/git-marauder/blob/v1.0.0/src/commands/gen-key.ts)_

## `git-marauder help [COMMAND]`

display help for git-marauder

```
USAGE
  $ git-marauder help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `git-marauder init`

Init marauder

```
USAGE
  $ git-marauder init

EXAMPLE
  $ git-marauder init

  todo
```

_See code: [src/commands/init.ts](https://github.com/bamlab/git-marauder/blob/v1.0.0/src/commands/init.ts)_

## `git-marauder spy PATH`

Show the real content of a file, as git store it, before sending it to the server.

```
USAGE
  $ git-marauder spy PATH

EXAMPLE
  $ git-marauder spy e.txt

  ~(^marauder^)~
  8cf027a41e74a383046da101c4379a16
  faadd220be715fb582776bde776dcd2f
  5bd00e63c3413b52896431b84e84c769
  fe0ea581011cacc1650f77f5339f678b
  90035d29e0c8b099cacb7916fb3863da
```

_See code: [src/commands/spy.ts](https://github.com/bamlab/git-marauder/blob/v1.0.0/src/commands/spy.ts)_
<!-- commandsstop -->
