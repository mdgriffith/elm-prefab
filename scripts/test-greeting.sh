#!/bin/bash


cd examples
rm -rf test
mkdir test
cd test


cat > elm.generate.json << 'EOF'
{
  "app": {
      "pages": {},
      "Home": {
        "url": "/:id/*?{search}",
        "redirectFrom": ["/old-homepage-2/:id/*?{search}"]
      }
  },
  "assets": {
    "Posts": { "src": "./guide", "onServer": "/posts" }
  },
  "docs": {
    "src": "docs",
    "modules": []
  },
  "theme": {
    "colors": {
      "black": "#000000",
      "white": "#ffffff",
      "neutral": {
        "50": "#fafafa",
        "100": "#f5f5f5",
        "200": "#e5e5e5",
        "300": "#d4d4d4",
        "400": "#a3a3a3",
        "500": "#737373",
        "600": "#525252",
        "700": "#404040",
        "800": "#262626",
        "900": "#171717",
        "950": "#0a0a0a"
      }
    },
    "palettes": {},
    "spacing": {
      "zero": 0,
      "sm4": 2,
      "sm3": 4,
      "sm2": 8,
      "sm": 12,
      "md": 16,
      "lg": 20,
      "lg1": 24,
      "lg2": 32,
      "lg3": 40,
      "lg4": 80
    },
    "typography": [
      {
        "font": ["EB Garamond", "serif"],
        "sizes": {
          "h1": { "size": 28 },
          "h2": { "size": 24 },
          "h3": { "size": 20 },
          "huge": { "size": 120 }
        }
      },
      {
        "font": ["Noto Sans", "sans-serif"],
        "sizes": {
          "default": { "size": 16 },
          "bold": { "size": 16, "weight": 700 },
          "small": { "size": 10 }
        }
      }
    ],
    "borders": {
      "small": { "rounded": 2, "width": 1 }
    }
  }
}
EOF

# Commands to see what they output
# node ../../dist/elm-prefab.js --help
node ../../dist/elm-prefab.js

# elm make src/Main.elm --output=/dev/null

# pnpm install
# pnpm build
# pnpm dev