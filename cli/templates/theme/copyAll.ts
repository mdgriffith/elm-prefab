
import { RunOptions } from "../../options";
import * as toHidden from "./toHidden";
import * as toSrc from "./toSrc";
import * as toJs from "./toJs";


export const copy = (options: RunOptions) => {
  toHidden.copyTo(options.internalSrc, true)
  toSrc.copyTo(options.src, false)
  toJs.copyTo(options.js, false)
}

  