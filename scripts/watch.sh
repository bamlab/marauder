#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset
# set -o xtrace

cd $(git rev-parse --show-toplevel)
watchman-make -p "src/**/*.ts" --run "yarn pack"
