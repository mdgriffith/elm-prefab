

node scripts/build.js

(
    cd plugins
    elm-optimize-level-2 main/Run.elm --output=../cli/generators/all.js
    # elm make main/Run.elm --output=../cli/generators/all.js
)


# tsc
# esbuild cli/run.ts --bundle --outfile=dist/elm-prefab.js --platform=node --bundle --minify --pure:A2 --pure:A3 --pure:A4 --pure:A5 --pure:A6 --pure:A7 --pure:A8 --pure:A9 --pure:F2 --pure:F3 --pure:F3 --pure:F4 --pure:F5 --pure:F6 --pure:F7 --pure:F8 --pure:F9 
esbuild cli/run.ts --bundle --outfile=dist/elm-prefab.js --platform=node