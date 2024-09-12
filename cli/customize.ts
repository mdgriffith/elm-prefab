import * as Customizable from "./templates/allCustomizables";
import * as fs from "fs";
import * as path from "path";

export const customize = (
  paths: { src: string; internalSrc: string },
  customizable: Customizable.File,
) => {
  // If the file exists in `internalSrc`, remove it
  const internalFile = path.join(paths.internalSrc, customizable.path);
  if (fs.existsSync(internalFile)) {
    fs.unlinkSync(internalFile);
  }

  // Write `file.contents` to src if it doesn't already exist
  const srcFile = path.join(paths.src, customizable.path);
  if (!fs.existsSync(srcFile)) {
    fs.mkdirSync(path.dirname(srcFile), { recursive: true });
    fs.writeFileSync(srcFile, customizable.contents);
  }
};
