#!/usr/bin/env bash

source scripts/common.sh

rm -rf dist/build
build_electron "akos-engine"

if [ ! -d dist/build/akos-engine/mac ]; then
  DIR=$(ls -d dist/build/akos-engine/*-unpacked)
  mv "$DIR" "${DIR/-unpacked/}"
fi
