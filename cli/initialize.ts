import * as readline from "readline";
import Chalk from "chalk";
import * as Options from "./options";
import * as fs from "fs";

const minimalConfig: Options.Config = {
  src: "src",
  js: "src-js",
};

// This isn't quite an `Options.Config` because some fields like urls aren't expanded
const defaultOptions: Options.Config = {
  src: "src",
  js: "src-js",
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
  theme: {
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
      primary: {
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
    palettes: {
      default: { background: "white", text: "grey900" },
      card: {
        background: "white",
        text: "grey900",
        border: "grey200",
        hover: {
          border: "grey300",
          background: "grey50",
        },
      },
    },
    borders: {
      small: { rounded: 2, width: 1 },
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
          text: { size: 16 },
          bold: { size: 16, weight: 700 },
          small: { size: 10 },
        },
      },
    ],
  },
};

const defaultPlugins = ["app", "routes"];

const composeDefaultConfig = (
  pluginsRequested: string[],
  config: Options.Config
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
  existing: Options.Config | null
): Promise<Options.Config | null> => {
  const answer = await question(
    `No ${Chalk.yellow(
      "elm.generate.json"
    )} file found. Do you want to generate it? (Y/n) `
  );

  // If the user answers 'Y' or 'y', generate the file
  if (answer.toLowerCase() === "y" || answer.trim() === "") {
    const config = await composeDefaultConfig(
      plugins,
      existing ? existing : minimalConfig
    );

    writeConfig(config);

    if ("graphql" in plugins && existing != null && !("graphql" in existing)) {
      console.log(
        `I've added some default graphQL settings to ${Chalk.yellow(
          "elm.generate.json"
        )} which use the following environment variables:

- ${Chalk.yellow(
          "$GRAPHQL_SCHEMA"
        )} - The HTTP endpoint for the GraphQL schema, or the path to a local schema file in JSON format.
- ${Chalk.yellow(
          "$GRAPHQL_API_TOKEN"
        )} - The API token needed for querying for the schema.

Add those to your environment and run ${Chalk.yellow("elm-prefab")} again!
`
      );
      process.exit(0);
    } else if (existing == null) {
      console.log(
        `${Chalk.yellow("elm.generate.json")} file has been generated!`
      );
    } else {
      const pluginsAdded = plugins
        .filter((plugin) => !(plugin in existing))
        .map((plugin) => Chalk.green(plugin));

      console.log(
        `I've added the following plugins to your ${Chalk.yellow(
          "elm.generate.json"
        )} file!\n\n${pluginsAdded.join("\n    ")}`
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
