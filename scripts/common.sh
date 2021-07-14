#!/usr/bin/env bash

function build_electron() {
  local project
  project="$1"

  ng build akos-common || exit 1
  ng build "$project" --base-href ./ || exit 1
  tsc -p projects/"$project"/tsconfig.electron.json || exit 1
  electron-builder --publish never -c projects/"$project"/electron-builder.yml || exit 1
}
