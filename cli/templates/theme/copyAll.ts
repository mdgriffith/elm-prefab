
import * as Options from "../../options";
import * as toSrc from "./toSrc";
import * as toJs from "./toJs";


export const copy = (options: Options.RunOptions, summary: Options.Summary) => {
  toSrc.copyTo(options.src, false, !options.generateDefaultFiles, summary)
  toJs.copyTo(options.js, false, !options.generateDefaultFiles, summary)
}
