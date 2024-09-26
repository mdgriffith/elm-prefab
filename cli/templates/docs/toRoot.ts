
import * as path from "path";
import * as fs from "fs";
import * as Options from "../../options";


export const guides_GettingStarted_md = {
   moduleName: "guides.GettingStarted",
   path: "/guides/GettingStarted.md",
   contents: "# Getting started\n"
}

export const Readme_md = {
   moduleName: "Readme",
   path: "/Readme.md",
   contents: ""
}

export const all = [
  guides_GettingStarted_md,
  Readme_md
]

export const copyTo = (baseDir: string, overwrite: boolean, skip: boolean, summary: Options.Summary) => {
   for (const file of all) {
      if (overwrite || (!fs.existsSync(path.join(baseDir, file.path)) && !skip)) {
        const filepath = path.join(baseDir, file.path);
        fs.mkdirSync(path.dirname(filepath), { recursive: true });
        fs.writeFileSync(filepath, file.contents);
        const generated = { outputDir: baseDir, path: filepath}
        Options.addGenerated(summary, generated);
      }
   }
}
