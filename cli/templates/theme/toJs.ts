
import * as path from "path";
import * as fs from "fs";
import * as Options from "../../options";

export const copyTo = (baseDir: string, overwrite: boolean, skip: boolean, summary: Options.Summary) => { 
  
  if (overwrite || (!fs.existsSync(path.join(baseDir, "/tiptap.ts")) && !skip)) {
    const filepath = path.join(baseDir, "/tiptap.ts");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "import { Editor } from \"@tiptap/core\";\nimport StarterKit from \"@tiptap/starter-kit\";\nimport Link from \"@tiptap/extension-link\";\n\nconst toStyles = (styles: any) => {\n  return {\n    class: styles ? styles.class : undefined,\n    style: styles ? styles.style : undefined,\n  };\n};\n\nexport default function include() {\n  customElements.define(\n    \"tiptap-control\",\n    class extends HTMLElement {\n      private _editorControl: any;\n      // Base custom element stuff\n      connectedCallback() {\n        this.onclick = this.handleClick.bind(this); // Bind the click handler\n      }\n      handleClick() {\n        const editorNode = this.getEditor();\n        // @ts-ignore\n        if (editorNode && editorNode.editor && this._editorControl) {\n          // @ts-ignore\n          const editor = editorNode.editor;\n          switch (this._editorControl.cmd) {\n            case \"toggle-heading\":\n              editor\n                .chain()\n                .focus()\n                .toggleHeading({ level: this._editorControl.heading })\n                .run();\n              break;\n            case \"toggle-bold\":\n              editor.chain().focus().toggleBold().run();\n              break;\n            case \"toggle-italic\":\n              editor.chain().focus().toggleItalic().run();\n              break;\n            case \"toggle-code\":\n              editor.chain().focus().toggleCode().run();\n              break;\n            case \"toggle-codeblock\":\n              editor.chain().focus().toggleCodeBlock().run();\n              break;\n            case \"toggle-bullet-list\":\n              editor.chain().focus().toggleBulletList().run();\n              break;\n            case \"toggle-numbered-list\":\n              editor.chain().focus().toggleOrderedList().run();\n              break;\n            default:\n              break;\n          }\n        }\n      }\n\n      getEditor() {\n        const parent = this.closest(\".tiptap-editor-container\");\n        if (parent) {\n          return parent.querySelector(\"tiptap-editor\");\n        }\n        return null;\n      }\n\n      set editorControl(val) {\n        if (\"cmd\" in val && typeof val.cmd === \"string\") {\n          this._editorControl = val;\n        }\n      }\n      get editorControl() {\n        return this._editorControl;\n      }\n    }\n  );\n\n  customElements.define(\n    \"tiptap-editor\",\n    class extends HTMLElement {\n      _editor: any;\n      private _editorNode: any;\n      private _content: any;\n      private _cssClasses: any;\n      private _cssStyle: any;\n      private _editable: any;\n      private _elementStyles: any;\n      // Base custom element stuff\n      connectedCallback() {\n        const self = this;\n        this._editor = new Editor({\n          element: this,\n          extensions: [\n            StarterKit.configure({\n              heading: {\n                levels: [1, 2],\n                HTMLAttributes: toStyles(this._elementStyles.heading),\n              },\n              paragraph: {\n                HTMLAttributes: toStyles(this._elementStyles.paragraph),\n              },\n              blockquote: {\n                HTMLAttributes: toStyles(this._elementStyles.blockquote),\n              },\n              bold: {\n                HTMLAttributes: toStyles(this._elementStyles.bold),\n              },\n              code: {\n                HTMLAttributes: toStyles(this._elementStyles.code),\n              },\n              codeBlock: {\n                HTMLAttributes: toStyles(this._elementStyles.codeBlock),\n              },\n              hardBreak: {\n                HTMLAttributes: toStyles(this._elementStyles.hardBreak),\n              },\n              horizontalRule: {\n                HTMLAttributes: toStyles(this._elementStyles.horizontalRule),\n              },\n              italic: {\n                HTMLAttributes: toStyles(this._elementStyles.italic),\n              },\n              orderedList: {\n                HTMLAttributes: toStyles(this._elementStyles.orderedList),\n              },\n              listItem: {\n                HTMLAttributes: toStyles(this._elementStyles.listItem),\n              },\n              strike: {\n                HTMLAttributes: toStyles(this._elementStyles.strike),\n              },\n            }),\n            Link.configure({\n              openOnClick: true,\n              autolink: true,\n              linkOnPaste: true,\n            }),\n          ],\n          content: this._content,\n          editable: this._editable,\n          editorProps: {\n            attributes: {\n              class: this._cssClasses ? this._cssClasses : undefined,\n              style: this._cssStyle ? this._cssStyle : undefined,\n            },\n          },\n\n          onUpdate: ({ editor }) => {\n            const contents = editor.getJSON();\n            console.log(contents);\n            const event = new CustomEvent(\"editor-updated\", {\n              detail: self,\n            });\n            self.dispatchEvent(event);\n          },\n          onFocus: ({ editor }) => {\n            self.dispatchEvent(new Event(\"editor-focused\"));\n          },\n          onBlur: ({ editor }) => {\n            self.dispatchEvent(new Event(\"editor-blurred\"));\n          },\n          onSelectionUpdate: (options) => {\n            console.log(options);\n            self.dispatchEvent(new Event(\"editor-selection-updated\"));\n          },\n          onDestroy: (_) => {\n            self.dispatchEvent(new Event(\"editor-destroyed\"));\n          },\n        });\n      }\n\n      set elementStyles(val) {\n        this._elementStyles = val;\n      }\n      get elementStyles(): boolean {\n        return this._elementStyles;\n      }\n\n      set editable(val) {\n        this._editable = val;\n      }\n      get editable(): boolean {\n        return this._editable;\n      }\n\n      set cssClass(val) {\n        this._cssClasses = val;\n      }\n\n      get cssClass(): string {\n        return this._cssClasses ? this._cssClasses : \"\";\n      }\n\n      set cssStyle(val) {\n        this._cssStyle = val;\n      }\n\n      get cssStyle(): string {\n        return this._cssStyle;\n      }\n\n      get json() {\n        return this._editor.getJSON();\n      }\n\n      get editor() {\n        return this._editor;\n      }\n      set content(val) {\n        this._content = val;\n      }\n      get content() {\n        return this._content;\n      }\n    }\n  );\n}\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }
}
