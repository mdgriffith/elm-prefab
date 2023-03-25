// @ts-ignore
import * as CodeGen from "elm-codegen";
import * as fs from "fs";
import * as path from "path";

export const generate = (options: {
  output: string;
  generators: Generator[];
}) => {
  options.generators.sort((a, b) => a.generatorType - b.generatorType);

  for (const generator of options.generators) {
    generator.run({ output: options.output });
  }
};

type Generator = {
  generatorType: GeneratorType;
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

type AppOptions = { markdown: string; elm?: Pages };

type ElmFile = {
  source: string;
  id: string[];
  urls: string[];
};

export const app = (options: AppOptions) => {
  return {
    generatorType: GeneratorType.Standard,
    run: (runOptions: { output: string }) => {
      const files: File[] = [];
      readFilesRecursively(options.markdown, files);
      const assets = { base: options.markdown, files: files };

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
        cwd: "./codegen",
      });
    },
  };
};

export type UiOptions = {
  colors: string[];
  spacing: string[];
  typography: string[];
  borders: string[];
  shadows: string[];
};

export const ui = (options: UiOptions) => {
  console.log(options.colors);
  return {
    generatorType: GeneratorType.Standard,
    run: (runOptions: { output: string }) => {
      return CodeGen.run("GenerateTheme.elm", {
        debug: true,
        output: runOptions.output,
        flags: options,
        cwd: "./codegen",
      });
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
