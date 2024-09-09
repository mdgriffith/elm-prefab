import * as app from "./app/copyAll";
import * as assets from "./assets/copyAll";
import * as docs from "./docs/copyAll";
import * as theme from "./theme/copyAll";


export const all = [
  { plugin: "app", copy: app.copy },
  { plugin: "assets", copy: assets.copy },
  { plugin: "docs", copy: docs.copy },
  { plugin: "theme", copy: theme.copy },
];