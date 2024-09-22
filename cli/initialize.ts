import Chalk from "chalk";
import * as Inquire from "@inquirer/prompts";
import * as Options from "./options";
import * as ChildProcess from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as OneOffGraphQLEffect from "./templates/graphql/oneOff/Effect.elm";
import * as OneOffPage from "./templates/app/oneOff/Page.elm";

const testTheme: Options.ThemeOptions = {
  colors: {
    white: "#ffffff",
    greyscale: {
      "900": "#121214",
      "800": "#27272F",
      "700": "#53535F",
      "600": "#72727E",
      "500": "#B1B1B8",
      "400": "#CECED6",
      "300": "#E5E5EA",
      "200": "#F3F4F6",
      "100": "#FAFAFC",
    },
    primary: {
      "700": "#3B2D96",
      "600": "#4530CC",
      "500": "#6049F5",
      "400": "#BBB1FC",
      "300": "#E6E3FC",
      "200": "#F8F5FF",
    },
    red: {
      "700": "#990A00",
      "600": "#CC0E00",
      "500": "#E22C1E",
      "400": "#FFB8B3",
      "300": "#FFE9E8",
      "200": "#FEF4F3",
    },
    yellow: {
      text: "#8A6500",
      "700": "#DBA100",
      "600": "#FEBA00",
      "500": "#FFC700",
      "400": "#FFECA7",
      "300": "#FEF7DE",
      "200": "#FFFCF0",
    },
    green: {
      active: "#104F23",
      "600": "#197835",
      "500": "#1C883C",
      "400": "#C0F1CD",
      "300": "#D9FFE3",
      "200": "#F5FDF7",
    },
    blue: {
      "700": "#044879",
      "600": "#0075C8",
      "500": "#0095FF",
      "400": "#8ACEFF",
      "300": "#DBF1FF",
      "200": "#F0F9FF",
    },
    gradients: {
      askAI: "linear-gradient(99.32deg, #BBB1FC 3.63%, #8ACEFF 96.46%)",
      chatBubble: "linear-gradient(90deg, #F8F5FF -14.72%, #F0F9FF 110.73%)",
      chartFill:
        "linear-gradient(180deg, rgba(230, 227, 252, 0.8) 0%, rgba(230, 227, 252, 0) 100%)",
      chartPurpleHover: "linear-gradient(180deg, #6049F5 100%, #CA92E4 0%)",
      chartPurpleStroke: "linear-gradient(180deg, #6049F5 0%, #CA92E4 100%)",
      chartBlueFill:
        "linear-gradient(180deg, rgba(230, 227, 252, 0.8) 0%, rgba(230, 227, 252, 0) 100%)",
      chartBlueHover: "linear-gradient(180deg, #B3D7F8 0%, #0095FF 100%)",
      chartBlueStroke: "linear-gradient(180deg, #0095FF 0%, #B3D7F8 100%)",
      iconHighlighted:
        "linear-gradient(136.22deg, #998AF8 14.58%, #6049F5 86.92%)",
    },
  },
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
      font: ["Lato", "Roboto", "sans-serif"],
      sizes: {
        h1: { size: 24, weight: 900 },
        h2: { size: 18, weight: 900 },
        h3: { size: 16, weight: 700 },
        h4: { size: 12, weight: 700, variant: ["small-caps"] },
        large: { size: 20, weights: [400, 700] },
        medium: { size: 16, weights: [400, 700] },
        default: { size: 14, weights: [400, 700] },
        small: { size: 12, weights: [400, 700] },
        xSmall: { size: 10, weights: [400, 700], variant: ["small-caps"] },
      },
    },
  ],
  borders: {
    radius: { small: 4, medium: 8, large: 16 },
    width: { small: 1 },
  },
};

const defaultTheme: Options.ThemeOptions = {
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
    purple: {
      alias: "primary",
      50: "#faf5ff",
      100: "#f3e8ff",
      200: "#e9d5ff",
      300: "#d8b4fe",
      400: "#c084fc",
      500: "#a855f7",
      600: "#9333ea",
      700: "#7e22ce",
      800: "#6b21a8",
      900: "#581c87",
      950: "#3b0764",
    },
  },
  themes: {
    default: {
      text: "800",
      background: "50",
      border: "400",
    },
  },
  borders: {
    radius: { small: 4, medium: 8, large: 16 },
    width: { small: 1 },
  },
  spacing: {
    zero: 0,
    xxSmall: 2,
    xSmall: 4,
    small: 8,
    medium: 16,
    large: 32,
    xLarge: 64,
  },
  typography: [
    {
      font: ["EB Garamond", "serif"],
      sizes: {
        h1: { size: 28 },
        h2: { size: 24 },
        h3: { size: 20 },
        huge: { size: 120 },
      },
    },
    {
      font: ["Noto Sans", "sans-serif"],
      sizes: {
        text: { size: 16, weights: [400, 700] },
        small: { size: 10 },
      },
    },
  ],
};

export const defaultGraphQL = {
  schema: "$GRAPHQL_SCHEMA",
  header: ["Authorization: bearer $GRAPHQL_API_TOKEN"],
};

export const start = async (): Promise<Options.Config> => {
  console.log(
    `It looks like you're starting a new ${Chalk.yellow("Elm Prefab")} project!\n`,
  );

  const shouldGenerate = await Inquire.confirm({
    message: "Want me to set up an Elm Prefab project for you?",
  });

  if (!shouldGenerate) {
    console.log("Okay, see ya around! 👋");
    process.exit(0);
  }

  const allPackageManagerOptions = Object.entries(Options.PackageManager).map(
    ([key, value]) => ({
      name: value,
      value: value,
    }),
  );

  const packageManager = await Inquire.select({
    message: "Select a package manager",
    choices: allPackageManagerOptions,
  });

  const config: Options.Config = {
    packageManager,
    src: "src/app",
    js: "src",
    app: {
      pages: {
        Home: Options.toUrl("/"),
      },
    },
    assets: { Assets: { src: "./public", onServer: "assets" } },
  };

  Options.writeConfig(".", config);

  let initialized = readPackageJsonOrInitialize();
  console.log("Installing dependencies...");
  addDependencies(
    config.packageManager,
    initialized.pkg,
    [
      { name: "vite" },
      { name: "vite-plugin-elm" },
      { name: "typescript" },
      { name: "elm" },
      { name: "elm-dev" },
      { name: "elm-prefab" },
    ],
    {
      dev: true,
    },
  );

  return config;
};

/* New Page */

const pageAdded = (pagename: string) => {
  return `Added ${Chalk.yellow(pagename)}!`;
};

export const page = async (
  name: string,
  url: string,
  config: Options.Config,
) => {
  const pageContent = OneOffPage.toBody(
    new Map([
      ["{{name}}", name],
      ["{{name_underscored}}", name.replace(".", "_")],
    ]),
  );
  fs.writeFileSync(path.join(config.src, `${name}.elm`), pageContent, "utf8");

  if (!config.app) {
    let pages: any = {};
    pages[name] = { url };
    config.app = { pages };
  } else {
    // @ts-ignore
    config.app.pages[command.name] = Options.toUrl(command.url);
  }
  Options.writeConfig(".", config);
  console.log(pageAdded(name));
  process.exit(0);
};

/*

New Docs Site */
export const docs = async (
  dir: string,
  config: Options.Config,
): Promise<Options.Config> => {
  if (fs.existsSync(dir)) {
    console.log(`${Chalk.yellow(dir)} already exists!
Choose a name that doesn't already exist in the repo to create a new docs site.`);
    process.exit(1);
  }

  // Create the docs dir
  fs.mkdirSync(dir, { recursive: true });

  const docsConfig: Options.Config = {
    packageManager: config.packageManager,
    src: "src/app",
    js: "src",
    app: {
      pages: {
        Home: Options.toUrl("/"),
        Guide: Options.toUrl("/guide/*"),
        Module: Options.toUrl("/module/*"),
        Package: Options.toUrl("/package/*"),
      },
    },
    docs: {
      src: "..",
      modules: [],
    },
  };
  Options.writeConfig(dir, docsConfig);

  // Add elm.json
  fs.writeFileSync(
    path.join(dir, "elm.json"),
    JSON.stringify(
      {
        type: "application",
        "source-directories": [
          "src/app",
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
      },
      null,
      2,
    ),
  );

  // Add docs package.json
  let initialized = readPackageJsonOrInitialize(dir);
  console.log("Installing dependencies...");
  addDependencies(
    config.packageManager,
    initialized.pkg,
    [
      { name: "vite" },
      { name: "vite-plugin-elm" },
      { name: "typescript" },
      { name: "elm" },
      { name: "elm-dev" },
      { name: "elm-prefab" },
    ],
    {
      dev: true,
      cwd: dir,
    },
  );

  // Add the 'passthrough' docs command to the package.json
  //  "docs": "sh -c 'cd docs && bun run \"$@\"' --"
  if (fs.existsSync("package.json")) {
    const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
    if (!pkg.scripts) {
      pkg.scripts = {};
    }
    if (
      !pkg.scripts.docs &&
      config.packageManager !== Options.PackageManager.Manual
    ) {
      pkg.scripts.docs = `sh -c 'cd docs && ${config.packageManager} run "$@"' --`;
      fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2), "utf8");
    }
  }

  return docsConfig;
};

/* GRAPHQL */

const graphqlAdded = `
I've added GraphQL to ${Chalk.yellow("elm.generate.json")}
Add the following to your environment and run ${Chalk.yellow("elm-prefab")} again!

${Chalk.cyan("$GRAPHQL_SCHEMA")}
  The HTTP endpoint for the GraphQL schema,
  or the path to a local schema file in JSON format.
${Chalk.cyan("$GRAPHQL_API_TOKEN")}
  The API token needed for querying for the schema.
`;

export const graphql = async (namespace: string, config: Options.Config) => {
  config.graphql = defaultGraphQL;
  config.graphql.namespace = namespace;
  Options.writeConfig(".", config);
  const gqlEffectPath = path.join(config.src, "Effect", `${namespace}.elm`);
  fs.mkdirSync(path.dirname(gqlEffectPath), { recursive: true });
  const gqlEffectFile = OneOffGraphQLEffect.toBody(
    new Map([["{{name}}", namespace]]),
  );
  fs.writeFileSync(gqlEffectPath, gqlEffectFile, "utf8");

  let initialized = readPackageJsonOrInitialize();
  addDependencies(
    config.packageManager,
    initialized.pkg,
    [{ name: "elm-gql" }],
    {
      dev: true,
    },
  );

  console.log(graphqlAdded);
};

interface DependencyOptions {
  dev?: boolean;
  cwd?: string;
}

function addDependencies(
  packageManager: Options.PackageManager,
  packageJson: PackageJson,
  packages: { name: string; version?: string }[],
  options: DependencyOptions = {},
) {
  const { dev = false } = options;

  if (!isPackageManagerInstalled(packageManager)) {
    console.log(
      `I tried to call ${Chalk.yellow(packageManager)} but it doesn't seem to be installed.`,
    );
    process.exit(1);
  }

  // Filter out packages that are already installed
  const packagesToInstall = packages.filter((pkg) => {
    return !isPackageInstalled(packageJson, dev, pkg.name);
  });

  if (packagesToInstall.length === 0) {
    return;
  }

  if (packageManager === Options.PackageManager.Manual) {
    console.log(
      `Add ${Chalk.yellow(
        packagesToInstall.map((pkg) => pkg.name).join(", "),
      )} to your ${dev ? "dev " : " "}dependencies.`,
    );
    return;
  }

  // Build package names with their versions
  const packagesWithVersion = packagesToInstall.map((pkg) =>
    pkg.version ? `${pkg.name}@${pkg.version}` : pkg.name,
  );

  let command: string;

  switch (packageManager) {
    case Options.PackageManager.NPM:
      command = `npm install ${dev ? "--save-dev" : ""} ${packagesWithVersion.join(
        " ",
      )}`;
      break;
    case Options.PackageManager.PNPM:
      command = `pnpm add ${dev ? "--save-dev" : ""} ${packagesWithVersion.join(
        " ",
      )}`;
      break;
    case Options.PackageManager.BUN:
      command = `bun add ${dev ? "--dev" : ""} ${packagesWithVersion.join(" ")}`;
      break;
    case Options.PackageManager.YARN:
      command = `yarn add ${dev ? "--dev" : ""} ${packagesWithVersion.join(" ")}`;
      break;
    case Options.PackageManager.Manual:
      return;
    default:
      throw new Error("Unsupported package manager");
  }

  try {
    const { stdout, stderr } = ChildProcess.spawnSync(command, {
      shell: true,
      cwd: options.cwd ?? undefined,
    });
    if (stderr && stderr.length > 0) {
      console.error(stderr.toString());
    }
  } catch (error) {
    console.error(`Error adding ${packagesWithVersion.join(", ")}:`, error);
    throw error;
  }
}

interface PackageJson {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

function readPackageJsonOrInitialize(directory: string = process.cwd()): {
  pkg: PackageJson;
  fileCreated: boolean;
} {
  const packageJson = readPackageJson(directory);
  if (packageJson == null) {
    const contents = JSON.stringify(
      {
        name: "placeholder",
        type: "module",
        version: "0.1.0",
        scripts: {
          dev: "vite",
          build: "vite build",
        },
      },
      undefined,
      2,
    );
    fs.writeFileSync("package.json", contents, "utf-8");
    return {
      pkg: { dependencies: {}, devDependencies: {} },
      fileCreated: true,
    };
  }
  return { pkg: packageJson, fileCreated: false };
}

function readPackageJson(
  directory: string = process.cwd(),
): PackageJson | null {
  const packageJsonPath = path.join(directory, "package.json");
  try {
    const packageJsonContent = fs.readFileSync(packageJsonPath, "utf-8");
    return JSON.parse(packageJsonContent);
  } catch (error) {
    return null;
  }
}

function isPackageInstalled(
  packageJson: PackageJson,
  isDev: boolean,
  packageName: string,
): boolean {
  if (isDev) {
    return packageJson.devDependencies?.hasOwnProperty(packageName) ?? false;
  } else {
    return packageJson.dependencies?.hasOwnProperty(packageName) ?? false;
  }
}

function isPackageManagerInstalled(
  packageManager: Options.PackageManager,
): boolean {
  let command: string;
  let args: string[];

  switch (packageManager) {
    case Options.PackageManager.NPM:
      command = "npm";
      args = ["--version"];
      break;
    case Options.PackageManager.PNPM:
      command = "pnpm";
      args = ["--version"];
      break;
    case Options.PackageManager.BUN:
      command = "bun";
      args = ["--version"];
      break;
    case Options.PackageManager.YARN:
      command = "yarn";
      args = ["--version"];
      break;
    case Options.PackageManager.Manual:
      return true;
    default:
      return false;
  }

  try {
    const result = ChildProcess.spawnSync(command, args, { stdio: "ignore" });
    return result.status === 0;
  } catch (error) {
    return false;
  }
}
