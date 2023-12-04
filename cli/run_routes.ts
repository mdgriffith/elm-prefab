import * as Generator from "./run_generator";
import * as Options from "./options";
import * as path from "path";
import * as fs from "fs";

const RouteGenerator = require("./generators/routes");

type ElmFile = {
  id: string;
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

export const generator = (options: any) => {
  return {
    generatorType: Options.GeneratorType.Standard,
    init: (runOptions: Options.RunOptions) => {
      // Copy static files
      // Which is nothing!
    },
    run: async (runOptions: Options.RunOptions) => {
      // Copy static files

      const pageDir = path.join(runOptions.src, "Page");

      const elmFiles: ElmFile[] = [];

      // All Elm page files
      const rawElmFiles: File[] = [];
      readFilesRecursively(pageDir, rawElmFiles);

      for (const moduleName in options) {
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
          id: moduleName,
          url: url,
          deprecatedUrls: deprecatedUrls,
          assets: assets,
        });
        // Delete the page config from the options so we can tell if there are missing ones later
        // Also a page config can only be used once
        delete options[moduleName];
      }

      await Generator.run(RouteGenerator.Elm.Generate, runOptions.internalSrc, {
        pages: elmFiles,
      });
    },
  };
};

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
