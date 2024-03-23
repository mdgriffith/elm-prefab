import * as Options from "../options";
import chalk from "chalk";

function format_title(title: string): string {
  return indent(2, title);
}

const indent = (spaces: number, str: string): string => {
  const indent = " ".repeat(spaces);
  return indent + str.replace(/\n/g, "\n" + indent);
};

export const summary = (summaryMap: Options.SummaryMap) => {
  console.log("");
  console.log(chalk.cyan("Elm Prefab") + chalk.gray(" — Generation Summary"));
  console.log("");
  for (const key in summaryMap) {
    const summary = summaryMap[key];
    console.log(format_title(key) + chalk.grey(" (.elm-prefab)"));

    if ("errors" in summary) {
      for (const error of summary.errors) {
        console.log(indent(4, chalk.red(error.title)));
        console.log(indent(6, error.description));
      }
    } else {
      for (const generated of summary.generated) {
        console.log(indent(4, chalk.yellow(generated.path)));
      }
    }
    console.log("");
  }
};
