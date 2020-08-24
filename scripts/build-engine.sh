#!/usr/bin/env bash

source scripts/common.sh

rm -rf dist/build
build_electron "akos-engine"
DIR=$(ls -d dist/build/akos-engine/*-unpacked)
mv "$DIR" "${DIR/-unpacked/}"
