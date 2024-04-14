import * as Generator from "./run_generator";
import * as AppEngine from "../templates/app/copyAll";
import * as Options from "../options";
import * as fs from "fs";
import * as path from "path";
import * as ElmDev from "../elm_dev";
import chalk from "chalk";

const Page = require("../templates/app/oneOff/Page.elm.ts");

const ensureDirSync = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

export const generator = (options: Options.AppOptions): Options.Generator => {
  return {
    name: "app",
    generatorType: Options.GeneratorType.Standard,

    run: async (runOptions: Options.RunOptions) => {
      const summary: Options.Summary = { generated: [] };

      // Copy static files
      AppEngine.copy(runOptions, summary);

      const viewRegions = await ElmDev.execute(
        "explain App.View.Regions",
        runOptions.root
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
        pages
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
  pages: PageUsage[]
): PageUsage[] => {
  try {
    const elmFiles = fs
      .readdirSync(dir)
      .filter((file) => path.extname(file) === ".elm");
    const elmFileNames = elmFiles.map((file) => path.basename(file, ".elm"));

    // Check for PageUsage entries without a corresponding file
    pages.forEach((page) => {
      if (!elmFileNames.includes(page.id) && !page.urlOnly) {
        if (!silent) {
          logError(
            `Missing Elm Page`,
            `I found Page.Id.${page.id}, but wasn't able to find a corresponding .elm file for it in src/Page!
  For now I'll make that page ID render as the Not Found page until you get a moment to add the file.`
          );
        }

        const pageContent = Page.toBody(new Map([["{{name}}", page.id]]));

        fs.writeFileSync(path.join(dir, `${page.id}.elm`), pageContent, "utf8");
        page.elmModuleIsPresent = true;
      } else {
        page.elmModuleIsPresent = true;
      }
    });

    // Check for .elm files not referenced in PageUsage
    elmFileNames.forEach((fileName) => {
      if (!pages.some((page) => page.id === fileName) && !silent) {
        logError(
          `Unused Elm Page`,
          `I found ${fileName}.elm, but there is no entry in Page.Id for it, so it's not used.  I'd recommend adding a new entry to Page.Id for it, or delete the file!`
        );
      }
    });
    return pages;
  } catch (error) {
    console.error("Error verifying Elm files:", error);
    return pages;
  }
};

const pageIdsToPageUsages = (pageIds: any): PageUsage[] => {
  if (pageIds.error) {
    console.log(pageIds.error);
    process.exit(1);
  }

  const pages: PageUsage[] = [];
  if (!pageIds.definition.type.definition.variants) {
    console.log(
      "I wasn't able to find any variants for `App.Page.Id.Id`, is it a normal custom type?"
    );
    process.exit(1);
  }
  for (const variant of pageIds.definition.type.definition.variants) {
    pages.push({
      id: variant.name,
      moduleName: ["Page", variant.name],
      value: "page",
      paramType: variant.args.length === 0 ? null : variant.args[0],
      urlOnly: false,
      elmModuleIsPresent: false,
      route: null,
    });
  }
  return pages;
};

const pageConfigToPageUsages = (pageConfigs: {
  [key: string]: Options.PageOptions;
}): PageUsage[] => {
  const pages: PageUsage[] = [];

  for (const [pageId, value] of Object.entries(pageConfigs)) {
    pages.push({
      id: pageId,
      moduleName: ["Page", pageId],
      value: "page",
      paramType: null, //pageConfig.paramType,
      elmModuleIsPresent: false,
      urlOnly: value.urlOnly,
      route: { id: pageId, url: value.url, redirectFrom: value.redirectFrom },
    });
  }

  return pages;
};

const placeholderViewRegions = {
  moduleName: "App.View",
  definition: {
    name: "Regions",
    type: {
      signature: "{ primary : view, nav : Maybe view, detail : List view }",
      components: [
        {
          source: {
            pkg: "author/project",
            module: "App.View",
          },
          definition: {
            type: "alias",
            comment: " ",
            module: "App.View",
            name: "Regions",
            args: [],
            signature:
              "{ primary : view, nav : Maybe view, detail : List view }",
            fields: {
              detail: "List view",
              nav: "Maybe view",
              primary: "view",
            },
          },
        },
      ],
    },
    region: {
      start: {
        line: 35,
        column: 1,
      },
      end: {
        line: 39,
        column: 6,
      },
    },
  },
};

export type File = { path: string; contents: string };
