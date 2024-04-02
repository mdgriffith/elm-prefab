import * as fs from "fs";
import * as Options from "./options";
import * as Args from "./args";
import * as Initialize from "./initialize";

import * as App from "./run/app";
import * as Theme from "./run/theme";
import * as Docs from "./run/docs";
import * as Routes from "./run/routes";
import * as Assets from "./run/assets";
import * as GraphQL from "./run/graphql";
import * as Output from "./output/summary";

type GenerateOptions = {
  src: string;
  js: string;
  plugins: Options.Generator[];
};

export const generate = async (
  options: GenerateOptions,
  initializing: boolean,
  pluginsInitializing: string[]
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
    runOptions.generateDefaultFiles =
      initializing || pluginsInitializing.includes(generator.name);

    results[generator.name] = await generator.run(runOptions);
  }
  return results;
};

const readConfig = async (
  filepath: string,
  plugins: string[]
): Promise<Options.Config | null> => {
  try {
    let config = JSON.parse(fs.readFileSync(filepath, "utf-8"));

    return config;
  } catch (e) {
    return null;
  }
};

const runGeneration = async (
  pluginsInitializing: string[],
  config: Options.Config,
  initializing: boolean
) => {
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
          console.log(`I don't recognize this plugin: ${pluginName}`);
      }
    }
  }
  const src = config.src || "./src";
  const js = config.js || "./src-js";

  const summary = await generate(
    { src, js, plugins: plugins },
    initializing,
    pluginsInitializing
  );

  Output.summary(summary);
  process.exit(0);
};

const runWithConfig = async (plugins: string[]) => {
  const config = await readConfig("./elm.generate.json", plugins);
  if (config == null) {
    const newConfig = await Initialize.config(plugins, config);
    if (newConfig == null) {
      process.exit(0);
    }
    await runGeneration(plugins, newConfig, true);
  } else {
    await runGeneration(plugins, config, false);
  }
};

const run = async (argString: string[]) => {
  const args = Args.read(argString);

  switch (args.kind) {
    case "run":
      runWithConfig(args.plugins);
      break;
    case "help":
      console.log(args.message);
      break;
    case "error":
      console.log(args.message);
      process.exit(1);
    case "version":
      console.log("Version");
      break;
  }
  process.exit(0);
};

run(process.argv);
