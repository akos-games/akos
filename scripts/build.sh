#!/usr/bin/env bash

# Refactoring:
# electron build engine
# move engine build to editor dist
# electron build editor

function build_electron() {

  local project
  project="$1"

  ng build "$project" --prod --base-href ./
  tsc -p projects/"$project"/tsconfig.electron.json
  electron-builder --dir -c projects/"$project"/electron-builder.yml
}

function detect_os() {

  local OS

  if [[ "$OSTYPE" == "linux-gnu" ]]; then
    OS=linux
  elif [[ "$OSTYPE" == "darwin"* ]]; then
    OS=mac
  else
    OS=win
  fi

  echo "$OS"
}

function move_engine_build() {

  echo "Moving engine build to editor directory..."

  rm -rf dist/release/akos-editor/"$OS"-unpacked/engine/"$OS"*
  mkdir -p dist/release/akos-editor/"$OS"-unpacked/engine/"$OS"
  mv dist/release/akos-engine/"$OS"-unpacked/* dist/release/akos-editor/"$OS"-unpacked/akos-engine/"$OS"
}

function clean_release() {

  echo "Cleaning release directory..."

  rm -rf dist/release/akos-engine
  rm dist/release/akos-editor/*.yaml
  mv dist/release/akos-editor/$OS-unpacked/* dist/release/akos-editor
  rmdir dist/release/akos-editor/$OS-unpacked
  mv dist/release/akos-editor dist/release/akos-editor
}

OS=$(detect_os)
rm -rf dist/release
ng build akos-common
build_electron "akos-editor"
build_electron "akos-engine"
move_engine_build
clean_release
