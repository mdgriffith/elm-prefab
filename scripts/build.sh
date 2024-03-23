

node scripts/build.js

(
    cd plugins
    elm-optimize-level-2 Run.elm --output=../cli/generators/all.js
)


# tsc
esbuild cli/run.ts --bundle --outfile=dist/elm-prefab.js --platform=node