import Chalk from "chalk";
import * as Inquire from "@inquirer/prompts";

export type Command =
  | { kind: "init" }
  | { kind: "generate" }
  | { kind: "add"; added: Addable; name: string }
  | { kind: "add-page"; name: string; url: string }
  | { kind: "add-graphql" }
  | { kind: "customize"; customizable: Customizable };

export enum Addable {
  Page = "page",
  GraphQL = "graphql",
  Resource = "resource",
  Effect = "effect",
  Listener = "listener",
}

export enum Customizable {
  Broadcast = "Broadcast",
  Effect = "Effect",
  EffectHttp = "Effect.Http",
  EffectFile = "Effect.File",
  EffectClipboard = "Effect.Clipboard",
  EffectRandom = "Effect.Random",
  EffectNav = "Effect.Nav",
  EffectPage = "Effect.Page",
  EffectDebounce = "Effect.Debounce",
  AppPageError = "App.Page.Error",
  AppView = "App.View",
  Listen = "Listen",
  ListenLocalStorage = "Listen.LocalStorage",
}

interface Option<T extends string> {
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
  { value: Addable.GraphQL, name: 'GraphQL', description: 'Add GraphQL integration' },
];

// prettier-ignore
const customizableOptions: Option<Customizable>[] = [
  { value: Customizable.AppView, name: 'App.View', description: 'The view type that every page returns.' },
  { value: Customizable.AppPageError, name: 'App.Page.Error', description: 'Global error states that any page can be in(e.g. Permission denied)' },
  { value: Customizable.Broadcast, name: 'Broadcast', description: 'The global message type that can be sent/subscribed to from anywhere.' },
  { value: Customizable.Effect, name: 'Effect', description: 'The root Effect module.' },
  { value: Customizable.EffectHttp, name: 'Effect.Http', description: '' },
  { value: Customizable.EffectFile, name: 'Effect.File', description: '' },
  { value: Customizable.EffectClipboard, name: 'Effect.Clipboard', description: '' },
  { value: Customizable.EffectRandom, name: 'Effect.Random', description: '' },
  { value: Customizable.EffectNav, name: 'Effect.Nav', description: '' },
  { value: Customizable.EffectPage, name: 'Effect.Page', description: '' },
  { value: Customizable.EffectDebounce, name: 'Effect.Debounce', description: '' },

  { value: Customizable.Listen, name: 'Listen', description: 'Customize general listener' },
  { value: Customizable.ListenLocalStorage, name: 'Listen.LocalStorage', description: 'Customize local storage listener' },
];

async function promptForOption<T extends string>(
  options: Option<T>[],
  message: string,
): Promise<T> {
  const largestNameLength = Math.max(
    ...options.map((option) => option.name.length),
  );

  return Inquire.select({
    message: message + ` (${Chalk.grey("Use arrow keys for selection")}):\n`,
    loop: false,
    pageSize: 16,
    theme: { helpMode: "never", style: { answer: Chalk.cyan } },
    choices: options.map((option) => {
      const spacer =
        " " +
        Chalk.grey(".".repeat(largestNameLength - option.name.length + 5)) +
        " ";
      return {
        // name: `    ${Chalk.yellow(option.name)}${spacer}${option.description}`,
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
      console.error(Chalk.red(`Invalid addable option: ${addable}`));
      process.exit(1);
    }
    selectedAddable = foundOption.value;
  }

  if (selectedAddable === Addable.GraphQL) {
    return { kind: "add-graphql" };
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
  let selectedCustomizable: Customizable;
  if (!customizable) {
    selectedCustomizable = await promptForOption(
      customizableOptions,
      "Move an elm-prefab-controlled file into your project",
    );
  } else {
    const foundOption = customizableOptions.find(
      (option) => option.value === customizable,
    );
    if (!foundOption) {
      console.error(Chalk.red(`Invalid customizable option: ${customizable}`));
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
