#!/bin/bash


cd examples/test

rm -rf docs/.elm-prefab

node ../../dist/elm-prefab.js

pnpm install
pnpm build
pnpm dev

# cd docs
# elm make src/Main.elm --output=/dev/null

# pnpm install
# pnpm build
# pnpm dev
