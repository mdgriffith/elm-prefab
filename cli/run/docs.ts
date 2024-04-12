import * as Options from "../options";
import * as Generator from "./run_generator";
import * as ElmDev from "../elm_dev";
import * as Static from "../templates/docs/copyAll";
import * as fs from "fs";
import * as path from "path";
import * as App from "./app";
import * as Theme from "./theme";

const defaultDocsElmJson = {
  type: "application",
  "source-directories": [
    "src",
    ".elm-prefab",
    "/Users/mattgriffith/projects/mdgriffith/elm-ui/src",
  ],
  "elm-version": "0.19.1",
  dependencies: {
    direct: {
      "dillonkearns/elm-markdown": "7.0.1",
      "avh4/elm-color": "1.0.0",
      "mdgriffith/elm-bezier": "1.0.0",
      "elm/browser": "1.0.2",
      "elm/bytes": "1.0.8",
      "elm/core": "1.0.5",
      "elm/file": "1.0.5",
      "elm/html": "1.0.0",
      "elm/virtual-dom": "1.0.3",
      "elm/http": "2.0.0",
      "elm/json": "1.1.3",
      "elm/project-metadata-utils": "1.0.2",
      "elm/random": "1.0.0",
      "elm/time": "1.0.0",
      "elm/url": "1.0.0",
      "lydell/elm-app-url": "1.0.3",
    },
    indirect: {
      "elm/parser": "1.1.0",
      "elm/regex": "1.0.0",
      "rtfeldman/elm-hex": "1.0.0",
    },
  },
  "test-dependencies": {
    direct: {},
    indirect: {},
  },
};

export const generator = (options: Options.Config): Options.Generator => {
  return {
    name: "docs",
    generatorType: Options.GeneratorType.Standard,
    run: async (runOptions: Options.RunOptions) => {
      if (!options.docs) {
        return { generated: [] };
      }
      const modules = options.docs ? options.docs.modules : [];

      // Retrieve the docs for all modules we want examples for.

      // console.log(docs);
      let elmJson: any = null;
      try {
        elmJson = JSON.parse(
          fs.readFileSync(path.join(runOptions.root, "elm.json"), "utf-8")
        );
      } catch (e) {
        elmJson = defaultDocsElmJson;
      }
      console.log("Getting dependency docs");
      const depDocs = await getDepDocs(elmJson.dependencies.direct);

      const docs = [];

      for (const mod of modules) {
        const moduleDocs = await ElmDev.execute(`docs ${mod}`);
        docs.push(moduleDocs);
      }

      let readme = null;
      try {
        readme = fs.readFileSync(
          path.join(runOptions.root, "README.md"),
          "utf-8"
        );
      } catch (e) {}

      const docsSrc: string = options.docs.src ? options.docs.src : "docs";
      console.log("Reading guides");
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

      console.log("Running app generator");
      const subsummary = await runAppGenerator(runOptions, docsSrc);

      const finalOptions = {
        // output: options.output ? options.output : "docs",
        // project: docs,
        // viewers: [],
        readme: readme,
        project: elmJson,
        modules: docs,
        guides: guides,
        deps: depDocs,
        theme: options.theme,
      };

      console.log("Running docs generator");
      const summary = await Generator.run(path.join(docsSrc, ".elm-prefab"), {
        docs: finalOptions,
      });
      console.log("Docs", summary);

      return Options.mergeSummaries(subsummary, summary);
    },
  };
};

const getDepDocs = async (deps: any) => {
  const depDocs: any = {};
  for (const [packageName, version] of Object.entries(deps)) {
    console.log(`Getting docs for ${packageName} ${version}`);
    const docs = await ElmDev.execute(`docs ${packageName} ${version}`);
    depDocs[packageName] = docs;

    // TODO: remove
    break;
  }
  return depDocs;
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

const defaultDocsTheme = {
  colors: {
    black: "#000000",
    white: "#ffffff",
    grey: {
      "50": "#fafafa",
      "100": "#f5f5f5",
      "200": "#e5e5e5",
      "300": "#d4d4d4",
      "400": "#a3a3a3",
      "500": "#737373",
      "600": "#525252",
      "700": "#404040",
      "800": "#262626",
      "900": "#171717",
      "950": "#0a0a0a",
    },
    primary: { swatch: "#6b21a8" },
  },
  palettes: {},
  spacing: {
    zero: 0,
    sm4: 2,
    sm3: 4,
    sm2: 8,
    sm: 12,
    md: 16,
    lg: 20,
    lg1: 24,
    lg2: 32,
    lg3: 40,
    lg4: 80,
  },
  typography: [
    {
      font: [
        "Source Sans Pro",
        "Trebuchet MS",
        "Lucida Grande",
        "Bitstream Vera Sans",
        "Helvetica Neue",
        "sans-serif",
      ],
      sizes: {
        h1: { size: 48 },
        h2: { size: 32 },
        default: { size: 14 },
      },
    },
  ],
  borders: {
    small: { rounded: 2, width: 1 },
  },
};

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

  // Generate a theme
  Theme.generator(defaultDocsTheme).run(internalOptions);

  if (!fs.existsSync(path.join(docsPath, "elm.json"))) {
    ensureDirSync(docsPath);
    fs.writeFileSync(
      path.join(docsPath, "elm.json"),
      JSON.stringify(defaultDocsElmJson, null, 2)
    );
  }

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

  ensureDirSync(docsPath);
  ensureDirSync(path.join(docsPath, "src"));

  const appSummary = await App.generator({
    pages: {
      Home: Options.toUrl("/"),
      Guide: Options.toUrl("/guide/*"),
      Package: Options.toUrl("/package/*"),
      Module: Options.toUrl("/module/*"),
    },
  }).run(internalOptions);

  if (fs.existsSync(path.join(internalSrc, "Main.elm"))) {
    fs.unlinkSync(path.join(internalSrc, "Main.elm"));
  }

  return Options.mergeSummaries(summary, appSummary);
};
