// @ts-ignore
import * as CodeGen from "elm-codegen";
import * as fs from "fs";
import * as path from "path";
import * as AppEngine from "./templates/app/engine";
import * as AppToCopy from "./templates/app/toCopy";
import * as ThemeWebComponents from "./templates/theme/engine";

export const generate = (options: {
  output: string;
  generators: Generator[];
}) => {
  options.generators.sort((a, b) => a.generatorType - b.generatorType);

  for (const generator of options.generators) {
    generator.init();
    generator.run({ output: options.output });
  }
};

type Generator = {
  generatorType: GeneratorType;
  init: () => void;
  run: (options: { output: string }) => void;
};

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
    init: () => {
      AppEngine.copyTo("./.elm-press");
      AppToCopy.copyTo("./src");
    },
    run: (runOptions: { output: string }) => {
      // Copy static files
      AppEngine.copyTo("./.elm-press");

      const files: File[] = [];

      let assets: {
        base: string;
        files: { path: string; contents: string }[];
      } | null = null;
      if (options.markdown) {
        readFilesRecursively(options.markdown, files);
        assets = { base: options.markdown, files: files };
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
      return CodeGen.run("Generate.elm", {
        debug: true,
        output: runOptions.output,
        flags: { assets: assets, elmFiles: elmFiles },
        cwd: "/Users/mattgriffith/projects/mdgriffith/elm-press/plugins/app/",
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
    init: () => {
      ThemeWebComponents.copyTo("./.elm-press");
    },
    run: (runOptions: { output: string }) => {
      ThemeWebComponents.copyTo("./.elm-press");
      return CodeGen.run("Generate.elm", {
        debug: true,
        output: runOptions.output,
        flags: options,
        cwd: "/Users/mattgriffith/projects/mdgriffith/elm-press/plugins/theme",
      });
    },
  };
};

// export const interactive = (options: UiOptions) => {
//   return {
//     generatorType: GeneratorType.Standard,
//     run: (runOptions: { output: string }) => {
//       return CodeGen.run("Generate.elm", {
//         debug: true,
//         output: runOptions.output,
//         flags: options,
//         cwd: "/Users/mattgriffith/projects/mdgriffith/elm-press/plugins/theme",
//       });
//     },
//   };
// };

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

// //
// // Copy files
// //    Files in `toCopy` go to the Elm `src` of the users project on `init`.
// //    `engine` are static files that are copied into `.elm-press`
// //

// const init = (options: { baseDir: string; elmSrc: string; toCopy: string[]; engine: string[] }) => {
//   // Copy files from `toCopy` into `elmSrc`

// }

// const runCopy = (options: {baseDir: string; elmSrc: string; toCopy: string[]; engine: string[] }) => {

// }
