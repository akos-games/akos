#!/usr/bin/env bash

source scripts/common.sh

rm -rf dist/build
ng build akos-common
build_electron "akos-engine"
DIR=$(ls -d dist/build/akos-engine/*-unpacked)
mv "$DIR" "${DIR/-unpacked/}"
