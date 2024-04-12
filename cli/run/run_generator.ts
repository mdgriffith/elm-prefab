import * as fs from "fs";
import * as path from "path";
import * as Options from "../options";

const ElmGenerator = require("../generators/all");

// Run a standard generator made by elm-codegen
export async function run(
  outputDir: string,
  flags: any
): Promise<Options.Summary> {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    const app = ElmGenerator.Elm.Run.init({ flags: flags });
    if (app.ports.onSuccessSend) {
      app.ports.onSuccessSend.subscribe(resolve);
    }
    if (app.ports.onInfoSend) {
      app.ports.onInfoSend.subscribe((info: string) => console.log(info));
    }
    if (app.ports.onFailureSend) {
      app.ports.onFailureSend.subscribe(reject);
    }
  })
    .then((files: any) => {
      const generated: Options.Generated[] = [];
      for (const file of files) {
        writeFile(path.join(outputDir, file.path), file.contents);
        generated.push({
          outputDir: outputDir,
          path: path.join(outputDir, file.path),
        });
      }
      return { generated: generated };
    })
    .catch((errorList) => {
      const errors: Options.Error[] = [];
      for (const error of errorList) {
        errors.push({
          title: error.title as string,
          description: error.description as string,
        });
      }

      return { errors: errors };
    });
}

function writeFile(fullpath: string, contents: string) {
  fs.mkdirSync(path.dirname(fullpath), { recursive: true });
  fs.writeFileSync(fullpath, contents);
}
