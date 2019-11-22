#!/usr/bin/env bash

wait-on http-get://localhost:4200/
tsc -p projects/"$1"/src/electron
electron --inspect=5858 dist/"$1"/index.js -s
