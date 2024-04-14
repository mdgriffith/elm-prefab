import Chalk from "chalk";
import * as Options from "./options";
import * as fs from "fs";
import { z } from "zod";

export type Plugin = "app" | "theme" | "docs" | "routes" | "assets" | "graphql";

export type Args =
  | { kind: "run"; plugins: Plugin[] }
  | { kind: "help"; message: string }
  | { kind: "error"; message: string }
  | { kind: "version" };

export const read = (argsRaw: string[]): Args => {
  const args: string[] = argsRaw.slice(2);

  if (args[0] === "--help" && args.length == 1) {
    return { kind: "help", message: help };
  } else if (args[0] === "--version" && args.length == 1) {
    return { kind: "version" };
  } else {
    const plugins: Plugin[] = [];
    for (const arg of args) {
      if (
        arg === "app" ||
        arg === "theme" ||
        arg === "docs" ||
        arg === "assets" ||
        arg === "graphql"
      ) {
        plugins.push(arg);
      } else {
        return { kind: "error", message: unknownArgument(arg) };
      }
    }

    return { kind: "run", plugins: plugins };
  }
};

const unknownArgument = (arg: string): string => {
  return `
    I don't recognize this argument: ${Chalk.yellow(arg)}
`;
};

const help: string = `
Welcome to ✨${Chalk.yellow("Elm Prefab")}✨!

Elm Prefab is a code generator for Elm. It helps you scaffold out your Elm project by generating and maintaing boilerplate code for you.

Run elm-prefab by itself to get started.

If you want to install a specific plugin, try the following: 

    elm-prefab ${Chalk.green("app")} ........... App scaffolding
    elm-prefab ${Chalk.green("assets")} ........ Read Markdown and other assets
    elm-prefab ${Chalk.green("docs")} .......... A Docs site for your app
    elm-prefab ${Chalk.green("graphql")} ....... GraphQL 
    elm-prefab ${Chalk.green("theme")} ......... Elm UI Theme

Each one will add a value to ${Chalk.yellow("elm.generate.json")}.

Then, when you run ${Chalk.yellow("elm-prefab")}, files wil be generated!

Read more at (https://github.com/mdgriffith/elm-prefab)

`;

const examples: Options.Config = {
  src: "src",
  js: "src-js",
  app: {
    pages: {
      Home: Options.toUrl("/"),
    },
  },
  assets: { Assets: { src: "./public", onServer: "assets" } },
  graphql: {
    schema: "$GRAPHQL_SCHEMA",
    header: ["Authorization: bearer $GRAPHQL_API_TOKEN"],
  },
  theme: {
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
    },
    palettes: {
      default: { background: "white", text: "grey900" },
      card: {
        background: "white",
        text: "grey900",
        border: "grey200",
        hover: {
          border: "grey300",
          background: "grey50",
        },
      },
    },
    borders: {
      small: { rounded: 2, width: 1 },
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
        font: ["Noto Sans", "sans-serif"],
        sizes: {
          text: { size: 16 },
          bold: { size: 16, weight: 700 },
          small: { size: 10 },
        },
      },
    ],
  },
};

function getValueByPath(obj: any, path: (string | number)[]) {
  // Start with the initial object
  let current = obj;

  // Iterate over the path array
  for (const key of path) {
    // Check if the key exists in the current object/array
    if (current !== null && current !== undefined && key in current) {
      // Move to the next part of the object/array
      current = current[key];
    } else {
      // If the path is not valid, return null
      return null;
    }
  }

  // Return the found value, or null if any key was not found
  return current;
}
const quote = (s: string | number): string => {
  if (typeof s === "string") {
    return `"${s}"`;
  } else {
    return s.toString();
  }
};

const jsonPathToString = (path: (string | number)[]): string => {
  return path.map((p) => Chalk.yellow(quote(p))).join(".");
};

const renderExample = (path: (string | number)[]): string => {
  const example = getValueByPath(examples, path);
  if (example === null) {
    return "";
  }

  return ` Here's an example of what I'm expecting at ${jsonPathToString(
    path
  )}:\n${JSON.stringify(example, null, 2)}`;
};

const formatError = (issue: z.ZodIssue, issueDescription: string): string => {
  return `${issueDescription} at ${jsonPathToString(issue.path)}${errorFollowup(
    issue
  )}`;
};

const reportIssue = (issue: z.ZodIssue): string => {
  return formatError(issue, errorDescription(issue));
};

const errorFollowup = (issue: z.ZodIssue): string => {
  switch (issue.code) {
    case z.ZodIssueCode.unrecognized_keys:
      return ". Maybe it's in the wrong place or needs to be removed?";

    case z.ZodIssueCode.invalid_type:
      let followup = "";
      if (issue.message == "Required") {
        followup = ", but a value is required.";
      }
      return followup + renderExample(issue.path);
    default:
      return ". " + renderExample(issue.path);
  }
};

const errorDescription = (issue: z.ZodIssue): string => {
  switch (issue.code) {
    case z.ZodIssueCode.invalid_type:
      return `I found ${issue.received}`;

    case z.ZodIssueCode.custom:
      return issue.message;

    case z.ZodIssueCode.invalid_union:
      return "I don't recognize this";

    case z.ZodIssueCode.unrecognized_keys:
      if (issue.keys.length === 1) {
        return `I don't recognize the field "${Chalk.yellow(issue.keys[0])}"`;
      } else {
        return `I don't recognize the following fields: ${issue.keys
          .map(Chalk.yellow)
          .join(", ")}`;
      }

    case z.ZodIssueCode.invalid_enum_value:
      return `I was expecting one of these values: ${issue.options.join(", ")}`;

    case z.ZodIssueCode.invalid_string:
      return `I found a string that's in the wrong format(expecting ${issue.validation})`;

    case z.ZodIssueCode.invalid_date:
      return "I found an invalid date";

    case z.ZodIssueCode.too_small:
      return "I found a value that's too small";

    case z.ZodIssueCode.too_big:
      return "I found a value that's too big";

    case z.ZodIssueCode.invalid_return_type:
      return issue.code;

    case z.ZodIssueCode.not_multiple_of:
      return `I found a value that's not a multiple of ${issue.multipleOf}`;

    default:
      return issue.code;
  }
};

export const readConfig = async (
  filepath: string,
  plugins: string[]
): Promise<Options.Config | null> => {
  if (!fs.existsSync(filepath)) {
    return null;
  }
  let config = null;
  try {
    config = JSON.parse(fs.readFileSync(filepath, "utf-8"));
  } catch (e) {
    console.log(`Elm Prefab
 
    I tried to read your ${Chalk.yellow(
      "elm.generate.json"
    )} file doesn't look like valid JSON.
`);
    process.exit(1);
  }

  config = Options.Config.safeParse(config);

  if (config.success) {
    return config.data;
  } else {
    let issueCount = "an issue";
    if (config.error.issues.length > 1) {
      issueCount = "a few issues";
    }

    let message = `I tried to read your ${Chalk.yellow(
      "elm.generate.json"
    )} file but found ${issueCount}.

`;
    for (const issue of config.error.issues) {
      message = message + reportIssue(issue) + "\n\n";
    }
    console.log(message);
    process.exit(1);
  }
};
