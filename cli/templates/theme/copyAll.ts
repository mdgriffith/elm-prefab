
import * as Options from "../../options";
import * as path from "path";
import * as toSrc from "./toSrc";
import * as toJs from "./toJs";


export const copy = (options: Options.RunOptions, summary: Options.Summary) => {
  toSrc.copyTo(path.join(options.root, options.src), false, !options.generateDefaultFiles, summary)
  toJs.copyTo(path.join(options.root, options.js), false, !options.generateDefaultFiles, summary)
}
