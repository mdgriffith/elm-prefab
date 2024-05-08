import * as GQL from "elm-gql";
import * as Options from "../options";

// Some slight differences from elm-gql the cli
// elm-gql has ourputDir and outputAll, but for elm-prefab we just want outputAll
// We're also  always going to run force vecause the performance isn't bad
// And we ran into weirdnesses at work.
// type GQLOptions = {
//   schema: string;
//   namespace?: string;
//   header?: string[];
//   generateMocks?: boolean;
//   queries?: string;
//   globalFragments: string | null;
//   existingEnumDefinitions?: string | null;
// };

export const generator = (
  options: Options.GraphQLOptions
): Options.Generator => {
  return {
    name: "graphql",
    generatorType: Options.GeneratorType.Standard,
    run: async (runOptions: Options.RunOptions) => {
      const schema = replaceEnvVars(options.schema);
      if (typeof schema !== "string") {
        return {
          generated: [],
          errors: [schema],
        };
      }
      const header: string[] = [];
      for (const headerLine of options.header || []) {
        const replaceHeader = replaceEnvVars(headerLine);
        if (typeof replaceHeader !== "string") {
          return {
            generated: [],
            errors: [replaceHeader],
          };
        }
        header.push(replaceHeader);
      }

      const result = await GQL.run(schema, {
        outputAll: runOptions.internalSrc,
        namespace: options.namespace,
        header: header,
        force: true,
        generateMocks: options.generateMocks,
        queries: options.queries,
        globalFragments: options.globalFragments
          ? options.globalFragments
          : null,
        existingEnumDefinitions: options.existingEnumDefinitions,
      });
      if ("errors" in result) {
        return {
          generated: [],
          errors: result.errors,
        };
      } else {
        return {
          generated: result.generated,
          errors: [],
        };
      }
    },
  };
};

// Replace $GITHUB_API_TOKEN with the environment variable, in the following example string
// "Authorization: bearer $GITHUB_API_TOKEN"

const replaceEnvVars = (input: string): string | Options.Error => {
  const envVars = Object.keys(process.env);
  const envVarRegex = /\$[A-Z_]+/g;
  let matches = input.match(envVarRegex);
  if (!matches) {
    return input;
  }

  for (const match of matches) {
    if (!envVars.includes(match.slice(1))) {
      return {
        title: "Environment variable not found",
        description: `Environment variable ${match.slice(1)} not found`,
      };
    }
  }

  return input.replace(envVarRegex, (match) => {
    const envVar = match.slice(1);
    return process.env[envVar] || "";
  });
};
