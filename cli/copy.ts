import * as Options from "./options";
import * as fs from "fs";
import * as path from "path";
import * as Customizable from "./templates/allCustomizables";
import * as CopyAll from "./templates/allCopy";

export const copy = (runOptions: Options.RunOptions): Options.Summary => {
  const summary: Options.Summary = { generated: [] };

  // Manage hidden files
  for (const plugin of Customizable.all) {
    if (runOptions.activePlugins.includes(plugin.plugin)) {
      for (const file of plugin.all) {
        if (runOptions.project.userControlled.has(file.path)) {
          // User controlled
          if (fs.existsSync(path.join(runOptions.internalSrc, file.path))) {
            // If exists in hidden dir, remove it
            fs.unlinkSync(path.join(runOptions.internalSrc, file.path));
          }
        } else {
          // Prefab controlled, copy to hidden
          const fullFilePath = path.join(runOptions.internalSrc, file.path);
          const generated = {
            outputDir: runOptions.internalSrc,
            path: fullFilePath,
          };
          fs.mkdirSync(path.dirname(fullFilePath), { recursive: true });
          fs.writeFileSync(fullFilePath, file.contents);
          Options.addGenerated(summary, generated);
        }
      }
    }
  }

  if (runOptions.generateDefaultFiles) {
    for (const plugin of CopyAll.all) {
      if (runOptions.activePlugins.includes(plugin.plugin)) {
        plugin.copy(runOptions, summary);
      }
    }
  }

  return summary;
};

export const copyPlugin = (
  pluginToRun: string,
  runOptions: Options.RunOptions,
): Options.Summary => {
  const summary: Options.Summary = { generated: [] };

  // Manage hidden files
  for (const plugin of Customizable.all) {
    if (plugin.plugin == pluginToRun) {
      for (const file of plugin.all) {
        if (runOptions.project.userControlled.has(file.path)) {
          // User controlled
          if (fs.existsSync(path.join(runOptions.internalSrc, file.path))) {
            // If exists in hidden dir, remove it
            fs.unlinkSync(path.join(runOptions.internalSrc, file.path));
          }
        } else {
          // Prefab controlled, copy to hidden
          const fullFilePath = path.join(runOptions.internalSrc, file.path);
          const generated = {
            outputDir: runOptions.internalSrc,
            path: fullFilePath,
          };
          fs.mkdirSync(path.dirname(fullFilePath), { recursive: true });
          fs.writeFileSync(fullFilePath, file.contents);
          Options.addGenerated(summary, generated);
        }
      }
    }
  }

  if (runOptions.generateDefaultFiles) {
    for (const plugin of CopyAll.all) {
      if (plugin.plugin == pluginToRun) {
        plugin.copy(runOptions, summary);
      }
    }
  }

  return summary;
};
