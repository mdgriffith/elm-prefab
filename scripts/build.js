const fs = require("fs");
const path = require("path");

/*

This copies a number of files into .ts files so we can write them as static files from the CLI.
*/

const toTypescriptFile = (additional, all) => `
import * as path from "path";
import * as fs from "fs";
import * as Options from "../../options";

${additional}

export const all = [
  ${all.join(",\n  ")}
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
`;

const toFileVar = (path) => {
  // Replace all non-alphanumeric characters with underscores
  // Remove any leading non-alphanumeric characters
  return path.replace(/[^a-zA-Z0-9]/g, "_").replace(/^[^a-zA-Z0-9]*/, "");
};

const toFileLink = (path, contents) => `
export const ${toFileVar(path)} = {
   path: "${path}",
   contents: ${contents}
}`;

const toSingleTypescriptFile = (body) => `

function makeReplacements(replacements: Map<string, string>, source: string): string {
  let result = source;

  replacements.forEach((value, key) => {
      // Use a global regular expression for replacement
      const regex = new RegExp(key, 'g');
      result = result.replace(regex, value);
  });

  return result;
}

export const toBody = (replacements: Map<string, string>) => {
  return makeReplacements(replacements, ${body})
}
`;

function convertToDirName(inputString) {
  // This regex looks for 'to' followed by a capitalized word
  const regex = /to([A-Z][a-z]*)/g;

  // The replacement function takes the match, converts the first character after 'to' to lowercase
  // and returns the rest of the string as is.
  return inputString.replace(regex, (match, p1) => {
    return p1.charAt(0).toLowerCase() + p1.slice(1);
  });
}

const templateNameToDir = (template) => {
  if (template == "toHidden") {
    return "internalSrc";
  }
  return convertToDirName(template);
};

// string -> string | null
const toCopyAll = (templates) => {
  if (templates.length === 0) {
    return null;
  }
  let imports = "";
  for (const template of templates) {
    imports += `import * as ${template} from "./${template}";\n`;
  }

  let copyCommands = "";
  for (const template of templates) {
    if (template == "toHidden") {
      copyCommands += `  ${template}.copyTo(options.internalSrc, true, false, summary)\n`;
    } else {
      copyCommands += `  ${template}.copyTo(options.${templateNameToDir(
        template,
      )}, false, !options.generateDefaultFiles, summary)\n`;
    }
  }

  return `
import * as Options from "../../options";
${imports}

export const copy = (options: Options.RunOptions, summary: Options.Summary) => {
${copyCommands}}
`;
};

const copyFile = (file, targetFilePath) => {
  const targetDir = path.dirname(targetFilePath);
  let body = JSON.stringify(fs.readFileSync(`./${file}`).toString());
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(targetFilePath, toSingleTypescriptFile(body));
};

const copyDir = (dir, targetFilePath) => {
  const files = getFilesRecursively(dir);

  const links = [];
  const allValues = [];
  for (const i in files) {
    let body = JSON.stringify(fs.readFileSync(`./${files[i]}`).toString());

    const targetPath = files[i].slice(dir.length);
    links.push(toFileLink(targetPath, body));
    allValues.push(toFileVar(targetPath));
  }

  const targetDir = path.dirname(targetFilePath);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(
    targetFilePath,
    toTypescriptFile(links.join("\n"), allValues),
  );
};

const copyDirIfExists = (baseDir, pluginName, name, templates) => {
  const dir = path.join(baseDir, "templates", name);
  if (fs.existsSync(dir)) {
    const targetDir = `./cli/templates/${pluginName}/${name}.ts`;
    copyDir(dir, targetDir);
    templates.push(name);
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

const customizables = [];
const plugins = [];

for (const dir of getDirectories("plugins")) {
  const pluginName = path.basename(dir);

  // Capture all customizable files
  copyDirIfExists(dir, pluginName, "customizable", []);
  const customizableDir = path.join(dir, "templates", "customizable");
  const customizableExists = fs.existsSync(customizableDir);
  if (customizableExists) {
    customizables.push({ importPath: customizableDir, pluginName: pluginName });
  }

  const templates = [];
  copyDirIfExists(dir, pluginName, "toHidden", templates);
  copyDirIfExists(dir, pluginName, "toSrc", templates);
  copyDirIfExists(dir, pluginName, "toJs", templates);
  copyDirIfExists(dir, pluginName, "toRoot", templates);

  const maybeCopyAll = toCopyAll(templates);
  if (maybeCopyAll) {
    fs.writeFileSync(`./cli/templates/${pluginName}/copyAll.ts`, maybeCopyAll);
  }
  if (customizableExists || maybeCopyAll) {
    // Some templates were generated, this is def a plugin
    plugins.push(pluginName);
  }

  const oneOffDir = path.join(dir, "templates", "oneOff");
  if (fs.existsSync(oneOffDir)) {
    for (const file of getFilesRecursively(oneOffDir)) {
      copyFile(
        file,
        `./cli/templates/${pluginName}/oneOff/${path.basename(file)}.ts`,
      );
    }
  }
}

// Utility for copying all customizables
if (customizables.length > 0) {
  let content = "";
  for (const filePath of customizables) {
    content += `import * as ${filePath.pluginName} from "./${filePath.pluginName}/customizable";\n`;
  }
  content += "\n\n";
  content += "export const all = [\n";
  for (const filePath of customizables) {
    content =
      content +
      `  { plugin: "${filePath.pluginName}", all: ${filePath.pluginName}.all },\n`;
  }
  content += "];";

  fs.writeFileSync(`./cli/templates/allCustomizables.ts`, content);
}

// Utility for copying all files for a plugin
let content = "";
for (const pluginName of plugins) {
  content += `import * as ${pluginName} from "./${pluginName}/copyAll";\n`;
}
content += "\n\n";
content += "export const all = [\n";
for (const pluginName of plugins) {
  content =
    content + `  { plugin: "${pluginName}", copy: ${pluginName}.copy },\n`;
}
content += "];";

fs.writeFileSync(`./cli/templates/allCopy.ts`, content);
