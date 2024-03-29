import * as Options from "./options";
import * as Generator from "./run_generator";
import * as ThemeWebComponents from "./templates/theme/copyAll";

export const generator = (options: Options.ThemeOptions): Options.Generator => {
  return {
    name: "theme",
    generatorType: Options.GeneratorType.Standard,
    run: async (runOptions: Options.RunOptions) => {
      const summary: Options.Summary = { generated: [] };
      runOptions.generateDefaultFiles =
        options.defaultFiles == false ? false : true;

      ThemeWebComponents.copy(runOptions, summary);
      const newSummary = await Generator.run(runOptions.internalSrc, {
        theme: options,
      });

      return Options.mergeSummaries(summary, newSummary);
    },
  };
};
