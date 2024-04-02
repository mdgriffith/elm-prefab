import * as Options from "../options";
import * as Generator from "./run_generator";
import * as ElmDev from "../elm_dev";
import * as Static from "../templates/docs/copyAll";
import * as fs from "fs";
import * as path from "path";
import * as App from "./app";
import * as Route from "./routes";

export const generator = (options: any): Options.Generator => {
  return {
    name: "docs",
    generatorType: Options.GeneratorType.Standard,
    run: async (runOptions: Options.RunOptions) => {
      const modules = options.modules;

      // Retrieve the docs for all modules we want examples for.
      // const docs = await ElmDev.execute(`docs ${modules}`);
      // console.log(docs);
      let elmJson: any = null;
      try {
        elmJson = JSON.parse(
          fs.readFileSync(path.join(runOptions.root, "elm.json"), "utf-8")
        );
      } catch (e) {
        elmJson = {
          type: "application",
          "source-directories": ["src", ".elm-prefab"],
          "elm-version": "0.19.1",
          dependencies: {
            direct: {
              "dillonkearns/elm-markdown": "7.0.1",
              "elm/browser": "1.0.2",
              "elm/bytes": "1.0.8",
              "elm/core": "1.0.5",
              "elm/file": "1.0.5",
              "elm/html": "1.0.0",
              "elm/http": "2.0.0",
              "elm/json": "1.1.3",
              "elm/random": "1.0.0",
              "elm/time": "1.0.0",
              "elm/url": "1.0.0",
              "lydell/elm-app-url": "1.0.3",
            },
            indirect: {
              "elm/parser": "1.1.0",
              "elm/regex": "1.0.0",
              "elm/virtual-dom": "1.0.3",
              "rtfeldman/elm-hex": "1.0.0",
            },
          },
          "test-dependencies": {
            direct: {},
            indirect: {},
          },
        };
      }

      let readme = null;
      try {
        readme = fs.readFileSync(
          path.join(runOptions.root, "README.md"),
          "utf-8"
        );
      } catch (e) {}

      const docsSrc: string = options.src ? options.src : "docs";

      const guides = [];
      if (fs.existsSync(path.join(docsSrc, "guides"))) {
        const guideFiles = fs.readdirSync(path.join(docsSrc, "guides"));
        for (const guideFile of guideFiles) {
          const guide = fs.readFileSync(path.join(docsSrc, guideFile), "utf-8");
          guides.push({
            name: guideFile,
            content: guide,
          });
        }
      }

      const subsummary = await runAppGenerator(runOptions, docsSrc);

      const finalOptions = {
        // output: options.output ? options.output : "docs",
        // project: docs,
        // viewers: [],
        readme: readme,
        project: elmJson,
        modules: testDocs,
        guides: guides,
        deps: {},
      };

      const summary = await Generator.run(path.join(docsSrc, ".elm-prefab"), {
        docs: finalOptions,
      });

      return Options.mergeSummaries(subsummary, summary);
    },
  };
};

const testDocs = [
  {
    name: "Ui.Button",
    comment:
      "\n\n@docs Button\n\n@docs init, withEnabled, withSmall, withSecondary\n\n@docs view\n\n",
    unions: [{ name: "Button", comment: " ", args: ["msg"], cases: [] }],
    aliases: [],
    values: [
      {
        name: "init",
        comment: " ",
        type: "{ text : String.String, onClick : msg } -> Ui.Button.Button msg",
      },
      {
        name: "view",
        comment: " ",
        type: "Ui.Button.Button msg -> Element.Element msg",
      },
      {
        name: "withEnabled",
        comment: " ",
        type: "Basics.Bool -> Ui.Button.Button msg -> Ui.Button.Button msg",
      },
      {
        name: "withSecondary",
        comment: " ",
        type: "Ui.Button.Button msg -> Ui.Button.Button msg",
      },
      {
        name: "withSmall",
        comment: " ",
        type: "Ui.Button.Button msg -> Ui.Button.Button msg",
      },
    ],
    binops: [],
  },
];

const ensureDirSync = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const runAppGenerator = async (
  runOptions: Options.RunOptions,
  docsPath: string
): Promise<Options.Summary> => {
  const summary: Options.Summary = { generated: [] };
  const internalSrc = path.join(docsPath, ".elm-prefab");
  const internalOptions = {
    initializing: true,
    generateDefaultFiles: true,
    internalSrc: internalSrc,
    js: path.join(docsPath, "src-js"),
    src: path.join(docsPath, "src"),
    root: docsPath,
  };

  Static.copy(
    {
      initializing: true,
      generateDefaultFiles: true,
      internalSrc: internalSrc,
      js: path.join(docsPath, "src-js"),
      src: path.join(docsPath, "src"),
      root: docsPath,
    },
    summary
  );

  await Route.generator({
    Home: "/",
    Guide: "/guide/*",
    Package: "/package/*",
    Module: "/module/*",
    Login: "/login",
    Logout: "/logout",
  }).run(internalOptions);

  ensureDirSync(docsPath);
  ensureDirSync(path.join(docsPath, "src"));

  const appSummary = await App.generator({}).run(internalOptions);

  if (fs.existsSync(path.join(internalSrc, "Main.elm"))) {
    fs.unlinkSync(path.join(internalSrc, "Main.elm"));
  }

  return Options.mergeSummaries(summary, appSummary);
};
