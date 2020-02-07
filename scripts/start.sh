#!/usr/bin/env bash

project=$1
port=$2
port_debug=$3

ng build akos-common
npm-run-all -p -r "ng serve $project -- --port $port" "serve $project $port $port_debug"
