import * as Options from "./options";
import * as Generator from "./run_generator";
import * as ThemeWebComponents from "./templates/theme/engine";
import * as ThemeWebComponentsJs from "./templates/theme/js";

export const generator = (options: any): Options.Generator => {
  return {
    name: "theme",
    generatorType: Options.GeneratorType.Standard,
    init: (runOptions: Options.RunOptions) => {
      ThemeWebComponentsJs.copyTo(runOptions.js, true);
      ThemeWebComponents.copyTo(runOptions.internalSrc, true);
    },
    run: async (runOptions: Options.RunOptions) => {
      ThemeWebComponentsJs.copyTo(runOptions.js, true);
      ThemeWebComponents.copyTo(runOptions.internalSrc, true);
      return await Generator.run(runOptions.internalSrc, {
        theme: options,
      });
    },
  };
};
