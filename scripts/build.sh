

node scripts/build.js
(
    cd plugins/app
    elm-optimize-level-2 Generate.elm --output=../../cli/generators/app.js
)
(
    cd plugins/theme
    elm-optimize-level-2 Generate.elm --output=../../cli/generators/theme.js
)
# (
#     cd plugins/interactive
#     elm-optimize-level-2 Generate.elm --output=../../cli/generators/interactive.js
# )
# tsc
esbuild cli/run.ts --bundle --outfile=dist/cli.js --platform=node