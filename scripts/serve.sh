#!/usr/bin/env bash

project=$1;
port=$2;

wait-on http-get://localhost:"$port"/
tsc -p projects/"$project"/tsconfig.electron.json
electron --inspect=5858 dist/"$1"/index.js -s
