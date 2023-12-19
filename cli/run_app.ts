import * as Generator from "./run_generator";
import * as AppEngine from "./templates/app/engine";
import * as AppToCopy from "./templates/app/toCopy";
import * as Options from "./options";
import * as ChildProcess from "child_process";

const AppGenerator = require("./generators/app");
const AppView = require("./generators/app-view");

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
      const viewRegions = await executeElmDevOperation(
        "explain App.View.Regions"
      );

      await Generator.run(AppView.Elm.GenerateView, runOptions.internalSrc, {
        regions: JSON.parse(viewRegions),
      });
      // console.log("Generated view regions");

      // const pages = await executeElmDevOperation(
      //   "usage type App.Engine.Page.Page"
      // );
      // console.log("Found usage", pages);
      const pages = JSON.stringify(placeholderPageUsages);
      await Generator.run(AppGenerator.Elm.Generate, runOptions.internalSrc, {
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

export type File = { path: string; contents: string };

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
