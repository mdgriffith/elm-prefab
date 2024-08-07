
import * as path from "path";
import * as fs from "fs";
import * as Options from "../../options";

export const copyTo = (baseDir: string, overwrite: boolean, skip: boolean, summary: Options.Summary) => { 
  
  if (overwrite || (!fs.existsSync(path.join(baseDir, "/js/webcomponents/elm-portal.ts")) && !skip)) {
    const filepath = path.join(baseDir, "/js/webcomponents/elm-portal.ts");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "export default function include(options: { mountId: string }) {\n  Object.defineProperty(Element.prototype, \"__getParentClientRect\", {\n    get() {\n      return this.parentNode.getBoundingClientRect();\n    },\n  });\n\n  Object.defineProperty(Element.prototype, \"__getWindowSize\", {\n    get() {\n      return { width: window.innerWidth, height: window.innerHeight };\n    },\n  });\n\n  customElements.define(\n    \"elm-portal\",\n    class extends HTMLElement {\n      private _targetNode: any;\n      // Base custom element stuff\n      connectedCallback() {\n        this._targetNode = document.createElement(\"div\");\n        if (this.target) {\n          this.target.appendChild(this._targetNode);\n        } else {\n          // If there is no place to mount the elements, we want to throw immediately.\n          // This node should always be present, even at app startup.\n          throw new Error(\n            `There is no place to mount elements that are using elm-portal.  I was looking for #${options.mountId}, but didn't find anything.`\n          );\n        }\n      }\n\n      get target() {\n        return document.getElementById(options.mountId);\n      }\n\n      disconnectedCallback() {\n        if (this.target) {\n          this.target.removeChild(this._targetNode);\n        }\n      }\n\n      // Re-implementations of HTMLElement functions\n      get childNodes() {\n        return this._targetNode.childNodes;\n      }\n\n      replaceData(...args: any[]) {\n        return this._targetNode.replaceData(...args);\n      }\n\n      removeChild(...args: any[]) {\n        return this._targetNode.removeChild(...args);\n      }\n\n      insertBefore(...args: any[]) {\n        return this._targetNode.insertBefore(...args);\n      }\n      appendChild(node: any) {\n        // To cooperate with the Elm runtime\n        requestAnimationFrame(() => {\n          return this._targetNode.appendChild(node);\n        });\n        return node;\n      }\n    }\n  );\n}\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || (!fs.existsSync(path.join(baseDir, "/js/webcomponents/index.ts")) && !skip)) {
    const filepath = path.join(baseDir, "/js/webcomponents/index.ts");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "// import TipTap from \"./js/tiptap\";\nimport ElmPortal from \"./elm-portal\";\n\nexport default function include() {\n  ElmPortal({ mountId: \"elm-portal-target\" });\n  // TipTap();\n}\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || (!fs.existsSync(path.join(baseDir, "/js/clipboard.ts")) && !skip)) {
    const filepath = path.join(baseDir, "/js/clipboard.ts");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "export function copy(text: string) {\n  const clipboard = navigator.clipboard;\n  if (!clipboard) {\n    return;\n  }\n  clipboard.writeText(text);\n}\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || (!fs.existsSync(path.join(baseDir, "/js/local-storage.ts")) && !skip)) {
    const filepath = path.join(baseDir, "/js/local-storage.ts");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "export const getAll = () => {\n  const data: any = {};\n  for (var i = 0, len = localStorage.length; i < len; ++i) {\n    const key = localStorage.key(i);\n    if (key) {\n      data[key] = get(key);\n    }\n  }\n  return data;\n};\n\nexport const get = (key: string): any => {\n  const item = localStorage.getItem(key);\n  if (item) {\n    try {\n      return JSON.parse(item);\n    } catch (e) {\n      return null;\n    }\n  } else {\n    return null;\n  }\n};\n\nexport const set = (key: string, value: any) => {\n  localStorage.setItem(key, JSON.stringify(value));\n};\n\nexport const clear = (key: string) => {\n  localStorage.removeItem(key);\n};\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || (!fs.existsSync(path.join(baseDir, "/js/ports.ts")) && !skip)) {
    const filepath = path.join(baseDir, "/js/ports.ts");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "import * as Clipboard from \"./clipboard\";\nimport * as LocalStorage from \"./local-storage\";\nimport * as TextSelection from \"./text-selection\";\n// Handling data from elm to JS\nexport function connect(app: any) {\n  app.ports?.outgoing?.subscribe?.((message: any) => {\n    switch (message.tag) {\n      case \"local-storage\":\n        LocalStorage.set(message.details.key, message.details.value);\n        if (app.ports?.localStorageUpdated) {\n          app.ports.localStorageUpdated.send(message.details);\n        }\n        break;\n\n      case \"local-storage-clear\":\n        LocalStorage.clear(message.details.key);\n        break;\n\n      case \"copy-to-clipboard\":\n        Clipboard.copy(message.details);\n        break;\n\n      case \"focus-and-select\":\n        TextSelection.focus_and_select(message.details);\n        break;\n\n      default:\n        break;\n    }\n  });\n}\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || (!fs.existsSync(path.join(baseDir, "/js/text-selection.ts")) && !skip)) {
    const filepath = path.join(baseDir, "/js/text-selection.ts");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "export function focus_and_select(id: string) {\n  setTimeout(() => {\n    // in some cases the element hasn't been rendered yet\n    const elem = document.getElementById(id);\n    if (elem) {\n      elem.focus();\n      (elem as HTMLInputElement).select();\n    }\n  }, 100);\n}\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || (!fs.existsSync(path.join(baseDir, "/main.ts")) && !skip)) {
    const filepath = path.join(baseDir, "/main.ts");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "// @ts-ignore\nimport { Elm } from \"./app/Main.elm\";\nimport * as LocalStorage from \"./js/localStorage\";\nimport * as Ports from \"./js/ports\";\nimport Webcomponents from \"./js/webcomponents\";\n\n// Include any custom elements we need.\nWebcomponents();\n\n// Boot up the Elm App\nconst app = Elm.Main.init({\n  flags: { now: Date.now(), localStorage: LocalStorage.getAll() },\n});\n\n// Connect ports\nPorts.connect(app);\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }
}
