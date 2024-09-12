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
import * as OneOffPage from "./templates/app/oneOff/Page.elm";
import * as OneOffEffect from "./templates/app/oneOff/Effect.elm";
import * as OneOffResource from "./templates/app/oneOff/Resource.elm";
import * as OneOffListener from "./templates/app/oneOff/Listener.elm";
import * as fs from "fs";
import Chalk from "chalk";

type GenerateOptions = {
  src: string;
  js: string;
  plugins: Options.Generator[];
};

export const generate = async (
  options: GenerateOptions,
  initializing: boolean,
  pluginsInitializing: string[],
  status: Project.Status,
): Promise<Options.SummaryMap> => {
  options.plugins.sort((a, b) => a.generatorType - b.generatorType);
  const results: Options.SummaryMap = {};
  const runOptions: Options.RunOptions = {
    initializing,
    generateDefaultFiles: true,
    activePlugins: options.plugins.map((p) => p.name),
    project: status,
    internalSrc: "./.elm-prefab",
    js: options.js,
    src: options.src,
    root: ".",
  };

  // Copy static files
  const summary = Copy.copy(runOptions);

  for (const generator of options.plugins) {
    runOptions.generateDefaultFiles =
      initializing || pluginsInitializing.includes(generator.name);
    results[generator.name] = await generator.run(runOptions);
  }
  return results;
};

const runGeneration = async (options: {
  pluginsInitializing: string[];
  config: Options.Config;
  initializing: boolean;
}) => {
  let config = options.config;
  const plugins: Options.Generator[] = [];
  const src = config.src ? config.src : "src/app";
  const js = config.js ? config.js : "src";

  const status: Project.Status = Project.detect(path.join(".", src));

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
    { src, js, plugins: plugins },
    options.initializing,
    options.pluginsInitializing,
    status,
  );
  if (options.initializing) {
    Output.initialization(summary);
  } else {
    Output.summary(summary);
  }

  process.exit(0);
};

const needConfigMessage = (cwd: string) => {
  return `I wasn't able to find an ${Chalk.cyan("Elm Prefab")} project in this directory.

I'm looking in:
${Chalk.yellow(cwd)}

Run ${Chalk.cyan("elm-prefab")} to start a new project!
`;
};

const pageAdded = (pagename: string) => {
  return `Added ${Chalk.yellow(pagename)}!`;
};

const graphqlAdded = `
I've added GraphQL to ${Chalk.yellow("elm.generate.json")}, but it needs
the following environment variables:

  ${Chalk.yellow("$GRAPHQL_SCHEMA")}    ${Chalk.grey("-")} The HTTP endpoint for the GraphQL schema,
                       or the path to a local schema file in JSON format.

  ${Chalk.yellow(
    "$GRAPHQL_API_TOKEN",
  )} ${Chalk.grey("-")} The API token needed for querying for the schema.

Add those to your environment and run ${Chalk.yellow("elm-prefab")} again!
`;

const run = async (args: string[]) => {
  const command = await Command.read(args);

  const config = await Options.readConfig("./elm.generate.json");
  const plugins = ["app", "assets"];
  if (config == null) {
    if (command.kind === "init") {
      const newConfig = await Initialize.start();
      await runGeneration({
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
          pluginsInitializing: plugins,
          config,
          initializing: true,
        });
      case "add":
        // @ts-ignore
        const name = command.name;

        // @ts-ignore
        switch (command.added) {
          case "resource":
            const resourceContent = OneOffResource.toBody(
              new Map([["{{name}}", name]]),
            );
            fs.writeFileSync(
              path.join(config.src ? config.src : "src/app", `${name}.elm`),
              resourceContent,
              "utf8",
            );
            process.exit(0);
          case "effect":
            const pageContent = OneOffEffect.toBody(
              new Map([["{{name}}", name]]),
            );
            fs.writeFileSync(
              path.join(config.src ? config.src : "src/app", `${name}.elm`),
              pageContent,
              "utf8",
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
              ]),
            );
            fs.writeFileSync(
              path.join(config.src ? config.src : "src/app", `${name}.elm`),
              listenerContent,
              "utf8",
            );
            process.exit(0);
          case "graphql":
            // handled by add-graphql
            process.exit(0);
          case "page":
            // handled by add-page
            process.exit(0);
        }

        break;
      case "add-page":
        // Create Placeholder Page
        const pageContent = OneOffPage.toBody(
          new Map([["{{name}}", command.name]]),
        );
        fs.writeFileSync(
          path.join(config.src ? config.src : "src/app", `${command.name}.elm`),
          pageContent,
          "utf8",
        );

        if (!config.app) {
          let pages: any = {};
          pages[command.name] = { url: command.url };
          config.app = { pages };
        } else {
          // @ts-ignore
          config.app.pages[command.name] = Options.toUrl(command.url);
        }
        Options.writeConfig(config);
        await runGeneration({
          pluginsInitializing: plugins,
          config,
          initializing: false,
        });
        console.log(pageAdded(command.name));
        process.exit(0);
      case "add-graphql":
        config.graphql = Initialize.defaultGraphQL;
        Options.writeConfig(config);
        console.log(graphqlAdded);
        process.exit(0);
      case "customize":
        // Copy the file to the root
        // delete the file from the 'hidden' dir if present.
        Customize.customize(
          {
            src: config.src ? config.src : "app/src",
            internalSrc: "./.elm-prefab",
          },
          command.customizable,
        );

        process.exit(0);
    }
  }
};

run(process.argv);
