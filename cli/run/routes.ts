import * as Generator from "./run_generator";
import * as Options from "../options";
import * as path from "path";
import * as fs from "fs";

type ElmFile = {
  id: string;
  url: string;
  redirectFrom?: string[];
};

export const generator = (options: any): Options.Generator => {
  return {
    name: "routes",
    generatorType: Options.GeneratorType.Standard,
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
        let redirectFrom: string[] = [];

        if (typeof pageConfig === "string") {
          // Single Url
          url = pageConfig;
          redirectFrom = [];
        } else {
          // Normal Elm page with url options
          url = pageConfig.url;
          redirectFrom = pageConfig.redirectFrom ? pageConfig.redirectFrom : [];
        }

        elmFiles.push({
          id: moduleName,
          url: url,
          redirectFrom: redirectFrom,
        });
        // Delete the page config from the options so we can tell if there are missing ones later
        // Also a page config can only be used once
        delete options[moduleName];
      }

      return await Generator.run(runOptions.internalSrc, {
        routes: elmFiles,
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
