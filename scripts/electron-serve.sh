#!/usr/bin/env bash

wait-on http-get://localhost:4200/
tsc -p projects/"$1"/tsconfig.electron.json
electron --inspect=5858 dist/"$1"/index.js -s
