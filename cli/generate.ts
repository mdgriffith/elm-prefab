import * as path from "path";
import * as ElmPress from ".";

const colors = {
  neutral: {
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
  },
};

ElmPress.generate({
  output: "generated",
  generators: [
    ElmPress.app({
      markdown: path.join(__dirname, "../examples/elm-gql/guide"),
      elm: {
        dir: path.join(__dirname, "../examples/elm-gql/src/Page"),
        urls: [
          {
            page: "Home.elm",
            url: "/",
          },
          // {
          //   page: "Home.elm",
          //   url: "/old-homepage?{search,tag,**}",
          // },
        ],
      },
    }),
    ElmPress.ui({
      backgrounds: {
        neutral: colors.neutral,
      },
      spacing: {
        sm4: 2,
        sm3: 4,
        sm2: 8,
        sm: 12,
        md: 16,
        lg: 20,
        lg1: 24,
        lg2: 32,
        lg3: 40,
        lg4: 80,
      },
      typography: {
        h1: {
          face: "EB Garamond",
          fallback: ["serif"],
          size: 24,
          color: colors.neutral["900"],
        },
        h2: {
          face: "EB Garamond",
          fallback: ["serif"],
          size: 20,
          color: colors.neutral["900"],
        },
        base: {
          face: "Noto Sans",
          fallback: ["sans-serif"],
          size: 16,
          color: colors.neutral["900"],
        },
        small: {
          face: "Noto Sans",
          fallback: ["sans-serif"],
          size: 10,
          color: colors.neutral["900"],
        },
      },
      borders: {
        small: { rounded: 2, width: 1, color: colors.neutral["900"] },
      },
      shadows: [],
    }),
    // ElmPress.figma({ apiKey: "string" }),
    // ElmPress.notion({ apiKey: "string" }),
  ],
});
