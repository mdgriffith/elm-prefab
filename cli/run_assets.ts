import * as Generator from "./run_generator";
import * as Options from "./options";
import * as path from "path";
import * as fs from "fs";

const ElmGenerator = require("./generators/all");

type AssetGroup = {
  name: string;
  files: {
    name: string;
    crumbs: string[];
    pathOnServer: string;
    content: string | null;
  }[];
};

function stripSrc(prefix: string, filepath: string): string {
  const normalizedSrc = path.normalize(prefix) + path.sep;
  const normalizedFilepath = path.normalize(filepath);
  return normalizedFilepath.startsWith(normalizedSrc)
    ? normalizedFilepath.substring(normalizedSrc.length)
    : filepath;
}

const toCrumbs = (basePath: string): string[] => {
  basePath = basePath.replace(/^\.\/?/, "");

  const dir = path.dirname(path.normalize(basePath));
  if (dir === ".") {
    return [];
  }
  const sections = dir.split(path.sep);
  return sections;
};

const normalizePathOnServer = (pathOnServer: string): string => {
  if (pathOnServer.startsWith("/")) {
    return path.normalize(pathOnServer);
  }

  return "/" + path.normalize(pathOnServer);
};

export const generator = (options: any): Options.Generator => {
  return {
    name: "assets",
    generatorType: Options.GeneratorType.Standard,
    init: (runOptions: Options.RunOptions) => {
      // Copy static files
      // Which is nothing!
    },
    run: async (runOptions: Options.RunOptions) => {
      /* The expected shape of the options is one of the following forms:
       
        { "Images": "images" 
        , "Markdown": {"src": "assets/markdown", "onServer": "assets"}
        }
      */

      const assetGroups: AssetGroup[] = [];

      for (const moduleName in options) {
        const assetConfig = options[moduleName];

        if (typeof assetConfig === "string") {
          // Single Url
          const src = assetConfig;

          let files: File[] = [];
          readFilesRecursively(src, files);

          const gatheredFiles = [];
          for (let file of files) {
            const basePath = stripSrc(src, file.path);

            gatheredFiles.push({
              name: path.basename(file.path, path.extname(file.path)),
              crumbs: toCrumbs(basePath),
              pathOnServer: normalizePathOnServer(src),
              content: file.contents,
            });
          }

          assetGroups.push({
            name: moduleName,
            files: gatheredFiles,
          });
        } else {
          let files: File[] = [];
          readFilesRecursively(assetConfig.src, files);

          const gatheredFiles = [];
          for (let file of files) {
            const basePath = stripSrc(assetConfig.src, file.path);
            const pathOnServer = assetConfig.onServer
              ? path.join(assetConfig.onServer, basePath)
              : basePath;

            gatheredFiles.push({
              name: path.basename(file.path, path.extname(file.path)),
              crumbs: toCrumbs(basePath),
              pathOnServer: normalizePathOnServer(pathOnServer),
              content: file.contents,
            });
          }

          assetGroups.push({
            name: moduleName,
            files: gatheredFiles,
          });
        }

        // Delete the page config from the options so we can tell if there are missing ones later
        // Also a page config can only be used once
        delete options[moduleName];
      }

      return await Generator.run(ElmGenerator.Elm.Run, runOptions.internalSrc, {
        assets: assetGroups,
      });
    },
  };
};

export type File = { path: string; contents: string | null };

export const readFilesRecursively = (dir: string, found: File[]) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (file.startsWith(".")) {
      //  Skip hidden files
      continue;
    }
    if (stat.isFile()) {
      const content = fs.readFileSync(filePath, "utf-8");
      if (content.includes("\u0000")) {
        // This is our way of detecting if it's a binary file or not.
        // We're checking if it contains a "null byte"
        // If it doesn we don't include the contents
        found.push({ path: filePath, contents: null });
      } else {
        found.push({ path: filePath, contents: content });
      }
    } else if (stat.isDirectory()) {
      readFilesRecursively(filePath, found);
    }
  }
};
