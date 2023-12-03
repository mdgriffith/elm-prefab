import * as Generator from "./run_generator";
import * as AppEngine from "./templates/app/engine";
import * as AppToCopy from "./templates/app/toCopy";
import * as Options from "./options";
import * as path from "path";
import * as fs from "fs";
import * as ChildProcess from "child_process";

const AppGenerator = require("./generators/app");

type ElmFile = {
  source: string;
  id: string[];
  moduleName: string[];
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
      AppEngine.copyTo(runOptions.internalSrc, true);
      AppToCopy.copyTo(runOptions.src, false);
    },
    run: async (runOptions: Options.RunOptions) => {
      // Copy static files
      AppEngine.copyTo(runOptions.internalSrc, true);

      const pageDir = path.join(runOptions.src, "Page");

      const elmFiles: ElmFile[] = [];

      // All Elm page files
      const rawElmFiles: File[] = [];
      readFilesRecursively(pageDir, rawElmFiles);

      verifyAllPagesAreInTheConfig(rawElmFiles, runOptions, options);

      for (const elmFile of rawElmFiles) {
        let id: string[] = path
          .relative(pageDir, elmFile.path)
          .replace(".elm", "")
          .split(path.sep);

        const moduleName = path
          .relative(runOptions.src, elmFile.path)
          .replace(".elm", "")
          .split(path.sep)
          .join(".");

        if (moduleName in options) {
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
            source: elmFile.contents,
            id: id,
            moduleName: moduleName.split("."),
            url: url,
            deprecatedUrls: deprecatedUrls,
            assets: assets,
          });
          // Delete the page config from the options so we can tell if there are missing ones later
          // Also a page config can only be used once
          delete options[moduleName];
        } else {
          throw new Error(`${moduleName}:  page config not found`);
        }
      }

      const viewRegions = await executeElmDevOperation(
        "explain App.View.Regions"
      );

      const pages = await executeElmDevOperation(
        "usage type App.Engine.Page.Page"
      );

      await Generator.run(AppGenerator.Elm.Generate, runOptions.internalSrc, {
        pages: elmFiles,
        regions: JSON.parse(viewRegions),
        pageUsages: JSON.parse(pages),
      });
    },
  };
};

const placeholderPageUsages = {
  usages: [
    {
      module: "App.Page",
      usedBy: [
        {
          region: {
            start: {
              line: 43,
              column: 1,
            },
            end: {
              line: 43,
              column: 14,
            },
          },
          name: "authenticated",
          isConcrete: false,
          type: {
            signature:
              "{ init : params -> App.Shared.Shared -> Maybe model -> Init msg model, update : App.Shared.Shared -> msg -> model -> ( model, App.Effect.Effect msg ), subscriptions : App.Shared.Shared -> model -> App.Sub.Sub msg, view : App.View.Id.Id -> App.Shared.Shared -> model -> App.View.View msg } -> App.Engine.Page.Page App.Shared.Shared params msg model",
            components: [
              {
                signature:
                  "{ init : params -> App.Shared.Shared -> Maybe model -> Init msg model, update : App.Shared.Shared -> msg -> model -> ( model, App.Effect.Effect msg ), subscriptions : App.Shared.Shared -> model -> App.Sub.Sub msg, view : App.View.Id.Id -> App.Shared.Shared -> model -> App.View.View msg } -> App.Engine.Page.Page App.Shared.Shared params msg model",
                definition:
                  "{ init : params -> App.Shared.Shared -> Maybe model -> Init msg model, update : App.Shared.Shared -> msg -> model -> ( model, App.Effect.Effect msg ), subscriptions : App.Shared.Shared -> model -> App.Sub.Sub msg, view : App.View.Id.Id -> App.Shared.Shared -> model -> App.View.View msg } -> App.Engine.Page.Page App.Shared.Shared params msg model",
              },
            ],
          },
        },
        {
          region: {
            start: {
              line: 31,
              column: 1,
            },
            end: {
              line: 31,
              column: 5,
            },
          },
          name: "page",
          isConcrete: false,
          type: {
            signature:
              "{ init : params -> App.Shared.Shared -> Maybe model -> Init msg model, update : App.Shared.Shared -> msg -> model -> ( model, App.Effect.Effect msg ), subscriptions : App.Shared.Shared -> model -> App.Sub.Sub msg, view : App.View.Id.Id -> App.Shared.Shared -> model -> App.View.View msg } -> App.Engine.Page.Page App.Shared.Shared params msg model",
            components: [
              {
                signature:
                  "{ init : params -> App.Shared.Shared -> Maybe model -> Init msg model, update : App.Shared.Shared -> msg -> model -> ( model, App.Effect.Effect msg ), subscriptions : App.Shared.Shared -> model -> App.Sub.Sub msg, view : App.View.Id.Id -> App.Shared.Shared -> model -> App.View.View msg } -> App.Engine.Page.Page App.Shared.Shared params msg model",
                definition:
                  "{ init : params -> App.Shared.Shared -> Maybe model -> Init msg model, update : App.Shared.Shared -> msg -> model -> ( model, App.Effect.Effect msg ), subscriptions : App.Shared.Shared -> model -> App.Sub.Sub msg, view : App.View.Id.Id -> App.Shared.Shared -> model -> App.View.View msg } -> App.Engine.Page.Page App.Shared.Shared params msg model",
              },
            ],
          },
        },
      ],
    },
    {
      module: "Page.Home",
      usedBy: [
        {
          region: {
            start: {
              line: 38,
              column: 1,
            },
            end: {
              line: 38,
              column: 5,
            },
          },
          name: "page",
          isConcrete: true,
          type: {
            signature:
              "App.Engine.Page.Page App.Shared.Shared params Msg String",
            components: [
              {
                signature:
                  "App.Engine.Page.Page App.Shared.Shared params Msg String",
                definition: {
                  type: "union",
                  comment: null,
                  module: "App.Engine.Page",
                  name: "Page",
                  args: [
                    {
                      name: "shared",
                      type: "App.Shared.Shared",
                    },
                    {
                      name: "params",
                      type: "params",
                    },
                    {
                      name: "msg",
                      type: "Msg",
                    },
                    {
                      name: "model",
                      type: "String",
                    },
                  ],
                  variants: [
                    {
                      name: "Page",
                      args: [
                        "{ toKey : Maybe (params -> String), init : params -> shared -> Maybe model -> App.Engine.Page.Init msg model, update : shared -> msg -> model -> ( model, Effect.Effect msg ), subscriptions : shared -> model -> App.Sub.Sub msg, view : App.View.Id.Id -> shared -> model -> Result App.PageError.Error (App.View.View msg) }",
                      ],
                    },
                  ],
                },
              },
              {
                signature: "App.Shared.Shared",
                definition: {
                  type: "alias",
                  comment: null,
                  module: "App.Shared",
                  name: "Shared",
                  args: [],
                  signature: "{ authenticated : App.Shared.Authenticated }",
                  fields: {
                    authenticated: "App.Shared.Authenticated",
                  },
                },
              },
              {
                signature: "params",
                definition: "params",
              },
              {
                signature: "Msg",
                definition: {
                  type: "union",
                  comment: " ",
                  module: "Page.Home",
                  name: "Msg",
                  args: [],
                  variants: [
                    {
                      name: "NoOp",
                      args: [],
                    },
                    {
                      name: "Show",
                      args: ["App.Shared.Shared"],
                    },
                  ],
                },
              },
              {
                signature: "String",
                definition: "String",
              },
            ],
          },
        },
      ],
    },
    {
      module: "Page.Markdown",
      usedBy: [
        {
          region: {
            start: {
              line: 31,
              column: 1,
            },
            end: {
              line: 31,
              column: 5,
            },
          },
          name: "page",
          isConcrete: true,
          type: {
            signature:
              "App.Engine.Page.Page App.Shared.Shared { a | src : String } msg { a | src : String }",
            components: [
              {
                signature:
                  "App.Engine.Page.Page App.Shared.Shared { a | src : String } msg { a | src : String }",
                definition: {
                  type: "union",
                  comment: null,
                  module: "App.Engine.Page",
                  name: "Page",
                  args: [
                    {
                      name: "shared",
                      type: "App.Shared.Shared",
                    },
                    {
                      name: "params",
                      type: "{ a | src : String }",
                    },
                    {
                      name: "msg",
                      type: "msg",
                    },
                    {
                      name: "model",
                      type: "{ a | src : String }",
                    },
                  ],
                  variants: [
                    {
                      name: "Page",
                      args: [
                        "{ toKey : Maybe (params -> String), init : params -> shared -> Maybe model -> App.Engine.Page.Init msg model, update : shared -> msg -> model -> ( model, App.Effect.Effect msg ), subscriptions : shared -> model -> App.Sub.Sub msg, view : App.View.Id.Id -> shared -> model -> Result App.PageError.Error (App.View.View msg) }",
                      ],
                    },
                  ],
                },
              },
              {
                signature: "App.Shared.Shared",
                definition: {
                  type: "alias",
                  comment: null,
                  module: "App.Shared",
                  name: "Shared",
                  args: [],
                  signature: "{ authenticated : App.Shared.Authenticated }",
                  fields: {
                    authenticated: "App.Shared.Authenticated",
                  },
                },
              },
              {
                signature: "{ a | src : String }",
                definition: {
                  src: "String",
                },
              },
              {
                signature: "msg",
                definition: "msg",
              },
              {
                signature: "{ a | src : String }",
                definition: {
                  src: "String",
                },
              },
            ],
          },
        },
      ],
    },
  ],
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

/*


Verification:
    1. Verify all page files are in your config
    2. Verify all entries in your config are in your files
    


*/
const verifyAllPagesAreInTheConfig = (
  files: File[],
  runOptions: Options.RunOptions,
  options: any
) => {
  const missing = [];
  const presentInConfig = new Set(Object.keys(options));

  for (const elmFile of files) {
    if (!elmFile.path.endsWith(".elm")) {
      // Skip Non-elm files
      continue;
    }

    const moduleName = path
      .relative(runOptions.src, elmFile.path)
      .replace(".elm", "")
      .split(path.sep)
      .join(".");

    if (!(moduleName in options)) {
      missing.push(moduleName);
    }

    presentInConfig.delete(moduleName);
  }

  // File present, but not in config
  if (missing.length == 1) {
    throw new Error(
      `It looks like ${missing[0]} is missing from elm.generate.json`
    );
  } else if (missing.length > 1) {
    throw new Error(
      `The following page are present in your project, but missing from the config: ${missing.join(
        ", "
      )}`
    );
  }

  if (presentInConfig.size > 0) {
    throw new Error(
      `The following pages are in your elm.generate.json, but I wasn't able to find matching .elm files ${Array.from(
        presentInConfig
      ).join(", ")}`
    );
  }
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

// Call Elm Dev

const elmDevCommand = "/Users/mattgriffith/.local/bin/elm-dev";

function executeElmDevOperation(operation: string): Promise<any> {
  return new Promise((resolve, reject) => {
    ChildProcess.exec(
      `${elmDevCommand} ${operation}`,
      (error, stdout, stderr) => {
        if (error) {
          reject(`Error: ${error.message}`);
          return;
        }
        if (stderr) {
          reject(`Stderr: ${stderr}`);
          return;
        }
        try {
          const parsedOutput = JSON.parse(stdout);
          resolve(parsedOutput);
        } catch (parseError) {
          console.log(stdout);
          // @ts-ignore
          reject(`Error parsing JSON: ${parseError.message}`);
        }
      }
    );
  });
}
