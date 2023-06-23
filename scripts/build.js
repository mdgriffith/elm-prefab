const fs = require("fs");
const path = require("path");

/*

This file creates a `.ts` file that just has the GraphQL/Engine.elm file as as string within it.

This is because we both need to ship the Engine file and use it locally in this package.

*/

const toTypescriptFile = (body) => `export default (): string => ${body}`;

const copyFileToTsFile = (pathToFile) => {
  let body = JSON.stringify(fs.readFileSync(`./${pathToFile}`).toString());

  const targetFilePath = `./cli/templates/${pathToFile}.ts`;

  const dir = path.dirname(targetFilePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(targetFilePath, toTypescriptFile(body));
};

const copyDir = (dir) => {
  const files = getFilesRecursively(dir);
  for (const i in files) {
    copyFileToTsFile(files[i]);
  }
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

copyDir("plugins/app/engine");
copyDir("plugins/app/toCopy");
copyDir("plugins/theme/webcomponents");
