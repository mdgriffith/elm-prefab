import * as readline from "readline";
import Chalk from "chalk";
import * as Options from "./options";
import * as fs from "fs";

const defaultConfig: Options.Config = {
  app: {},
  routes: {
    Home: "/",
    Login: "/login",
    Logout: "/logout",
  },
  assets: { Assets: { src: "./public", onServer: "assets" } },
  graphql: {
    schema: "$GRAPHQL_SCHEMA",
    header: "Authorization: bearer $GRAPHQL_API_ENDPOINT",
  },
  theme: {
    colors: {
      black: "#000000",
      white: "#ffffff",
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
        "950": "#0a0a0a",
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
    typography: {
      prose: {
        font: ["EB Garamond", "serif"],
        sizes: {
          h1: { size: 28 },
          h2: { size: 24 },
          h3: { size: 20 },
          huge: { size: 120 },
        },
      },
      interface: {
        font: ["Noto Sans", "sans-serif"],
        sizes: {
          default: { size: 16 },
          bold: { size: 16, weight: 700 },
          small: { size: 10 },
        },
      },
    },
    borders: {
      small: { rounded: 2, width: 1 },
    },
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
    if (plugin in defaultConfig) {
      if (plugin in config) {
        continue;
      }
      // @ts-ignore
      config[plugin] = defaultConfig[plugin];
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
      existing ? existing : {}
    );
    fs.writeFileSync("elm.generate.json", JSON.stringify(config, null, 2));
    console.log(
      `${Chalk.yellow("elm.generate.json")} file has been generated!`
    );
    return config;
  } else {
    console.log("File generation skipped.");
  }

  // Close the readline interface
  rl.close();
  return null;
};
