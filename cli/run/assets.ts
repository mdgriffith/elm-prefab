import * as Generator from "./run_generator";
import * as Options from "../options";
import * as path from "path";
import * as fs from "fs";
import { ensureDirSync } from "../ext/filesystem";
import * as Util from "../util";

type AssetGroup = {
  name: string;
  fileInfo: {
    markdown: {
      frontmatter: {
        [key: string]: any;
      };
    };
  };
  files: AssetFile[];
};

type AssetFile = {
  name: string;
  crumbs: string[];
  pathOnServer: string;
  content: string | null;
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

/*






*/
export const generator = (options: any): Options.Generator => {
  return {
    name: "assets",
    generatorType: Options.GeneratorType.Standard,
    run: async (runOptions: Options.RunOptions) => {
      /* The expected shape of the options is one of the following forms:

        { "Images": "images"
        , "Markdown": {"src": "assets/markdown", "onServer": "assets"}
        }
      */
      if (options == undefined) {
        // Run the default asset generator.
        const assetGroups = await prepareDefaultAssetGroups(runOptions);
        return await Generator.run(runOptions.internalSrc, {
          assets: assetGroups,
        });
      } else {
        const assetGroups = await prepareAssetGroups(options, runOptions);
        return await Generator.run(runOptions.internalSrc, {
          assets: assetGroups,
        });
      }
    },
  };
};

/*

  Default groups.

  1. All files in `public` are grouped into the `Public` group.
  2. Any subdirectories are grouped into their own asset group.


*/
const prepareDefaultAssetGroups = async (
  runOptions: Options.RunOptions,
): Promise<AssetGroup[]> => {
  const assetGroups: AssetGroup[] = [];
  const publicDir = path.join(".", runOptions.js, "public");
  const serverDir = "/";

  ensureDirSync(path.join(runOptions.js, "public"));

  const defaultAssetOptions = { src: publicDir, onServer: serverDir };
  const topFiles: Util.File[] = [];

  for (const element of fs.readdirSync(publicDir)) {
    const fullPath = path.join(publicDir, element);
    const stats = fs.statSync(fullPath);

    if (stats.isFile()) {
      const fileContent = await Util.captureFile(fullPath);
      topFiles.push(fileContent);
    } else if (stats.isDirectory()) {
      let files: File[] = [];

      await Util.readFilesRecursively(fullPath, files);

      const gatheredFiles = gatherFiles(
        { src: fullPath, onServer: path.join(serverDir, element) },
        files,
      );

      assetGroups.push({
        name: capitalize(element),
        fileInfo: { markdown: { frontmatter: {} } },
        files: gatheredFiles,
      });
    }
  }

  if (topFiles.length > 0) {
    const gatheredFiles = gatherFiles(defaultAssetOptions, topFiles);
    assetGroups.push({
      name: "Public",
      fileInfo: { markdown: { frontmatter: {} } },
      files: gatheredFiles,
    });
  }

  return assetGroups;
};

const gatherFiles = (
  assetConfig: { src: string; onServer: string },
  files: Util.File[],
): AssetFile[] => {
  const gatheredFiles: AssetFile[] = [];
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
  return gatheredFiles;
};

const prepareAssetGroups = async (
  options: any,
  runOptions: Options.RunOptions,
): Promise<AssetGroup[]> => {
  const assetGroups: AssetGroup[] = [];
  for (const moduleName in options) {
    const assetConfig = options[moduleName];

    if (typeof assetConfig === "string") {
      // Single Url
      const src = assetConfig;

      let files: File[] = [];
      await Util.readFilesRecursively(src, files);

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
        fileInfo: { markdown: { frontmatter: {} } },
        files: gatheredFiles,
      });
    } else {
      let files: File[] = [];
      await Util.readFilesRecursively(assetConfig.src, files);

      const gatheredFiles = gatherFiles(assetConfig, files);

      const frontmatter = assetConfig.markdown
        ? assetConfig.markdown.frontmatter
        : {};

      assetGroups.push({
        name: moduleName,
        fileInfo: { markdown: { frontmatter: frontmatter } },
        files: gatheredFiles,
      });
    }

    // Delete the page config from the options so we can tell if there are missing ones later
    // Also a page config can only be used once
    delete options[moduleName];
  }
  return assetGroups;
};

const capitalize = (str: string): string => {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};
