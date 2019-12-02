#!/usr/bin/env bash

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

  rm -rf dist/release/editor/"$OS"-unpacked/engine/"$OS"*
  mkdir -p dist/release/editor/"$OS"-unpacked/engine/"$OS"
  mv dist/release/engine/"$OS"-unpacked/* dist/release/editor/"$OS"-unpacked/engine/"$OS"
}

function clean_release() {

  echo "Cleaning release directory..."

  rm -rf dist/release/engine
  rm dist/release/editor/*.yaml
  mv dist/release/editor/$OS-unpacked/* dist/release/editor
  rmdir dist/release/editor/$OS-unpacked
  mv dist/release/editor dist/release/akos-editor
}

OS=$(detect_os)
rm -rf dist/release
ng build akos-common
build_electron "editor"
build_electron "engine"
move_engine_build
clean_release
