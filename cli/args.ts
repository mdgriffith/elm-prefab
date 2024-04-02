import Chalk from "chalk";

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
        arg === "routes" ||
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
Welcome to ${Chalk.yellow("Elm Prefab")}!

Elm Prefab is a code generator for Elm. It helps you scaffold out your Elm project by generating and maintaing boilerplate code for you.

Run elm-prefab by itself to get started.

If you want to install a specific plugin, try the following: 

    elm-prefab ${Chalk.green("app")} ........... App scaffolding
    elm-prefab ${Chalk.green("assets")} ........ Read Markdown and other assets
    elm-prefab ${Chalk.green("routes")} ........ Routing help
    elm-prefab ${Chalk.green("docs")} .......... A Docs site for your app
    elm-prefab ${Chalk.green("graphql")} ....... GraphQL 
    elm-prefab ${Chalk.green("theme")} ......... Elm UI Theme

Each one will add a value to ${Chalk.yellow("elm.generate.json")}.

Then, when you run ${Chalk.yellow("elm-prefab")}, files wil be generated!

Read more at (https://github.com/mdgriffith/elm-prefab)

`;
