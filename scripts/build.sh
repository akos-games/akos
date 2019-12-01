#!/usr/bin/env bash

# Detect OS
if [[ "$OSTYPE" == "linux-gnu" ]]; then
  OS=linux
elif [[ "$OSTYPE" == "darwin"* ]]; then
  OS=mac
else
  OS=win
fi

# Build akos-common
ng build akos-common

# Build engine
ng build engine --prod --base-href ./
tsc -p projects/engine/src/electron
electron-builder --dir -c projects/engine/electron-builder.yml

# Build editor
ng build editor --prod --base-href ./
tsc -p projects/editor/src/electron
electron-builder --dir -c projects/editor/electron-builder.yml

# Copy engine build into editor build
rm -rf dist/release/editor/$OS-unpacked/engine/$OS*
mkdir -p dist/release/editor/$OS-unpacked/engine/$OS
cp -R dist/release/engine/$OS-unpacked/* dist/release/editor/$OS-unpacked/engine/$OS

#mv dist/release/editor/$OS-unpacked/engine/$OS-unpacked dist/release/editor/$OS-unpacked/engine/$OS
