#!/bin/bash


cd examples
rm -rf test
mkdir test
cd test

node ../../dist/elm-prefab.js

elm make src/app/Main.elm --output=/dev/null

pnpm install
# pnpm build
pnpm dev