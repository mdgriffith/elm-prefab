import * as fs from "fs";
import * as path from "path";
import * as AppEngine from "./templates/app/engine";
import * as AppToCopy from "./templates/app/toCopy";
import * as ThemeWebComponents from "./templates/theme/engine";
import * as Generator from "./run_generator";
import { Command } from "commander";

// Elm Generators
const AppGenerator = require("./generators/app");
const ThemeGenerator = require("./generators/theme");

type GenerateOptions = {
  src: string;
  plugins: Generator[];
};

export enum GeneratorType {
  DataRetrieval = 0,
  Standard = 1,
}

type Generator = {
  generatorType: GeneratorType;
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

// Plugins

// App Generation

type ElmFile = {
  source: string;
  id: string[];
  moduleName: string[];
  url: string;
  deprecatedUrls?: string[];
  assets: Assets | null;
};

type Assets = {
  base: string;
  baseOnApp: string;
  baseOnServer: string;
  files: { path: string; contents: string }[];
};

export const app = (options: any) => {
  return {
    generatorType: GeneratorType.Standard,
    init: (runOptions: RunOptions) => {
      AppEngine.copyTo(runOptions.internalSrc, true);
      AppToCopy.copyTo(runOptions.src, false);
    },
    run: async (runOptions: RunOptions) => {
      // Copy static files
      AppEngine.copyTo(runOptions.internalSrc, true);

      const pageDir = path.join(runOptions.src, "Page");

      const elmFiles: ElmFile[] = [];

      // All Elm page files
      const rawElmFiles: File[] = [];
      readFilesRecursively(pageDir, rawElmFiles);

      for (const elmFile of rawElmFiles) {
        let id: string[] = path
          .relative(pageDir, elmFile.path)
          .replace(".elm", "")
          .split(path.sep);

        const moduleName = path
          .relative(runOptions.src, elmFile.path)
          .replace(".elm", "")
          .split(path.sep)
          .join(".");

        if (moduleName in options) {
          const pageConfig = options[moduleName];

          let url: string = "";
          let deprecatedUrls: string[] = [];
          let assets: Assets | null = null;

          if (typeof pageConfig === "string") {
            // Single Url
            url = pageConfig;
            deprecatedUrls = [];
          } else if ("dir" in pageConfig) {
            // From Directory
            let files: File[] = [];
            readFilesRecursively(pageConfig.dir, files);
            assets = {
              base: path.normalize(pageConfig.dir),
              baseOnApp: pageConfig.url.replace("/*", ""),
              baseOnServer: pageConfig.urlOnServer,
              files: files,
            };

            // We require a URL for a directory
            url = pageConfig.url;
          } else {
            // Normal Elm page with url options
            url = pageConfig.url;
            deprecatedUrls = pageConfig.deprecatedUrls
              ? pageConfig.deprecatedUrls
              : [];
          }

          elmFiles.push({
            source: elmFile.contents,
            id: id,
            moduleName: moduleName.split("."),
            url: url,
            deprecatedUrls: deprecatedUrls,
            assets: assets,
          });
          // Delete the page config from the options so we can tell if there are missing ones later
          // Also a page config can only be used once
          delete options[moduleName];
        } else {
          throw new Error(`${moduleName}:  page config not found`);
        }
      }

      await Generator.run(AppGenerator.Elm.Generate, runOptions.internalSrc, {
        pages: elmFiles,
      });
    },
  };
};

const theme = (options: any) => {
  return {
    generatorType: GeneratorType.Standard,
    init: (runOptions: RunOptions) => {
      ThemeWebComponents.copyTo(runOptions.internalSrc, true);
    },
    run: async (runOptions: RunOptions) => {
      ThemeWebComponents.copyTo(runOptions.internalSrc, true);
      await Generator.run(
        ThemeGenerator.Elm.Generate,
        runOptions.internalSrc,
        options
      );
    },
  };
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
          case "theme":
            plugins.push(theme(config.theme));
            break;
          case "app":
            plugins.push(app(config.app));
            break;
          default:
            console.log(`It's neither a theme nor an app. ${pluginName}`);
        }
      }
    }
    generate({ src: "./src", plugins: plugins });
  });

export type File = { path: string; contents: string };

export const readFilesRecursively = (dir: string, found: File[]) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      const content = fs.readFileSync(filePath, "utf-8");
      found.push({ path: filePath, contents: content });
    } else if (stat.isDirectory()) {
      readFilesRecursively(filePath, found);
    }
  }
};

program.parse();
