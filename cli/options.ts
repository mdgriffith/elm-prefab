import { z } from "zod";

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
    .strict()
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
    weight: z.number().int().optional(),
    weights: z.array(z.number().int()).optional(),
    variant: z.string().optional(),
    variants: z.array(z.string()).optional(),
  })
  .strict();

export const Font = z
  .object({
    font: z.array(z.string()),
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
    colors: mapObject(z.string().or(Swatch)),
    themes: mapObject(ColorAliasTheme).optional(),
    spacing: mapObject(z.number()),
    typography: z.array(Font),
    borders: BorderConfig,
  })
  .strict();

export const Config = z
  .object({
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
  generatedFile: Generated
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
