#!/bin/bash


cd examples/internal-testing

rm -rf docs/.elm-prefab

node ../../dist/elm-prefab.js

cd docs
elm make src/Main.elm --output=/dev/null

pnpm install
pnpm build
pnpm dev