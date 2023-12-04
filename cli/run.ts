import * as fs from "fs";
import * as Generator from "./run_generator";
import { Command } from "commander";
import * as Options from "./options";

import * as App from "./run_app";
import * as Theme from "./run_theme";
import * as Interactive from "./run_interactive";
import * as Routes from "./run_routes";

type GenerateOptions = {
  src: string;
  plugins: Generator[];
};

type Generator = {
  generatorType: Options.GeneratorType;
  init: (options: RunOptions) => void;
  run: (options: RunOptions) => void;
};

type RunOptions = { internalSrc: string; src: string };

export const generate = (options: GenerateOptions) => {
  options.plugins.sort((a, b) => a.generatorType - b.generatorType);

  for (const generator of options.plugins) {
    generator.init({ internalSrc: "./.elm-press", src: options.src });
    generator.run({ internalSrc: "./.elm-press", src: options.src });
  }
};

// CLI Program

const program = new Command();

program
  .name("elm-press")
  .description("Generate and maintain Elm scaffolding")
  .version("0.1.0");

program
  .command("generate")
  .description("Generate Elm scaffolding based on an `elm.generate.json` file")
  .action(() => {
    const config = JSON.parse(fs.readFileSync("./elm.generate.json", "utf-8"));
    const plugins: Generator[] = [];

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
          case "interactive":
            plugins.push(Interactive.generator(config.interactive));
            break;
          default:
            console.log(`It's neither a theme nor an app. ${pluginName}`);
        }
      }
    }
    const src = config.src || "./src";

    generate({ src: src, plugins: plugins });
  });

program.parse();
