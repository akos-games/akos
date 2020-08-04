#!/usr/bin/env bash

project=$1
port=$2
port_debug=$3

wait-on http-get://localhost:"$port"/
tsc -p projects/"$project"/tsconfig.electron.json
electron --inspect="$port_debug" dist/compile/"$project"/index.js -s
