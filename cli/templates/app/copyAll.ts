
import * as Options from "../../options";
import * as toHidden from "./toHidden";
import * as toSrc from "./toSrc";
import * as toJs from "./toJs";
import * as toRoot from "./toRoot";


export const copy = (options: Options.RunOptions, summary: Options.Summary) => {
  toHidden.copyTo(options.internalSrc, true, summary)
  toSrc.copyTo(options.src, false, summary)
  toJs.copyTo(options.js, false, summary)
  toRoot.copyTo(options.root, false, summary)
}
