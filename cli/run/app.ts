import * as Generator from "./run_generator";
import * as Options from "../options";
import * as fs from "fs";
import * as path from "path";
import * as ElmDev from "../elm_dev";
import chalk from "chalk";
import { ensureDirSync } from "../ext/filesystem";
import * as Page from "../templates/app/oneOff/Page.elm";

const defaultPackageJson = {
  name: "placeholder",
  type: "module",
  version: "0.1.0",
  scripts: {
    dev: "vite",
    build: "vite build",
  },
  devDependencies: {
    vite: "^5.2.6",
    "vite-plugin-elm": "^3.0.0",
    typescript: "^5.4.3",
    "elm-dev": "^0.1.3",
    "elm-prefab": "^0.1.21",
  },
};

// {
//   "name": "placeholder",
//   "type": "module",
//   "description": "",
//   "version": "0.1.0",
//   "scripts": {
//     "dev": "vite",
//     "build": "vite build"
//   },
//   "devDependencies": {
//     "vite": "^5.2.6",
//     "vite-plugin-elm": "^3.0.0",
//     "typescript": "^5.4.3",
//     "elm-dev": "^0.1.3",
//     "elm-prefab": "^0.1.21",
//     "@tiptap/core": "^2.2.4",
//     "@tiptap/extension-link": "^2.2.4",
//     "@tiptap/pm": "^2.2.4",
//     "@tiptap/starter-kit": "^2.2.4"
//   }
// }

export const generator = (options: Options.AppOptions): Options.Generator => {
  return {
    name: "app",
    generatorType: Options.GeneratorType.Standard,

    run: async (runOptions: Options.RunOptions) => {
      const summary: Options.Summary = { generated: [] };

      const viewRegions = await ElmDev.execute(
        "explain App.View.Regions",
        runOptions.root,
      );

      await Generator.run(runOptions.internalSrc, {
        "app-view": viewRegions,
      });

      const pages = pageConfigToPageUsages(options.pages);

      ensureDirSync(path.join(runOptions.src, "Page"));

      const verifiedPages = verifyElmFilesExist(
        // Silence warnings if we're initializing
        runOptions.initializing,
        path.join(runOptions.src, "Page"),
        pages,
      );

      const resources = scanResources(path.join(runOptions.src, "Resource"));

      const newSummary = await Generator.run(runOptions.internalSrc, {
        app: { pages: verifiedPages, resources: resources },
      });
      return Options.mergeSummaries(summary, newSummary);
    },
  };
};

const scanResources = (dir: string): { id: string }[] => {
  try {
    const elmFiles = fs
      .readdirSync(dir)
      .filter((file) => path.extname(file) === ".elm");
    const elmFileNames = elmFiles.map((file) => path.basename(file, ".elm"));
    const resources: { id: string }[] = [];
    for (const fileName of elmFileNames) {
      resources.push({ id: fileName });
    }
    return resources;
  } catch (error) {
    return [];
  }
};

type PageUsage = {
  id: string;
  moduleName: string[];
  value: string;
  paramType: string | null;
  elmModuleIsPresent: boolean;
  urlOnly: boolean;
  route: { id: string; url: string; redirectFrom: string[] } | null;
};

const logError = (title: string, body: string) => {
  console.log(`\n\n${chalk.cyan(title)}\n\n${body}\n`);
};

const verifyElmFilesExist = (
  silent: boolean,
  dir: string,
  pages: PageUsage[],
): PageUsage[] => {
  try {
    const elmFiles = gatherElmFilePaths(dir);
    const elmModuleNames = extractElmModuleNames(dir, elmFiles);

    // Check for PageUsage entries without a corresponding file
    pages.forEach((page) => {
      if (!isValidElmModuleName(page.id)) {
        `Hmm, ${chalk.yellow(page.id)} in ${chalk.cyan("elm.generate.json")} doesn't look like a valid Elm module name.
Some valid examples are:
  ${chalk.yellow("Home")}
  ${chalk.yellow("Post")}
  ${chalk.yellow("Post.Details")}
`;
        process.exit(1);
      }
      if (!elmModuleNames.includes(page.id) && !page.urlOnly) {
        if (!silent) {
          logError(
            `Missing Elm Page`,
            `I found ${page.id} in ${chalk.cyan("elm.generate.json")}, but wasn't able to find a corresponding .elm file for it in ${dir}!
I've added a placeholder page for the moment.`,
          );
        }

        const pageContent = Page.toBody(
          new Map([
            ["{{name}}", page.id],
            ["{{name_underscored}}", page.id.replace(".", "_")],
          ]),
        );
        const pagePath = elmModuleNameToFilePath(dir, page.id);
        fs.writeFileSync(pagePath, pageContent, "utf8");
      }
      page.elmModuleIsPresent = true;
    });

    // Check for .elm files not referenced in PageUsage
    elmModuleNames.forEach((fileName) => {
      if (!pages.some((page) => page.id === fileName) && !silent) {
        logError(
          `Unused Elm Page`,
          `I found ${fileName}.elm, but there is no entry in Page.Id for it, so it's not used.  I'd recommend adding a new entry to Page.Id for it, or delete the file!`,
        );
      }
    });
    return pages;
  } catch (error) {
    console.error("Error verifying Elm files:", error);
    return pages;
  }
};

const pageConfigToPageUsages = (pageConfigs: {
  [key: string]: Options.PageOptions;
}): PageUsage[] => {
  const pages: PageUsage[] = [];

  for (const [pageId, value] of Object.entries(pageConfigs)) {
    pages.push({
      id: pageId,
      moduleName: ["Page", ...pageId.split(".")],
      value: "page",
      paramType: null, //pageConfig.paramType,
      elmModuleIsPresent: false,
      urlOnly: value.urlOnly,
      route: { id: pageId, url: value.url, redirectFrom: value.redirectFrom },
    });
  }

  return pages;
};

export type File = { path: string; contents: string };

function gatherElmFilePaths(directory: string): string[] {
  const elmFiles: string[] = [];
  const directoriesToSkip = ["node_modules", "elm-stuff"];

  function traverseDirectory(currentPath: string) {
    const files = fs.readdirSync(currentPath);

    for (const file of files) {
      const filePath = path.join(currentPath, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        if (!directoriesToSkip.includes(file)) {
          traverseDirectory(filePath);
        }
      } else if (path.extname(file) === ".elm") {
        elmFiles.push(filePath);
      }
    }
  }

  traverseDirectory(directory);
  return elmFiles;
}

function extractElmModuleNames(baseDir: string, filePaths: string[]): string[] {
  return filePaths.map((filePath) => {
    // 1. Remove the base directory
    const relativePath = path.relative(baseDir, filePath);

    // 2. Remove the .elm extension
    const withoutExtension = relativePath.replace(/\.elm$/, "");

    // 3. Translate path separators to dots
    const moduleName = withoutExtension.split(path.sep).join(".");

    return moduleName;
  });
}

function isValidElmModuleName(moduleName: string): boolean {
  // Elm module names must:
  // 1. Start with an uppercase letter
  // 2. Contain only letters, numbers, and dots
  // 3. Each segment (parts between dots) must start with an uppercase letter
  const regex = /^[A-Z]([A-Za-z0-9]+)?(\.[A-Z]([A-Za-z0-9]+)?)*$/;
  return regex.test(moduleName);
}

function elmModuleNameToFilePath(baseDir: string, moduleName: string): string {
  if (!isValidElmModuleName(moduleName)) {
    throw new Error(`Invalid Elm module name: ${moduleName}`);
  }

  // Convert dots to path separators and add .elm extension
  const relativePath = moduleName.replace(/\./g, path.sep) + ".elm";

  // Join with the base directory to get the full path
  return path.join(baseDir, relativePath);
}
