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
    .transform((obj) => {
      return { url: obj.url, redirectFrom: obj.redirectFrom, urlOnly: false };
    }),
  z
    .object({
      urlOnly: z.string(),
      redirectFrom: z.optional(z.array(z.string())).default([]),
    })
    .transform((obj) => {
      return {
        url: obj.urlOnly,
        redirectFrom: obj.redirectFrom,
        urlOnly: true,
      };
    }),
]);

export const AppConfig = z.object({
  pages: mapObject(PageConfig),
});

export const AssetConfig = mapObject(
  z.object({
    src: z.string(),
    onServer: z.string(),
  })
);

export const GraphQLConfig = z.object({
  schema: z.string(),
  namespace: z.string().optional(),
  header: z.array(z.string()),
  generateMocks: z.boolean().optional(),
  queries: z.string().optional(),
  globalFragments: z.string().optional(),
  existingEnumDefinitions: z.string().optional(),
});

export const DocsConfig = z.object({
  src: z.string(),
  modules: z.array(z.string()).optional().default([]),
});

const Color = z.object({
  hex: z.string(),
  name: z.string(),
});

const FontDetails = z.object({
  size: z.number().int(),
  weight: z.number().int().optional(),
});

export const Font = z.object({
  font: z.array(z.string()),
  sizes: mapObject(FontDetails),
});

export const Border = z.object({
  width: z.number(),
  rounded: z.number().optional(),
});

export const ThemeConfig = z.object({
  colors: mapObject(Color),
  spacing: mapObject(z.number()),
  typography: mapObject(mapObject(Font)),
  borders: mapObject(Border),
});

export const Config = z.object({
  src: z.optional(z.string()).default("src"),
  js: z.optional(z.string()).default("src-js"),
  app: z.optional(AppConfig),
  assets: z.optional(AssetConfig),
  theme: z.optional(ThemeConfig),
  graphql: z.optional(GraphQLConfig),
  docs: z.optional(DocsConfig),
});

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
