import * as fs from "fs";
import * as path from "path";

// Run a standard generator made by elm-codegen
export async function run(generator: any, outputDir: string, flags: any) {
  const promise = new Promise((resolve, reject) => {
    // @ts-ignore
    const app = generator.init({ flags: flags });
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
      for (const file of files) {
        writeFile(path.join(outputDir, file.path), file.contents);
      }
    })
    .catch((errorList) => {
      for (const error of errorList) {
        console.error(
          format_title(error.title),
          "\n\n" + error.description + "\n"
        );
      }

      process.exit(1);
    });
  return promise;
}

function format_title(title: string): string {
  const tail = "-".repeat(80 - (title.length + 2));
  return "--" + title + tail;
}

function writeFile(fullpath: string, contents: string) {
  fs.mkdirSync(path.dirname(fullpath), { recursive: true });
  fs.writeFileSync(fullpath, contents);
}
