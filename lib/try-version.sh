#!/bin/sh
EMBER_TRY_SCENARIO=$1 node ./lib/setup-packagejson.js; npm i; ember try $1 $2 $3
