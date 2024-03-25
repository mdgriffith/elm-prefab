export enum GeneratorType {
  DataRetrieval = 0,
  Standard = 1,
}

export type RunOptions = { internalSrc: string; js: string; src: string };

export type Generator = {
  name: string;
  generatorType: GeneratorType;
  init: (options: RunOptions) => void;
  run: (options: RunOptions) => Promise<Summary>;
};

export interface SummaryMap {
  [key: string]: Summary;
}

export type Summary = { errors: Error[] } | { generated: Generated[] };

export type Error = { title: string; description: string };
export type Generated = { outputDir: string; path: string };
