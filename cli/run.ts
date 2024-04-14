import * as fs from "fs";
import * as Options from "./options";
import * as Args from "./args";
import * as Initialize from "./initialize";

import * as App from "./run/app";
import * as Theme from "./run/theme";
import * as Docs from "./run/docs";
import * as Assets from "./run/assets";
import * as GraphQL from "./run/graphql";
import * as Output from "./output/summary";
import Chalk from "chalk";

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

const runGeneration = async (
  pluginsInitializing: string[],
  config: Options.Config,
  initializing: boolean
) => {
  const plugins: Options.Generator[] = [];
  const src = config.src;
  const js = config.js;

  if (config.theme != null) {
    plugins.push(Theme.generator(config.theme));
  }
  if (config.app != null) {
    plugins.push(App.generator(config.app));
  }
  if (config.assets != null) {
    plugins.push(Assets.generator(config.assets));
  }
  if (config.graphql != null) {
    plugins.push(GraphQL.generator(config.graphql));
  }
  if (config.docs != null) {
    plugins.push(Docs.generator(config));
  }

  const summary = await generate(
    { src, js, plugins: plugins },
    initializing,
    pluginsInitializing
  );

  Output.summary(summary);
  process.exit(0);
};

const runWithConfig = async (plugins: string[]) => {
  const config = await Args.readConfig("./elm.generate.json", plugins);

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
      await runWithConfig(args.plugins);
      break;
    case "help":
      console.log(args.message);
      break;
    case "error":
      console.log(args.message);
      process.exit(1);
    case "version":
      console.log("0.1.6");
      break;
  }
  process.exit(0);
};

run(process.argv);
