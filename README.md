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
<!-- usage -->
```sh-session
$ npm install -g git-marauder
$ git-marauder COMMAND
running command...
$ git-marauder (-v|--version|version)
git-marauder/0.0.0 darwin-x64 node-v14.15.5
$ git-marauder --help [COMMAND]
USAGE
  $ git-marauder COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`git-marauder hello [FILE]`](#git-marauder-hello-file)
* [`git-marauder help [COMMAND]`](#git-marauder-help-command)

## `git-marauder hello [FILE]`

describe the command here

```
USAGE
  $ git-marauder hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ git-marauder hello
  hello world from ./src/hello.ts!
```

_See code: [lib/commands/hello.js](https://github.com/tpucci/git-marauder/blob/v0.0.0/lib/commands/hello.js)_

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
<!-- commandsstop -->
