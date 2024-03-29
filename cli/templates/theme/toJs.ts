
import * as path from "path";
import * as fs from "fs";
import * as Options from "../../options";

export const copyTo = (baseDir: string, overwrite: boolean, skip: boolean, summary: Options.Summary) => { 
  
  if (overwrite || (!fs.existsSync(path.join(baseDir, "/elm-portal.ts")) && !skip)) {
    const filepath = path.join(baseDir, "/elm-portal.ts");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "export default function include(options: { mountId: string }) {\n  Object.defineProperty(Element.prototype, \"__getParentClientRect\", {\n    get() {\n      return this.parentNode.getBoundingClientRect();\n    },\n  });\n\n  Object.defineProperty(Element.prototype, \"__getWindowSize\", {\n    get() {\n      return { width: window.innerWidth, height: window.innerHeight };\n    },\n  });\n\n  customElements.define(\n    \"elm-portal\",\n    class extends HTMLElement {\n      private _targetNode: any;\n      // Base custom element stuff\n      connectedCallback() {\n        this._targetNode = document.createElement(\"div\");\n        if (this.target) {\n          this.target.appendChild(this._targetNode);\n        } else {\n          // If there is no place to mount the elements, we want to throw immediately.\n          // This node should always be present, even at app startup.\n          throw new Error(\n            `There is no place to mount elements that are using elm-portal.  I was looking for #${options.mountId}, but didn't find anything.`\n          );\n        }\n      }\n\n      get target() {\n        return document.getElementById(options.mountId);\n      }\n\n      disconnectedCallback() {\n        if (this.target) {\n          this.target.removeChild(this._targetNode);\n        }\n      }\n\n      // Re-implementations of HTMLElement functions\n      get childNodes() {\n        return this._targetNode.childNodes;\n      }\n\n      replaceData(...args: any[]) {\n        return this._targetNode.replaceData(...args);\n      }\n\n      removeChild(...args: any[]) {\n        return this._targetNode.removeChild(...args);\n      }\n\n      insertBefore(...args: any[]) {\n        return this._targetNode.insertBefore(...args);\n      }\n      appendChild(node: any) {\n        // To cooperate with the Elm runtime\n        requestAnimationFrame(() => {\n          return this._targetNode.appendChild(node);\n        });\n        return node;\n      }\n    }\n  );\n}\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }
}
