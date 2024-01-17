import * as Options from "./options";
import * as Generator from "./run_generator";
import * as ElmDev from "./elm_dev";

const InteractiveGenerator = require("./generators/interactive");

export const generator = (options: any) => {
  return {
    generatorType: Options.GeneratorType.Standard,
    init: (runOptions: Options.RunOptions) => {},
    run: async (runOptions: Options.RunOptions) => {
      const modules = options.modules;
      if (modules.length == 0) {
        console.error(
          "List at least one module for 'interactive' to generate."
        );
      }

      // Retrieve the docs for all modules we want examples for.
      const docs = ElmDev.execute(`docs ${modules}`);

      const finalOptions = {
        output: options.output ? options.output : "interactive",
        project: docs,
        viewers: [],
      };

      await Generator.run(
        InteractiveGenerator.Elm.Generate,
        runOptions.internalSrc,
        finalOptions
      );
    },
  };
};

const testDocs = [
  {
    name: "Ui.Button",
    comment:
      "\n\n@docs Button\n\n@docs init, withEnabled, withSmall, withSecondary\n\n@docs view\n\n",
    unions: [{ name: "Button", comment: " ", args: ["msg"], cases: [] }],
    aliases: [],
    values: [
      {
        name: "init",
        comment: " ",
        type: "{ text : String.String, onClick : msg } -> Ui.Button.Button msg",
      },
      {
        name: "view",
        comment: " ",
        type: "Ui.Button.Button msg -> Element.Element msg",
      },
      {
        name: "withEnabled",
        comment: " ",
        type: "Basics.Bool -> Ui.Button.Button msg -> Ui.Button.Button msg",
      },
      {
        name: "withSecondary",
        comment: " ",
        type: "Ui.Button.Button msg -> Ui.Button.Button msg",
      },
      {
        name: "withSmall",
        comment: " ",
        type: "Ui.Button.Button msg -> Ui.Button.Button msg",
      },
    ],
    binops: [],
  },
];
