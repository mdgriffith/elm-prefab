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
  generators: Generator[];
};

export const generate = (options: GenerateOptions) => {
  options.generators.sort((a, b) => a.generatorType - b.generatorType);

  for (const generator of options.generators) {
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

type Pages = {
  dir: string;
  urls?: PageUrl[];
};

type PageUrl = {
  page: string;
  url?: string;
  urls?: string[];
};

type AppOptions = { markdown?: string; elm?: Pages };

type ElmFile = {
  source: string;
  id: string[];
  urls: string[];
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

      const files: File[] = [];

      let assets: {
        base: string;
        files: { path: string; contents: string }[];
      } | null = null;
      if (options.markdown) {
        readFilesRecursively(options.markdown, files);
        assets = { base: path.normalize(options.markdown), files: files };
      }

      const elmFiles: ElmFile[] = [];
      if (options.elm) {
        const rawElmFiles: File[] = [];
        readFilesRecursively(options.elm.dir, rawElmFiles);

        for (const elmFile of rawElmFiles) {
          const urls: string[] = [];

          if (options.elm.urls) {
            for (const pageUrl of options.elm.urls) {
              if (elmFile.path.endsWith(pageUrl.page)) {
                if (pageUrl.url) {
                  urls.push(pageUrl.url);
                } else if (pageUrl.urls) {
                  urls.concat(urls);
                }
                break;
              }
            }
          }

          options.elm.dir;

          const id: string[] = path
            .relative(options.elm.dir, elmFile.path)
            .replace(".elm", "")
            .split(path.sep);

          elmFiles.push({
            source: elmFile.contents,
            id: id,
            urls: urls,
          });
        }
      }
      await Generator.run(AppGenerator.Elm.Generate, runOptions.internalSrc, {
        assets: assets,
        elmFiles: elmFiles,
      });
    },
  };
};

export type UiOptions = {
  backgrounds: {
    [index: string]: Palette;
  };
  spacing: Spacing;
  typography: Typography;
  borders?: {
    [index: string]: BorderVariant;
  };
  shadows?: string[];
};

interface Spacing {
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

type TypeVariant = {
  weight?: number;
  size: number;
  lineSpacing?: number;
  color: Palette | string;
};

type BorderVariant = {
  rounded?: number;
  color: string;
  width?: number;
};

export const ui = (options: UiOptions) => {
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
