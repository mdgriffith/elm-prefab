import * as Options from "./options";
import * as Initialize from "./initialize";
import * as Project from "./project";
import * as App from "./run/app";
import * as Theme from "./run/theme";
import * as Docs from "./run/docs";
import * as Assets from "./run/assets";
import * as GraphQL from "./run/graphql";
import * as Output from "./output/summary";
import * as path from "path";
import * as Command from "./commands";
import * as Customize from "./customize";
import * as Copy from "./copy";
import * as OneOffEffect from "./templates/app/oneOff/Effect.elm";
import * as OneOffResource from "./templates/app/oneOff/Resource.elm";
import * as OneOffListener from "./templates/app/oneOff/Listener.elm";
import * as fs from "fs";
import Chalk from "chalk";

type GenerateOptions = {
  root: string;
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

  let status: Project.Status = Project.detect(
    path.join(options.root, options.src)
  );
  const runOptions: Options.RunOptions = {
    initializing,
    generateDefaultFiles: true,
    activePlugins: options.plugins.map((p) => p.name),
    project: status,
    internalSrc: path.join(options.root, ".elm-prefab"),
    js: path.join(options.root, options.js),
    src: path.join(options.root, options.src),
    root: options.root,
  };

  for (const generator of options.plugins) {
    // Copy static files
    Copy.copyPlugin(generator.name, runOptions);

    // Run generator
    runOptions.generateDefaultFiles =
      initializing || pluginsInitializing.includes(generator.name);
    results[generator.name] = await generator.run(runOptions);

    // Recalculate status after generation
    if (generator.generatorType == Options.GeneratorType.DataRetrieval) {
      // Recalculate status after data retrieval
      status = Project.detect(path.join(options.root, options.src));
      runOptions.project = status;
    }
  }
  return results;
};

const runGeneration = async (options: {
  root: string;
  pluginsInitializing: string[];
  config: Options.Config;
  initializing: boolean;
}) => {
  let config = options.config;
  const plugins: Options.Generator[] = [];
  const src = config.src;
  const js = config.js;
  const root = options.root;

  if (config.theme != null) {
    plugins.push(Theme.generator(config.theme));
  }
  if (config.app != null) {
    plugins.push(App.generator(config.app));
  }

  // Always generate assets
  plugins.push(Assets.generator(config.assets));

  if (config.graphql != null) {
    plugins.push(GraphQL.generator(config.graphql));
  }
  if (config.docs != null) {
    plugins.push(Docs.generator(config));
  }

  const summary = await generate(
    { root, src, js, plugins },
    options.initializing,
    options.pluginsInitializing
  );
  if (options.initializing) {
    Output.initialization(options.config, summary);
  } else {
    Output.allSet(options.config);
  }

  process.exit(0);
};

const needConfigMessage = (cwd: string) => {
  return `I wasn't able to find an ${Chalk.cyan(
    "Elm Prefab"
  )} project in this directory.

I'm looking in:
${Chalk.yellow(cwd)}

Run ${Chalk.cyan("elm-prefab")} to start a new project!
`;
};

const run = async (args: string[]) => {
  const command = await Command.read(args);

  const config = await Options.readConfig("./elm.generate.json");
  const plugins = ["app", "assets"];
  if (config == null) {
    if (command.kind === "init") {
      const newConfig = await Initialize.start();
      await runGeneration({
        root: ".",
        pluginsInitializing: plugins,
        config: newConfig,
        initializing: true,
      });
    } else {
      console.log(needConfigMessage(path.resolve(".")));
      process.exit(1);
    }
  } else {
    switch (command.kind) {
      case "init":
        console.log("There's already an Elm Prefab project here.");
        process.exit(1);
      case "generate":
        await runGeneration({
          root: ".",
          pluginsInitializing: plugins,
          config,
          initializing: false,
        });
      case "add":
        // @ts-ignore
        const name = command.name;

        // @ts-ignore
        switch (command.added) {
          case "resource":
            const resourceContent = OneOffResource.toBody(
              new Map([["{{name}}", name]])
            );
            fs.writeFileSync(
              path.join(config.src, `${name}.elm`),
              resourceContent,
              "utf8"
            );
            process.exit(0);
          case "effect":
            const pageContent = OneOffEffect.toBody(
              new Map([["{{name}}", name]])
            );
            fs.writeFileSync(
              path.join(config.src, `${name}.elm`),
              pageContent,
              "utf8"
            );

            process.exit(0);
          case "listener":
            const listenerContent = OneOffListener.toBody(
              new Map([
                ["{{name}}", name],
                [
                  "{{name_decapitalized}}",
                  name[0].toLowerCase() + name.slice(1),
                ],
              ])
            );
            fs.writeFileSync(
              path.join(config.src, `${name}.elm`),
              listenerContent,
              "utf8"
            );
            process.exit(0);
          case "graphql":
            // handled by add-graphql
            process.exit(0);
          case "page":
            // handled by add-page
            process.exit(0);

          case "docs":
            // handled by add-docs
            process.exit(0);

          case "theme":
            const newConfig = await Initialize.theme(config);
            console.log("New Config", newConfig);
            await runGeneration({
              root: ".",
              pluginsInitializing: [...plugins, "theme"],
              config: newConfig,
              initializing: false,
            });
            process.exit(0);

          // ... other cases ...
        }
        break;

      case "add-page":
        // Create Placeholder Page
        await Initialize.page(command.name, command.url, config);
        process.exit(0);

      case "add-docs":
        // Create a docs site
        const docsConfig = await Initialize.docs(command.dir, config);
        await runGeneration({
          root: command.dir,
          pluginsInitializing: plugins,
          config: docsConfig,
          initializing: true,
        });
        process.exit(0);

      case "add-graphql":
        await Initialize.graphql(command.nameSpace, config);
        process.exit(0);

      case "customize":
        // Copy the file to the root
        // delete the file from the 'hidden' dir if present.
        Customize.customize(
          {
            src: config.src,
            internalSrc: "./.elm-prefab",
          },
          command.customizable
        );

        process.exit(0);
    }
  }
};

run(process.argv);
