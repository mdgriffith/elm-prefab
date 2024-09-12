import * as app from "./app/customizable";

export type File = {
  moduleName: string,
  path: string,
  contents: string
}

export const all = [
  { plugin: "app", all: app.all },
];