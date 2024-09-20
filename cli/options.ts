import { z } from "zod";
import * as Project from "./project";
import * as fs from "fs";
import Chalk from "chalk";

const mapObject = (parser: any) => {
  return z.object({}).catchall(parser);
};

export const PageConfig = z.union([
  z.string().transform((url) => {
    return { url: url, redirectFrom: [], urlOnly: false };
  }),
  z
    .object({
      url: z.string(),
      redirectFrom: z.optional(z.array(z.string())).default([]),
    })
    .strict()
    .transform((obj) => {
      return { url: obj.url, redirectFrom: obj.redirectFrom, urlOnly: false };
    }),
  z
    .object({
      urlOnly: z.string(),
      redirectFrom: z.optional(z.array(z.string())).default([]),
    })
    .strict()
    .transform((obj) => {
      return {
        url: obj.urlOnly,
        redirectFrom: obj.redirectFrom,
        urlOnly: true,
      };
    }),
]);

export const AppConfig = z
  .object({
    pages: mapObject(PageConfig),
  })
  .strict();

export const AssetConfig = mapObject(
  z
    .object({
      src: z.string(),
      onServer: z.string(),
    })
    .strict(),
);

export const GraphQLConfig = z
  .object({
    schema: z.string(),
    namespace: z.string().optional(),
    header: z.array(z.string()),
    generateMocks: z.boolean().optional(),
    queries: z.string().optional(),
    globalFragments: z.string().optional(),
    existingEnumDefinitions: z.string().optional(),
  })
  .strict();

export const DocsConfig = z
  .object({
    src: z.string(),
    modules: z.array(z.string()).optional().default([]),
  })
  .strict();

const Swatch = mapObject(z.string());

const FontDetails = z
  .object({
    size: z.number().int(),
    lineHeight: z.number().optional(),
    weight: z.number().int().optional(),
    weights: z.array(z.number().int()).optional(),
    variant: z.string().optional(),
    variants: z.array(z.string()).optional(),
  })
  .strict();

export const Font = z
  .object({
    font: z.array(z.string()),
    capitalSizing: z
      .object({
        top: z.number().optional(),
        bottom: z.number().optional(),
        fontSizeByCapital: z.number().optional(),
      })
      .optional(),

    sizes: mapObject(FontDetails),
  })
  .strict();

export const BorderConfig = z
  .object({
    radius: mapObject(z.number()).optional(),
    width: mapObject(z.number()).optional(),
  })
  .strict();

// special keys of color/active/hover/focus
type ColorTree = { [key: string]: ColorTree } | string;

export const ColorTree: z.ZodType<ColorTree> = z
  .string()
  .or(mapObject(z.lazy(() => ColorTree)));

export const ColorAliasTheme = z.object({
  text: ColorTree.optional(),
  background: ColorTree.optional(),
  border: ColorTree.optional(),
});

export const ThemeConfig = z
  .object({
    colors: mapObject(z.string().or(Swatch)).optional(),
    themes: mapObject(ColorAliasTheme).optional(),
    spacing: mapObject(z.number()).optional(),
    typography: z.array(Font).optional(),
    borders: BorderConfig.optional(),
  })
  .strict();

export enum PackageManager {
  NPM = "npm",
  PNPM = "pnpm",
  BUN = "bun",
  YARN = "yarn",
  Manual = "manual",
}

const PackageManagerSchema = z.nativeEnum(PackageManager);

export const Config = z
  .object({
    packageManager: PackageManagerSchema.optional().default(PackageManager.NPM),
    src: z.optional(z.string()).default("src/app"),
    js: z.optional(z.string()).default("src"),
    app: z.optional(AppConfig),
    assets: z.optional(AssetConfig),
    theme: z.optional(ThemeConfig),
    graphql: z.optional(GraphQLConfig),
    docs: z.optional(DocsConfig),
  })
  .strict();

export type Config = z.infer<typeof Config>;
export type PageOptions = {
  url: string;
  redirectFrom: string[];
  urlOnly: boolean;
};

export type AppOptions = { pages: { [key: string]: PageOptions } };

export type ThemeOptions = z.infer<typeof ThemeConfig>;
export type GraphQLOptions = z.infer<typeof GraphQLConfig>;

export const toUrl = (path: string) => {
  return {
    url: path,
    redirectFrom: [],
    urlOnly: false,
  };
};

export const toUrlOnly = (path: string) => {
  return {
    url: path,
    redirectFrom: [],
    urlOnly: true,
  };
};

/*  RUNTIME OPTIONS */

export enum GeneratorType {
  DataRetrieval = 0,
  Standard = 1,
}

export type RunOptions = {
  initializing: boolean;
  generateDefaultFiles: boolean;
  activePlugins: string[];
  project: Project.Status;
  internalSrc: string;
  js: string;
  src: string;
  root: string;
};

export type Generator = {
  name: string;
  generatorType: GeneratorType;
  run: (options: RunOptions) => Promise<Summary>;
};

export interface SummaryMap {
  [key: string]: Summary;
}

export type Summary = { errors: Error[] } | { generated: Generated[] };

export type Error = { title: string; description: string };
export type Generated = { outputDir: string; path: string };

export const addGenerated = (
  summary: Summary,
  generatedFile: Generated,
): Summary => {
  if ("generated" in summary) {
    summary.generated.push(generatedFile);
  }
  return summary;
};

export const mergeSummaries = (one: Summary, two: Summary): Summary => {
  if ("errors" in one) {
    return one;
  }

  if ("errors" in two) {
    return two;
  }

  return { generated: one.generated.concat(two.generated) };
};

// Read/WRite Config
//

function getValueByPath(obj: any, path: (string | number)[]) {
  // Start with the initial object
  let current = obj;

  // Iterate over the path array
  for (const key of path) {
    // Check if the key exists in the current object/array
    if (current !== null && current !== undefined && key in current) {
      // Move to the next part of the object/array
      current = current[key];
    } else {
      // If the path is not valid, return null
      return null;
    }
  }

  // Return the found value, or null if any key was not found
  return current;
}
const quote = (s: string | number): string => {
  if (typeof s === "string") {
    return `"${s}"`;
  } else {
    return s.toString();
  }
};

const jsonPathToString = (path: (string | number)[]): string => {
  return path.map((p) => Chalk.yellow(quote(p))).join(".");
};

const renderExample = (path: (string | number)[]): string => {
  const example = getValueByPath(examples, path);
  if (example === null) {
    return "";
  }

  return ` Here's an example of what I'm expecting at ${jsonPathToString(
    path,
  )}:\n${JSON.stringify(example, null, 2)}`;
};

const formatError = (issue: z.ZodIssue, issueDescription: string): string => {
  return `${issueDescription} at ${jsonPathToString(issue.path)}${errorFollowup(
    issue,
  )}`;
};

const reportIssue = (issue: z.ZodIssue): string => {
  return formatError(issue, errorDescription(issue));
};

const errorFollowup = (issue: z.ZodIssue): string => {
  switch (issue.code) {
    case z.ZodIssueCode.unrecognized_keys:
      return ". Maybe it's in the wrong place or needs to be removed?";

    case z.ZodIssueCode.invalid_type:
      let followup = "";
      if (issue.message == "Required") {
        followup = ", but a value is required.";
      }
      return followup + renderExample(issue.path);
    default:
      return ". " + renderExample(issue.path);
  }
};

const errorDescription = (issue: z.ZodIssue): string => {
  switch (issue.code) {
    case z.ZodIssueCode.invalid_type:
      return `I found ${issue.received}`;

    case z.ZodIssueCode.custom:
      return issue.message;

    case z.ZodIssueCode.invalid_union:
      return "I don't recognize this";

    case z.ZodIssueCode.unrecognized_keys:
      if (issue.keys.length === 1) {
        return `I don't recognize the field "${Chalk.yellow(issue.keys[0])}"`;
      } else {
        return `I don't recognize the following fields: ${issue.keys
          .map(Chalk.yellow)
          .join(", ")}`;
      }

    case z.ZodIssueCode.invalid_enum_value:
      return `I was expecting one of these values: ${issue.options.join(", ")}`;

    case z.ZodIssueCode.invalid_string:
      return `I found a string that's in the wrong format(expecting ${issue.validation})`;

    case z.ZodIssueCode.invalid_date:
      return "I found an invalid date";

    case z.ZodIssueCode.too_small:
      return "I found a value that's too small";

    case z.ZodIssueCode.too_big:
      return "I found a value that's too big";

    case z.ZodIssueCode.invalid_return_type:
      return issue.code;

    case z.ZodIssueCode.not_multiple_of:
      return `I found a value that's not a multiple of ${issue.multipleOf}`;

    default:
      return issue.code;
  }
};

export const readConfig = async (filepath: string): Promise<Config | null> => {
  if (!fs.existsSync(filepath)) {
    return null;
  }
  let config = null;
  try {
    config = JSON.parse(fs.readFileSync(filepath, "utf-8"));
  } catch (e) {
    console.log(`Elm Prefab

    I tried to read your ${Chalk.yellow(
      "elm.generate.json",
    )} file doesn't look like valid JSON.
`);
    process.exit(1);
  }

  config = Config.safeParse(config);

  if (config.success) {
    return config.data;
  } else {
    let issueCount = "an issue";
    if (config.error.issues.length > 1) {
      issueCount = "a few issues";
    }

    let message = `I tried to read your ${Chalk.yellow(
      "elm.generate.json",
    )} file but found ${issueCount}.

`;
    for (const issue of config.error.issues) {
      message = message + reportIssue(issue) + "\n\n";
    }
    console.log(message);
    process.exit(1);
  }
};

// Write Config
export const writeConfig = (config: Config) => {
  // Slow, but we know for sure we have a deep clone and no lingering references
  const clone: any = JSON.parse(JSON.stringify(config));

  if (clone.app) {
    Object.keys(clone.app.pages).forEach(function (pageName) {
      const page = clone.app.pages[pageName];

      let redirectFrom =
        //@ts-ignore
        page.redirectFrom.length == 0 ? undefined : page.redirectFrom;

      if (!page.urlOnly && page.redirectFrom.length === 0) {
        clone.app.pages[pageName] = page.url;
      } else if (page.urlOnly) {
        clone.app.pages[pageName] = {
          urlOnly: page.url,
          redirectFrom: redirectFrom,
        };
      } else {
        clone.app.pages[pageName] = {
          url: page.url,
          redirectFrom: redirectFrom,
        };
      }
    });
  }

  fs.writeFileSync("elm.generate.json", JSON.stringify(clone, null, 2));
};
