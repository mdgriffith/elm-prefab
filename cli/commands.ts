import Chalk from "chalk";
import * as Inquire from "@inquirer/prompts";
import * as Customizable from "./templates/allCustomizables";

export type Command =
  | { kind: "init" }
  | { kind: "generate" }
  | { kind: "add"; added: Addable; name: string }
  | { kind: "add-page"; name: string; url: string }
  | { kind: "add-graphql"; nameSpace: string }
  | { kind: "customize"; customizable: Customizable.File };

export enum Addable {
  Page = "page",
  GraphQL = "graphql",
  Resource = "resource",
  Effect = "effect",
  Listener = "listener",
}

interface Option<T> {
  value: T;
  name: string;
  description: string;
}

// prettier-ignore
const addableOptions: Option<Addable>[] = [
  { value: Addable.Page, name: 'Page', description: 'Add a new page to your Elm app' },
  { value: Addable.Resource, name: 'Resource', description: 'Add a new resource' },
  { value: Addable.Effect, name: 'Effect', description: 'Add a new effect' },
  { value: Addable.Listener, name: 'Listener', description: 'Add a new listener' },
  { value: Addable.GraphQL, name: 'GraphQL', description: 'Add GraphQL' },
];

// // prettier-ignore
const customizableOptions: Option<Customizable.File>[] =
  Customizable.all.reduce((acc, plugin) => {
    const options = plugin.all.map((customizable) => ({
      value: customizable,
      name: customizable.moduleName,
      description: "",
    }));
    return acc.concat(options);
  }, [] as Option<Customizable.File>[]);

async function promptForOption<T>(
  options: Option<T>[],
  message: string,
): Promise<T> {
  return Inquire.select({
    message: message + ` (${Chalk.grey("Use arrow keys for selection")}):\n`,
    loop: false,
    pageSize: 16,
    theme: { helpMode: "never", style: { answer: Chalk.cyan } },
    choices: options.map((option) => {
      return {
        name: `    ${Chalk.yellow(option.name)}`,
        value: option.value,
        description: option.description,
      };
    }),
  });
}

async function handleAdd(addable?: string, name?: string): Promise<Command> {
  let selectedAddable: Addable;
  if (!addable) {
    selectedAddable = await promptForOption(
      addableOptions,
      `Add to your Elm app`,
    );
  } else {
    const foundOption = addableOptions.find(
      (option) => option.value === addable,
    );
    if (!foundOption) {
      console.error(
        `I don't recognize ${Chalk.red(addable)} as something I can add
Run ${Chalk.green("elm-prefab add")} to see the list things you can add.`,
      );
      process.exit(1);
    }
    selectedAddable = foundOption.value;
  }

  if (selectedAddable === Addable.GraphQL) {
    if (!name) {
      console.log("What's the name of this GraphQL API?");
      console.log(
        Chalk.grey("(e.g. Github if you're adding the GitHub GraphQL API)"),
      );
      name = await Inquire.input({
        message: "Name:",
        default: "Api",
        validate: (value) => {
          const trimmed = value.trim();
          if (trimmed === "") {
            return "GraphQL name cannot be empty";
          } else if (trimmed.charAt(0) !== value.charAt(0).toUpperCase()) {
            return "GraphQL name must be capitalized (e.g. GitHub or Api)";
          } else if (!/^[a-zA-Z]/.test(trimmed)) {
            return "GraphQL name must start with an alphabetic character";
          }
          return true;
        },
      });
    }
    return { kind: "add-graphql", nameSpace: name };
  }

  if (!name) {
    name = await Inquire.input({
      message: "Name:",
      validate: (value) => {
        const trimmed = value.trim();
        if (trimmed === "") {
          return "Page name cannot be empty";
          // Page must be capitalized
        } else if (trimmed.charAt(0) !== value.charAt(0).toUpperCase()) {
          return "Page name must be capitalized (e.g. Posts or Dashboard)";
          // Page must start with a aphabetic character
        } else if (!/^[a-zA-Z]/.test(trimmed)) {
          return "Page name must start with an alphabetic character";
        }
        return true;
      },
    });
  }

  if (selectedAddable === Addable.Page) {
    let url = await Inquire.input({
      message: `URL${Chalk.grey("(default:")}${Chalk.grey(decapitalize(name))}${Chalk.grey(")")}:`,
    });
    if (url.trim() == "") {
      url = decapitalize(name);
    }
    return { kind: "add-page", name, url };
  }
  return { kind: "add", added: selectedAddable, name };
}

const decapitalize = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

async function handleCustomize(customizable?: string): Promise<Command> {
  let selectedCustomizable: Customizable.File;
  if (!customizable) {
    selectedCustomizable = await promptForOption(
      customizableOptions,
      "Move an elm-prefab-controlled file into your project",
    );
  } else {
    const foundOption = customizableOptions.find(
      (option) => option.name === customizable,
    );
    if (!foundOption) {
      console.error(
        `I don't recognize ${Chalk.red(customizable)} as something I can customize
Run ${Chalk.green("elm-prefab customize")} to see the list of customizable files.`,
      );
      process.exit(1);
    }
    selectedCustomizable = foundOption.value;
  }
  return { kind: "customize", customizable: selectedCustomizable };
}

const exampleCommands: string = `
  elm-prefab ${Chalk.green("init")} ................ create a new project
  elm-prefab ${Chalk.green("generate")}.................... generate code

 Add to your Elm app:

  elm-prefab ${Chalk.green("add")} ${Chalk.grey("(interactive)")}
  elm-prefab ${Chalk.green("add page <name> <url>")} ..... add a new page
  elm-prefab ${Chalk.green("add resource <name>")} ... add a new resource
  elm-prefab ${Chalk.green("add effect <name>")} ....... add a new effect
  elm-prefab ${Chalk.green("add graphql")} .................. add GraphQL

 Move an elm-prefab-controlled file into your project.

  elm-prefab ${Chalk.green("customize")} ${Chalk.grey("(interactive)")}
  elm-prefab ${Chalk.green("customize <module-name>")}
`;

const help: string = `
Welcome to ✨${Chalk.yellow("Elm Prefab")}✨!
${exampleCommands}
Read more at ${Chalk.yellow("https://github.com/mdgriffith/elm-prefab")}`;

function printVersion(): void {
  console.log("1.0.0");
}

export async function read(argv: string[]): Promise<Command> {
  const args = argv.slice(2);

  if (args.length === 0 || args[0] === "--help") {
    console.log(help);
    process.exit(0);
  }

  if (args[0] === "--version") {
    printVersion();
    process.exit(1);
  }

  const command = args[0];
  const argument = args[1];
  const name = args[2];

  switch (command) {
    case "init":
      return { kind: "init" };
    case "generate":
      return { kind: "generate" };
    case "add":
      return await handleAdd(argument, name);
    case "customize":
      return await handleCustomize(argument);
    default:
      console.error(
        Chalk.red(`I don't recognize this command': ${Chalk.yellow(command)}`),
      );
      console.log("Here is a list of commands you can use:");
      console.log(exampleCommands);
      process.exit(1);
  }
}
