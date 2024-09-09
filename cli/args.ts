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
  src: "src/app",
  js: "src",
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
