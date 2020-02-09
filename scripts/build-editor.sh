#!/usr/bin/env bash

source scripts/common.sh

rm -rf dist/release
build_electron "akos-editor"
mkdir dist/release
mv dist/build/akos-editor/*.zip dist/release
