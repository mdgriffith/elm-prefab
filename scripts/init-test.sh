#!/bin/bash
set -a
source .env
set +a

cd examples && \
rm -rf test && \
mkdir test && \
cd test && \
node ../../dist/elm-prefab.js init && \
elm make src/app/Main.elm --output=/dev/null && \
node ../../dist/elm-prefab.js add graphql && \
node ../../dist/elm-prefab.js generate && \
pnpm install && \
pnpm build
