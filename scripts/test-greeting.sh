#!/bin/bash


cd examples
rm -rf test
mkdir test
cd test


cat > elm.generate.json << 'EOF'
{
  "app": {
      "pages": {
          "Home": {
            "url": "/:id/*?{search}",
            "redirectFrom": ["/old-homepage-2/:id/*?{search}"]
           }
      }
  },
  "docs": {
    "src": "docs",
    "modules": []
  }
}
EOF

# Commands to see what they output
node ../../dist/elm-prefab.js

# elm make src/Main.elm --output=/dev/null

pnpm install
pnpm build
# pnpm dev
