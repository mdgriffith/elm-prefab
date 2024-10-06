import * as app from "./app/customizable";
import * as theme from "./theme/customizable";

export type File = {
  moduleName: string,
  path: string,
  contents: string
}

export const all = [
  { plugin: "app", all: app.all },
  { plugin: "theme", all: theme.all },
];