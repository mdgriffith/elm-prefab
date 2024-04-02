export type Config = {
  src?: string;
  js?: string;
  app?: AppOptions;
  routes?: any;
  assets?: any;
  theme?: any;
  graphql?: any;
};

export type AppOptions = {};

export type ThemeOptions = {};

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
