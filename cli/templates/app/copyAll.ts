
import * as Options from "../../options";
import * as path from "path";
import * as toHidden from "./toHidden";
import * as toSrc from "./toSrc";
import * as toJs from "./toJs";
import * as toRoot from "./toRoot";


export const copy = (options: Options.RunOptions, summary: Options.Summary) => {
  toHidden.copyTo(path.join(options.root, options.internalSrc), true, false, summary)
  toSrc.copyTo(path.join(options.root, options.src), false, !options.generateDefaultFiles, summary)
  toJs.copyTo(path.join(options.root, options.js), false, !options.generateDefaultFiles, summary)
  toRoot.copyTo(options.root, false, !options.generateDefaultFiles, summary)
}
