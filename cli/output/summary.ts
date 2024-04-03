import * as Options from "../options";
import chalk from "chalk";
import path from "path";

function format_title(title: string): string {
  return indent(2, title);
}

const indent = (spaces: number, str: string): string => {
  const indent = " ".repeat(spaces);
  return indent + str.replace(/\n/g, "\n" + indent);
};

const baseDirectory = (fullpath: string): string | null => {
  const base = path.dirname(fullpath).split(path.sep).reverse().pop();

  if (base && base == ".") {
    return null;
  }
  return base || null;
};

function sortByDirectory(records: Options.Generated[]) {
  return records.sort((a, b) => {
    // Extract directory names
    let dirA = baseDirectory(a.path);
    let dirB = baseDirectory(b.path);

    // Convert no directory paths to a value that sorts last
    dirA = dirA === null ? "zzzzzzzz" : dirA;
    dirB = dirB === null ? "zzzzzzzz" : dirB;

    // Compare directory names
    if (dirA < dirB) return -1;
    if (dirA > dirB) return 1;

    return a.path.localeCompare(b.path);
  });
}

//

export const summary = (summaryMap: Options.SummaryMap) => {
  console.log("");
  console.log(chalk.cyan("Elm Prefab") + chalk.gray(" — Generation Summary"));
  console.log("");
  for (const key in summaryMap) {
    const summary = summaryMap[key];
    console.log(format_title(key));

    if ("errors" in summary) {
      for (const error of summary.errors) {
        console.log(indent(4, chalk.red(error.title)));
        console.log(indent(6, error.description));
      }
    } else {
      const sorted = sortByDirectory(summary.generated);

      let directory = null;

      for (const generated of sorted) {
        const dir = baseDirectory(generated.path);

        if (dir !== directory) {
          console.log("");
          directory = dir;
        }
        console.log(indent(4, chalk.green(generated.path)));
      }
    }
    console.log("");
  }
};
