Marauder
============

Encrypt secrets

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@bam.tech/marauder.svg)](https://npmjs.org/package/@bam.tech/marauder)
[![Downloads/week](https://img.shields.io/npm/dw/@bam.tech/marauder.svg)](https://npmjs.org/package/@bam.tech/marauder)
[![License](https://img.shields.io/npm/l/@bam.tech/marauder.svg)](https://github.com/bamlab/marauder/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage

```sh-session
$ npm install -g marauder
$ marauder COMMAND
running command...
$ marauder --help [COMMAND]
USAGE
  $ marauder COMMAND
...
```

# Commands
<!-- commands -->
* [`marauder autocomplete [SHELL]`](#marauder-autocomplete-shell)
* [`marauder generate-key`](#marauder-generate-key)
* [`marauder help [COMMAND]`](#marauder-help-command)
* [`marauder init`](#marauder-init)
* [`marauder spy-raw PATH`](#marauder-spy-raw-path)

## `marauder autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ marauder autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ marauder autocomplete
  $ marauder autocomplete bash
  $ marauder autocomplete zsh
  $ marauder autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.3.0/src/commands/autocomplete/index.ts)_

## `marauder generate-key`

Generate Secret key for marauder

```
USAGE
  $ marauder generate-key

EXAMPLE
  $ marauder generate-key

  todo
```

_See code: [src/commands/generate-key.ts](https://github.com/bamlab/marauder/blob/v1.0.0/src/commands/generate-key.ts)_

## `marauder help [COMMAND]`

display help for marauder

```
USAGE
  $ marauder help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `marauder init`

Init marauder

```
USAGE
  $ marauder init

OPTIONS
  -s, --with-secret-key=with-secret-key  initialize the repository with a given secret key

EXAMPLES
  $ marauder init

  todo
  $ marauder init --with-secret-key

  todo
```

_See code: [src/commands/init.ts](https://github.com/bamlab/marauder/blob/v1.0.0/src/commands/init.ts)_

## `marauder spy-raw PATH`

Show the real content of a file, as git store it, before sending it to the server.

```
USAGE
  $ marauder spy-raw PATH

ALIASES
  $ marauder spy

EXAMPLE
  $ marauder spy-raw-file e.txt

  ~(^marauder^)~
  8cf027a41e74a383046da101c4379a16
  faadd220be715fb582776bde776dcd2f
  5bd00e63c3413b52896431b84e84c769
  fe0ea581011cacc1650f77f5339f678b
  90035d29e0c8b099cacb7916fb3863da
```

_See code: [src/commands/spy-raw.ts](https://github.com/bamlab/marauder/blob/v1.0.0/src/commands/spy-raw.ts)_
<!-- commandsstop -->
