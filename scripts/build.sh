

node scripts/build.js
(
    cd plugins/app
    elm-optimize-level-2 Generate.elm --output=../../cli/generators/app.js
)
(
    cd plugins/theme
    elm-optimize-level-2 Generate.elm --output=../../cli/generators/theme.js
)
tsc