
import * as path from "path";
import * as fs from "fs";
import * as Options from "../../options";

export const copyTo = (baseDir: string, overwrite: boolean, skip: boolean, summary: Options.Summary) => { 
  
  if (overwrite || (!fs.existsSync(path.join(baseDir, "/js/clipboard.ts")) && !skip)) {
    const filepath = path.join(baseDir, "/js/clipboard.ts");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "export function copy(text: string) {\n  const clipboard = navigator.clipboard;\n  if (!clipboard) {\n    return;\n  }\n  clipboard.writeText(text);\n}\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || (!fs.existsSync(path.join(baseDir, "/js/localStorage.ts")) && !skip)) {
    const filepath = path.join(baseDir, "/js/localStorage.ts");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "export const getAll = () => {\n  const data: any = {};\n  for (var i = 0, len = localStorage.length; i < len; ++i) {\n    const key = localStorage.key(i);\n    if (key) {\n      data[key] = get(key);\n    }\n  }\n  return data;\n};\n\nexport const get = (key: string): any => {\n  const item = localStorage.getItem(key);\n  if (item) {\n    try {\n      return JSON.parse(item);\n    } catch (e) {\n      return null;\n    }\n  } else {\n    return null;\n  }\n};\n\nexport const set = (key: string, value: any) => {\n  localStorage.setItem(key, JSON.stringify(value));\n};\n\nexport const clear = (key: string) => {\n  localStorage.removeItem(key);\n};\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || (!fs.existsSync(path.join(baseDir, "/index.html")) && !skip)) {
    const filepath = path.join(baseDir, "/index.html");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "<html>\n  <head>\n    <meta charset=\"UTF-8\" />\n    <title>My Elm App</title>\n    <!--  -->\n    <script type=\"module\" src=\"/main.ts\"></script>\n  </head>\n  <body></body>\n</html>\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || (!fs.existsSync(path.join(baseDir, "/main.ts")) && !skip)) {
    const filepath = path.join(baseDir, "/main.ts");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "// @ts-ignore\nimport { Elm } from \"./app/Main.elm\";\nimport * as Clipboard from \"./js/clipboard\";\nimport * as LocalStorage from \"./js/localStorage\";\n\n// Boot up the Elm App\nconst app = Elm.Main.init({\n  flags: { now: Date.now(), localStorage: LocalStorage.getAll() },\n});\n\n// Handling data from elm to JS\napp.ports?.outgoing?.subscribe?.((message: any) => {\n  switch (message.tag) {\n    case \"local-storage\":\n      LocalStorage.set(message.details.key, message.details.value);\n      if (app.ports?.localStorageUpdated) {\n        app.ports.localStorageUpdated.send(message.details);\n      }\n\n      break;\n\n    case \"local-storage-clear\":\n      LocalStorage.clear(message.details.key);\n      break;\n\n    case \"copy-to-clipboard\":\n      Clipboard.copy(message.details.text);\n      break;\n\n    default:\n      break;\n  }\n});\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }
}
