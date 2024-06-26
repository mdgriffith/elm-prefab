import * as Generator from "./run_generator";
import * as Options from "../options";
import * as path from "path";
import * as fs from "fs";

type AssetGroup = {
  name: string;
  fileInfo: {
    markdown: {
      frontmatter: {
        [key: string]: any;
      };
    };
  };
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
          await readFilesRecursively(src, files);

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
          await readFilesRecursively(assetConfig.src, files);

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

      return await Generator.run(runOptions.internalSrc, {
        assets: assetGroups,
      });
    },
  };
};

export type File = { path: string; contents: string | null };

export const readFilesRecursively = async (dir: string, found: File[]) => {
  if (
    dir.endsWith("node_modules") ||
    dir.endsWith("elm-stuff") ||
    dir.endsWith(".git")
  ) {
    // don't go chasing waterfalls
    return;
  } else if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (file.startsWith(".") || file.startsWith("_")) {
        //  Skip hidden files
        continue;
      }
      if (stat.isFile()) {
        if (await isBinaryFile(filePath)) {
          found.push({ path: filePath, contents: null });
        } else {
          const content = fs.readFileSync(filePath, "utf-8");
          found.push({ path: filePath, contents: content });
        }
      } else if (stat.isDirectory()) {
        await readFilesRecursively(filePath, found);
      }
    }
  }
};

function isBinaryFile(
  filePath: string,
  bytesToCheck: number = 512
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const buffer = Buffer.alloc(bytesToCheck);
    fs.open(filePath, "r", (err, fd) => {
      if (err) {
        return reject(err);
      }
      fs.read(fd, buffer, 0, bytesToCheck, 0, (err, bytesRead) => {
        fs.close(fd, (closeErr) => {
          if (closeErr) {
            console.error("Error closing file", closeErr);
          }
          if (err) {
            return reject(err);
          }
          // This is our way of detecting if it's a binary file or not.
          // We're checking if it contains a "null byte"
          // If it doesn we don't include the contents
          const hasNullBytes = buffer.slice(0, bytesRead).includes(0x00);
          resolve(hasNullBytes);
        });
      });
    });
  });
}
