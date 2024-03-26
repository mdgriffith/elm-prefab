
import * as path from "path";
import * as fs from "fs";

export const copyTo = (baseDir: string, overwrite: boolean) => { 
  
  if (overwrite || !fs.existsSync(path.join(baseDir, "/clipboard.ts"))) {
    fs.mkdirSync(path.dirname(path.join(baseDir, "/clipboard.ts")), { recursive: true });
    fs.writeFileSync(path.join(baseDir, "/clipboard.ts"), "export function copy(text: string) {\n  const clipboard = navigator.clipboard;\n  if (!clipboard) {\n    return;\n  }\n  clipboard.writeText(text);\n}\n");
  }


  if (overwrite || !fs.existsSync(path.join(baseDir, "/localStorage.ts"))) {
    fs.mkdirSync(path.dirname(path.join(baseDir, "/localStorage.ts")), { recursive: true });
    fs.writeFileSync(path.join(baseDir, "/localStorage.ts"), "export const getAll = () => {\n  const data: any = {};\n  for (var i = 0, len = localStorage.length; i < len; ++i) {\n    const key = localStorage.key(i);\n    if (key) {\n      data[key] = get(key);\n    }\n  }\n  return data;\n};\n\nexport const get = (key: string): any => {\n  const item = localStorage.getItem(key);\n  if (item) {\n    try {\n      return JSON.parse(item);\n    } catch (e) {\n      return null;\n    }\n  } else {\n    return null;\n  }\n};\n\nexport const set = (key: string, value: any) => {\n  localStorage.setItem(key, JSON.stringify(value));\n};\n\nexport const clear = (key: string) => {\n  localStorage.removeItem(key);\n};\n");
  }

}
