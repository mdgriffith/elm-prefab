import * as fs from "fs";
import * as path from "path";
import * as AppEngine from "./templates/app/engine";
import * as AppToCopy from "./templates/app/toCopy";
import * as ThemeWebComponents from "./templates/theme/engine";
import * as Generator from "./run_generator";

// Elm Generators
const AppGenerator = require("./generators/app");
const ThemeGenerator = require("./generators/theme");

type GenerateOptions = {
  src: string;
  plugins: Generator[];
};

export const generate = (options: GenerateOptions) => {
  options.plugins.sort((a, b) => a.generatorType - b.generatorType);

  for (const generator of options.plugins) {
    generator.init({ internalSrc: "./.elm-press", src: options.src });
    generator.run({ internalSrc: "./.elm-press", src: options.src });
  }
};

type Generator = {
  generatorType: GeneratorType;
  init: (options: RunOptions) => void;
  run: (options: RunOptions) => void;
};

type RunOptions = { internalSrc: string; src: string };

export enum GeneratorType {
  DataRetrieval = 0,
  Standard = 1,
}

type AppOptions = { [key: string]: Page };

type Page = string | PageUrl | FromDirectory;

type PageUrl = {
  url: string;
  deprecatedUrls?: string[];
};

type FromDirectory = {
  dir: string;
  url: string;
  urlOnServer: string;
  deprecatedUrls?: string[];
};

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
  baseOnServer: string;
  files: { path: string; contents: string }[];
};

export const app = (options: AppOptions) => {
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
          console.log(pageConfig);

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

      // console.log(elmFiles);
      await Generator.run(AppGenerator.Elm.Generate, runOptions.internalSrc, {
        pages: elmFiles,
      });
    },
  };
};

// UI Theme Plugin

export type UiOptions = {
  colors: {
    [index: string]: Palette | string;
  };
  spacing: Spacing;
  typography: Typography;
  borders?: {
    [index: string]: BorderVariant;
  };
  shadows?: string[];
  screens?: Screens;
};

interface Spacing {
  [index: string]: number;
}

interface Screens {
  [index: string]: number;
}

interface Palette {
  [index: string]: string;
}

interface Typography {
  [index: string]: Typeface;
}

type Typeface = {
  face: string;
  fallback: string[];
  size: number;
  color: Palette | string;
  weight?: number;
  leadingRatio?: number;
};

type BorderVariant = {
  rounded?: number;
  color: string;
  width?: number;
};

export const theme = (options: UiOptions) => {
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

export const figma = (options: { apiKey: string }) => {
  console.log(options.apiKey);
  return { generatorType: GeneratorType.Standard, run: () => {} };
};

export const notion = (options: { apiKey: string }) => {
  console.log(options.apiKey);
  return { generatorType: GeneratorType.DataRetrieval, run: () => {} };
};

// Some helpful file utilities

export type Directory = { base: string; files: File[] };

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
