import * as ChildProcess from "child_process";
import * as path from "path";

const env = Object.assign({}, process.env);
env.PATH =
  path.join(process.cwd(), "node_modules", ".bin") + path.delimiter + env.PATH;

// Call Elm Dev

const elmDevCommand = "elm-dev";

export function execute(operation: string, cwd?: string): Promise<any> {
  return new Promise((resolve, reject) => {
    ChildProcess.exec(
      `${elmDevCommand} ${operation}`,
      { cwd, env },
      (error, stdout, stderr) => {
        if (error) {
          reject(`Error: ${error.message}`);
          return;
        }
        if (stderr) {
          reject(`Stderr: ${stderr}`);
          return;
        }
        try {
          const parsedOutput = JSON.parse(stdout);
          resolve(parsedOutput);
        } catch (parseError) {
          console.log(stdout);
          // @ts-ignore
          reject(`Error parsing JSON: ${parseError.message}`);
        }
      },
    );
  });
}
