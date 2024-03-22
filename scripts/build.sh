

node scripts/build.js
(
    cd plugins/app
    elm make Generate.elm --output=../../cli/generators/app.js
    elm make GenerateView.elm --output=../../cli/generators/app-view.js
)
(
    cd plugins/theme
    elm make Generate.elm --output=../../cli/generators/theme.js
)
# (
#     cd plugins/interactive
#     elm make Generate.elm --output=../../cli/generators/interactive.js
# )
(
    cd plugins/routes
    elm make --optimize Generate.elm --output=../../cli/generators/routes.js
)
(
    cd plugins/assets
    elm make --optimize Generate.elm --output=../../cli/generators/assets.js
)

# elm-optimize-level-2

# tsc
esbuild cli/run.ts --bundle --outfile=dist/elm-prefab.js --platform=node