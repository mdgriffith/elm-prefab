#!/bin/bash
set -a
source .env
set +a

cd playground && \
rm -rf test && \
mkdir test && \
cd test && \
node ../../dist/elm-prefab.js init && \
elm make src/app/Main.elm --output=/dev/null && \
# node ../../dist/elm-prefab.js add graphql && \
# node ../../dist/elm-prefab.js generate && \
# pnpm install && \
# pnpm build && \
# node ../../dist/elm-prefab.js add && \
node ../../dist/elm-prefab.js add docs && \
node ../../dist/elm-prefab.js add theme && \
pnpm build
