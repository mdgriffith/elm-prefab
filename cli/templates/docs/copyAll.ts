
import * as Options from "../../options";
import * as path from "path";
import * as toSrc from "./toSrc";


export const copy = (options: Options.RunOptions, summary: Options.Summary) => {
  toSrc.copyTo(options.src, false, !options.generateDefaultFiles, summary)
}
