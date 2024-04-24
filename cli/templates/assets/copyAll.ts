
import * as Options from "../../options";
import * as toHidden from "./toHidden";


export const copy = (options: Options.RunOptions, summary: Options.Summary) => {
  toHidden.copyTo(options.internalSrc, true, false, summary)
}
