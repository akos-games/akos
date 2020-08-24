#!/usr/bin/env bash

function build_electron() {
  local project
  project="$1"

  ng build akos-common
  ng build "$project" --prod --base-href ./
  tsc -p projects/"$project"/tsconfig.electron.json
  electron-builder -c projects/"$project"/electron-builder.yml
}
