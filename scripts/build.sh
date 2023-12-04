

node scripts/build.js
(
    cd plugins/app
    elm-optimize-level-2 Generate.elm --output=../../cli/generators/app.js
)
(
    cd plugins/theme
    elm-optimize-level-2 Generate.elm --output=../../cli/generators/theme.js
)
(
    cd plugins/interactive
    elm-optimize-level-2 Generate.elm --output=../../cli/generators/interactive.js
)
(
    cd plugins/routes
    elm make --optimize Generate.elm --output=../../cli/generators/routes.js
)
# tsc
esbuild cli/run.ts --bundle --outfile=dist/elm-press.js --platform=node