# What goes in our themeing system?

**Note:** Not ready for full use yet as this depends on Elm UI 2, which has not been released!

When a `theme` is provided in `elm.generate.json`, then `elm-prefab` will generate a `Ui.Theme.elm` file and a `Ui.Theme.Color` file.

The vast majority of the time `Ui.Theme` will have what you need to do your styling.

---

The first thing we need to do is collect values that _work nicely together_.

This generally means gathering:

- Spacing
- Typography
- Color

## Spacing

Our first primitive is `spacing`. These are the values that will be used both `padding` and `spacing` (also known as `gap`).

```json
"spacing": {
    "xxSmall": 2,
    "xSmall": 4,
    "small": 8,
    "medium": 16,
    "large": 32,
    "xLarge": 64
},
```

This will add values to `Ui.Theme` so that you can use `Ui.Theme.padding.small` or `Ui.Theme.spacing.small` as attributes.

That was a bit of an easy one, let's move on to typography!

## Typography

Here's an example of specifying typography:

```json
"typography": [
    { "font": ["EB Garamond", "serif"],
      "sizes": {
        "h1": { "size": 28 },
        "h2": { "size": 24 },
        "h3": { "size": 20 }
      }
    },
    { "font": ["Noto Sans", "sans-serif"],
      "sizes": {
        "default": { "size": 16, "weights": [400, 700] },
        "small": { "size": 10 }
      }
    }
]
```

Given the above, we'd get the following attirbutes in `Ui.Theme.elm`

- `Ui.Theme.font.h1`
- `Ui.Theme.font.h2`
- `Ui.Theme.font.h3`
- `Ui.Theme.font.default`
- `Ui.Theme.font.bold`
- `Ui.Theme.font.small`

One thing to notice is that each variant has _everything_ baked in, meaning we know the `size`, `font family`, `weight` and everything else for each one.

The desired weight for a font is _intrinsically linked_ with the typeface's size and font family.

**Data note** Isn't this going to get laborious to maintain?

## Specifying primitives

The basis of any theme tool is a set of primitives around:

- Color
- Spacing
- Typography

```json
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
      }
    ],
  }
```

## Color swatches and names

```json
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
      },
    },
 }
```
