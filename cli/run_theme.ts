import * as Options from "./options";
import * as Generator from "./run_generator";
import * as ThemeWebComponents from "./templates/theme/copyAll";

export const generator = (options: any): Options.Generator => {
  return {
    name: "theme",
    generatorType: Options.GeneratorType.Standard,
    run: async (runOptions: Options.RunOptions) => {
      ThemeWebComponents.copy(runOptions);
      return await Generator.run(runOptions.internalSrc, {
        theme: options,
      });
    },
  };
};
