import * as readline from "readline";
import Chalk from "chalk";
import * as Options from "./options";
import * as fs from "fs";

const minimalConfig: Options.Config = {};

const testTheme: Options.ThemeOptions = {
  colors: {
    white: "#ffffff",
    greyscale: {
      "900": "#121214",
      "800": "#27272F",
      "700": "#53535F",
      "600": "#72727E",
      "500": "#B1B1B8",
      "400": "#CECED6",
      "300": "#E5E5EA",
      "200": "#F3F4F6",
      "100": "#FAFAFC",
    },
    primary: {
      "700": "#3B2D96",
      "600": "#4530CC",
      "500": "#6049F5",
      "400": "#BBB1FC",
      "300": "#E6E3FC",
      "200": "#F8F5FF",
    },
    red: {
      "700": "#990A00",
      "600": "#CC0E00",
      "500": "#E22C1E",
      "400": "#FFB8B3",
      "300": "#FFE9E8",
      "200": "#FEF4F3",
    },
    yellow: {
      text: "#8A6500",
      "700": "#DBA100",
      "600": "#FEBA00",
      "500": "#FFC700",
      "400": "#FFECA7",
      "300": "#FEF7DE",
      "200": "#FFFCF0",
    },
    green: {
      active: "#104F23",
      "600": "#197835",
      "500": "#1C883C",
      "400": "#C0F1CD",
      "300": "#D9FFE3",
      "200": "#F5FDF7",
    },
    blue: {
      "700": "#044879",
      "600": "#0075C8",
      "500": "#0095FF",
      "400": "#8ACEFF",
      "300": "#DBF1FF",
      "200": "#F0F9FF",
    },
    gradients: {
      askAI: "linear-gradient(99.32deg, #BBB1FC 3.63%, #8ACEFF 96.46%)",
      chatBubble: "linear-gradient(90deg, #F8F5FF -14.72%, #F0F9FF 110.73%)",
      chartFill:
        "linear-gradient(180deg, rgba(230, 227, 252, 0.8) 0%, rgba(230, 227, 252, 0) 100%)",
      chartPurpleHover: "linear-gradient(180deg, #6049F5 100%, #CA92E4 0%)",
      chartPurpleStroke: "linear-gradient(180deg, #6049F5 0%, #CA92E4 100%)",
      chartBlueFill:
        "linear-gradient(180deg, rgba(230, 227, 252, 0.8) 0%, rgba(230, 227, 252, 0) 100%)",
      chartBlueHover: "linear-gradient(180deg, #B3D7F8 0%, #0095FF 100%)",
      chartBlueStroke: "linear-gradient(180deg, #0095FF 0%, #B3D7F8 100%)",
      iconHighlighted:
        "linear-gradient(136.22deg, #998AF8 14.58%, #6049F5 86.92%)",
    },
  },
  spacing: {
    zero: 0,
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
  typography: [
    {
      font: ["Lato", "Roboto", "sans-serif"],
      sizes: {
        h1: { size: 24, weight: 900 },
        h2: { size: 18, weight: 900 },
        h3: { size: 16, weight: 700 },
        h4: { size: 12, weight: 700, variant: ["small-caps"] },
        large: { size: 20, weights: [400, 700] },
        medium: { size: 16, weights: [400, 700] },
        default: { size: 14, weights: [400, 700] },
        small: { size: 12, weights: [400, 700] },
        xSmall: { size: 10, weights: [400, 700], variant: ["small-caps"] },
      },
    },
  ],
  borders: {
    radius: { small: 4, medium: 8, large: 16 },
    width: { small: 1 },
  },
};

const defaultTheme: Options.ThemeOptions = {
  colors: {
    black: "#000000",
    white: "#ffffff",
    grey: {
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
      "950": "#0a0a0a",
    },
    purple: {
      alias: "primary",
      50: "#faf5ff",
      100: "#f3e8ff",
      200: "#e9d5ff",
      300: "#d8b4fe",
      400: "#c084fc",
      500: "#a855f7",
      600: "#9333ea",
      700: "#7e22ce",
      800: "#6b21a8",
      900: "#581c87",
      950: "#3b0764",
    },
  },
  themes: {
    default: {
      text: "800",
      background: "50",
      border: "400",
    },
  },
  borders: {
    radius: { small: 4, medium: 8, large: 16 },
    width: { small: 1 },
  },
  spacing: {
    zero: 0,
    xxSmall: 2,
    xSmall: 4,
    small: 8,
    medium: 16,
    large: 32,
    xLarge: 64,
  },
  typography: [
    {
      font: ["EB Garamond", "serif"],
      sizes: {
        h1: { size: 28 },
        h2: { size: 24 },
        h3: { size: 20 },
        huge: { size: 120 },
      },
    },
    {
      font: ["Noto Sans", "sans-serif"],
      sizes: {
        text: { size: 16, weights: [400, 700] },
        small: { size: 10 },
      },
    },
  ],
};

// This isn't quite an `Options.Config` because some fields like urls aren't expanded
export const defaultOptions: Options.Config = {
  src: "src/app",
  js: "src",
  app: {
    pages: {
      Home: Options.toUrl("/"),
    },
  },
  assets: { Assets: { src: "./public", onServer: "assets" } },
  graphql: {
    schema: "$GRAPHQL_SCHEMA",
    header: ["Authorization: bearer $GRAPHQL_API_TOKEN"],
  },
  theme: defaultTheme,
};

const defaultPlugins = ["app"];

const composeDefaultConfig = (
  pluginsRequested: string[],
  config: Options.Config,
): Options.Config => {
  const plugins =
    pluginsRequested.length > 0 ? pluginsRequested : defaultPlugins;

  for (const plugin of plugins) {
    if (plugin in defaultOptions) {
      if (plugin in config) {
        continue;
      }
      // @ts-ignore
      config[plugin] = defaultOptions[plugin];
    }
  }
  return config;
};

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = async (q: string): Promise<string> => {
  return await new Promise((resolve) => {
    rl.question(q, resolve);
  });
};

export const writeConfig = (config: Options.Config) => {
  // Slow, but we know for sure we have a deep clone and no lingering references
  const clone: any = JSON.parse(JSON.stringify(config));

  if (clone.app) {
    Object.keys(clone.app.pages).forEach(function (pageName) {
      const page = clone.app.pages[pageName];

      let redirectFrom =
        //@ts-ignore
        page.redirectFrom.length == 0 ? undefined : page.redirectFrom;

      if (!page.urlOnly && page.redirectFrom.length === 0) {
        clone.app.pages[pageName] = page.url;
      } else if (page.urlOnly) {
        clone.app.pages[pageName] = {
          urlOnly: page.url,
          redirectFrom: redirectFrom,
        };
      } else {
        clone.app.pages[pageName] = {
          url: page.url,
          redirectFrom: redirectFrom,
        };
      }
    });
  }

  fs.writeFileSync("elm.generate.json", JSON.stringify(clone, null, 2));
};

export const config = async (
  plugins: string[],
  existing: Options.Config | null,
): Promise<Options.Config | null> => {
  const answer = await question(
    `It looks like you're starting a new ${Chalk.yellow("Elm Prefab")} project!

Want me to generate everything you need to get started? (Y/n)`,
  );

  // If the user answers 'Y' or 'y', generate the file
  if (answer.toLowerCase() === "y" || answer.trim() === "") {
    const config = composeDefaultConfig(
      plugins,
      existing ? existing : minimalConfig,
    );

    writeConfig(config);

    if ("graphql" in plugins && existing != null && !("graphql" in existing)) {
      console.log(
        `I've added some default graphQL settings to ${Chalk.yellow(
          "elm.generate.json",
        )} which use the following environment variables:

- ${Chalk.yellow(
          "$GRAPHQL_SCHEMA",
        )} - The HTTP endpoint for the GraphQL schema, or the path to a local schema file in JSON format.
- ${Chalk.yellow(
          "$GRAPHQL_API_TOKEN",
        )} - The API token needed for querying for the schema.

Add those to your environment and run ${Chalk.yellow("elm-prefab")} again!
`,
      );
      process.exit(0);
    } else if (existing == null) {
      console.log(
        `${Chalk.yellow("elm.generate.json")} file has been generated!`,
      );
    } else {
      const pluginsAdded = plugins
        .filter((plugin) => !(plugin in existing))
        .map((plugin) => Chalk.green(plugin));

      console.log(
        `I've added the following plugins to your ${Chalk.yellow(
          "elm.generate.json",
        )} file!\n\n${pluginsAdded.join("\n    ")}`,
      );
    }

    return config;
  } else {
    console.log("File generation skipped.");
  }

  // Close the readline interface
  rl.close();
  return null;
};
