#!/usr/bin/env bash

# Detect OS
if [[ "$OSTYPE" == "linux-gnu" ]]; then
  OS=linux
elif [[ "$OSTYPE" == "darwin"* ]]; then
  OS=mac
else
  OS=win
fi

# Build engine
ng build engine --prod --base-href ./
tsc -p projects/engine/src/electron
electron-builder --dir -c projects/engine/electron-builder.yml

# Build editor
ng build editor --prod --base-href ./
tsc -p projects/editor/src/electron
electron-builder --dir -c projects/editor/electron-builder.yml

# Copy engine build into editor build
mkdir dist/release/editor/$OS-unpacked/engine
cp -R dist/release/engine/$OS-unpacked dist/release/editor/$OS-unpacked/engine
mv dist/release/editor/$OS-unpacked/engine/$OS-unpacked dist/release/editor/$OS-unpacked/engine/$OS
