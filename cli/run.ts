import * as fs from "fs";
import { Command } from "commander";
import * as Options from "./options";
import { createInterface } from "readline";
import Chalk from "chalk";

import * as App from "./run_app";
import * as Theme from "./run_theme";
import * as Interactive from "./run_interactive";
import * as Routes from "./run_routes";
import * as Assets from "./run_assets";
import * as GraphQL from "./run_graphql";
import * as Output from "./output/summary";

// Create readline interface
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

type GenerateOptions = {
  src: string;
  js: string;
  plugins: Options.Generator[];
};

export const generate = async (
  options: GenerateOptions,
  initializing: boolean
): Promise<Options.SummaryMap> => {
  options.plugins.sort((a, b) => a.generatorType - b.generatorType);
  const results: Options.SummaryMap = {};
  const runOptions: Options.RunOptions = {
    initializing,
    generateDefaultFiles: true,
    internalSrc: "./.elm-prefab",
    js: options.js,
    src: options.src,
    root: ".",
  };
  for (const generator of options.plugins) {
    results[generator.name] = await generator.run(runOptions);
  }
  return results;
};

// CLI Program

const program = new Command();

const defaultConfig: Options.Config = {
  app: {},
  routes: {
    Home: "/",
    Login: "/login",
    Logout: "/logout",
  },
  assets: { Assets: { src: "./public", onServer: "assets" } },
  // theme: {
  //   colors: {
  //     black: "#000000",
  //     white: "#ffffff",
  //     neutral: {
  //       "50": "#fafafa",
  //       "100": "#f5f5f5",
  //       "200": "#e5e5e5",
  //       "300": "#d4d4d4",
  //       "400": "#a3a3a3",
  //       "500": "#737373",
  //       "600": "#525252",
  //       "700": "#404040",
  //       "800": "#262626",
  //       "900": "#171717",
  //       "950": "#0a0a0a",
  //     },
  //   },
  //   spacing: {
  //     zero: 0,
  //     sm4: 2,
  //     sm3: 4,
  //     sm2: 8,
  //     sm: 12,
  //     md: 16,
  //     lg: 20,
  //     lg1: 24,
  //     lg2: 32,
  //     lg3: 40,
  //     lg4: 80,
  //   },
  //   typography: {
  //     prose: {
  //       font: ["EB Garamond", "serif"],
  //       sizes: {
  //         h1: { size: 28 },
  //         h2: { size: 24 },
  //         h3: { size: 20 },
  //         huge: { size: 120 },
  //       },
  //     },
  //     interface: {
  //       font: ["Noto Sans", "sans-serif"],
  //       sizes: {
  //         default: { size: 16 },
  //         bold: { size: 16, weight: 700 },
  //         small: { size: 10 },
  //       },
  //     },
  //   },
  //   borders: {
  //     small: { rounded: 2, width: 1 },
  //   },
  // },
};

const readConfig = async (filepath: string): Promise<Options.Config | null> => {
  try {
    return JSON.parse(fs.readFileSync(filepath, "utf-8"));
  } catch (e) {
    return null;
  }
};

const runGeneration = async (config: Options.Config, initializing: boolean) => {
  const plugins: Options.Generator[] = [];
  for (const pluginName in config) {
    if (config.hasOwnProperty(pluginName)) {
      switch (pluginName) {
        case "src":
          break;
        case "routes":
          plugins.push(Routes.generator(config.routes));
          break;
        case "theme":
          plugins.push(Theme.generator(config.theme));
          break;
        case "app":
          if (config.app == null) {
            break;
          }
          plugins.push(App.generator(config.app));
          break;
        case "assets":
          plugins.push(Assets.generator(config.assets));
          break;
        case "graphql":
          plugins.push(GraphQL.generator(config.graphql));
          break;
        // case "interactive":
        // plugins.push(Interactive.generator(config.interactive));
        //break;
        default:
          console.log(`It's neither a theme nor an app. ${pluginName}`);
      }
    }
  }
  const src = config.src || "./src";
  const js = config.js || "./src-js";

  const summary = await generate({ src, js, plugins: plugins }, initializing);

  Output.summary(summary);
  process.exit(0);
};

program
  .name("elm-prefab")
  .description("Generate Elm scaffolding")
  .version("0.1.0")
  .action(async () => {
    const config = await readConfig("./elm.generate.json");
    if (config == null) {
      rl.question(
        `No ${Chalk.yellow(
          "elm.generate.json"
        )} file found. Do you want to generate it? (Y/n) `,
        (answer) => {
          // If the user answers 'Y' or 'y', generate the file
          if (answer.toLowerCase() === "y" || answer.trim() === "") {
            fs.writeFileSync(
              "elm.generate.json",
              JSON.stringify(defaultConfig, null, 2)
            );
            console.log(
              `${Chalk.yellow("elm.generate.json")} file has been generated!`
            );

            runGeneration(defaultConfig, true);
          } else {
            console.log("File generation skipped.");
          }

          // Close the readline interface
          rl.close();
        }
      );

      return;
    } else {
      runGeneration(config, false);
    }
  });

program.parse();
