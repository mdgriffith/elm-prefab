const fs = require("fs");
const path = require("path");

/*

This copies a number of files into .ts files so we can write them as static files from the CLI.
*/

const toTypescriptFile = (body) => `
import * as path from "path";
import * as fs from "fs";

export const copyTo = (baseDir: string, overwrite: boolean) => { 
  ${body}
}
`;

const toCopyFile = (path, contents) => `
  if (overwrite || !fs.existsSync(path.join(baseDir, "${path}"))) {
    fs.mkdirSync(path.dirname(path.join(baseDir, "${path}")), { recursive: true });
    fs.writeFileSync(path.join(baseDir, "${path}"), ${contents});
  }
`;

const copyDir = (dir, targetFilePath) => {
  const files = getFilesRecursively(dir);

  const copyInstructions = [];
  for (const i in files) {
    let body = JSON.stringify(fs.readFileSync(`./${files[i]}`).toString());

    const targetPath = files[i].slice(dir.length);
    copyInstructions.push(toCopyFile(targetPath, body));
  }

  const targetDir = path.dirname(targetFilePath);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(
    targetFilePath,
    toTypescriptFile(copyInstructions.join("\n"))
  );
};

const isDirectory = (pathStr) => fs.statSync(pathStr).isDirectory();
const getDirectories = (pathStr) =>
  fs
    .readdirSync(pathStr)
    .map((name) => path.join(pathStr, name))
    .filter(isDirectory);

const isFile = (filepath) => fs.statSync(filepath).isFile();

const getFiles = (filepath) =>
  fs
    .readdirSync(filepath)
    .map((name) => path.join(filepath, name))
    .filter(isFile);

// Returns a list of strings
const getFilesRecursively = (filepath) => {
  let dirs = getDirectories(filepath);
  let files = dirs
    .map((dir) => getFilesRecursively(dir)) // go through each directory
    .reduce((a, b) => a.concat(b), []); // map returns a 2d array (array of file arrays) so flatten
  return files.concat(getFiles(filepath));
};

//
copyDir("plugins/app/engine", "./cli/templates/app/engine.ts");
copyDir("plugins/app/toCopy", "./cli/templates/app/toCopy.ts");
copyDir("plugins/theme/engine", "./cli/templates/theme/engine.ts");
copyDir("plugins/theme/js", "./cli/templates/theme/js.ts");
