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
  assets: { Assets: { src: "./assets", onServer: "assets" } },
};

const readConfig = async (filepath: string): Promise<Options.Config | null> => {
  try {
    return JSON.parse(fs.readFileSync("./elm.generate.json", "utf-8"));
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
