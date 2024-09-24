import * as fs from "fs";
import * as path from "path";
import { isBinaryFileSync } from "isbinaryfile";

export type File = { path: string; contents: string | null };

export const readFilesRecursively = async (dir: string, found: File[]) => {
  if (
    dir.endsWith("node_modules") ||
    dir.endsWith("elm-stuff") ||
    dir.endsWith(".git")
  ) {
    // don't go chasing waterfalls
    return;
  } else if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (file.startsWith(".") || file.startsWith("_")) {
        //  Skip hidden files
        continue;
      }
      if (stat.isFile()) {
        found.push(await captureFile(filePath));
      } else if (stat.isDirectory()) {
        await readFilesRecursively(filePath, found);
      }
    }
  }
};

export const captureFile = async (filePath: string): Promise<File> => {
  if (isBinaryFileSync(filePath)) {
    return { path: filePath, contents: null };
  } else {
    const content = fs.readFileSync(filePath, "utf-8");
    return { path: filePath, contents: content };
  }
};
