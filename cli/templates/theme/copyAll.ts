
import * as Options from "../../options";
import * as path from "path";
import * as toJs from "./toJs";


export const copy = (options: Options.RunOptions, summary: Options.Summary) => {
  toJs.copyTo(options.js, false, !options.generateDefaultFiles, summary)
}
