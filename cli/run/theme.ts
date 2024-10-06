import * as Options from "../options";
import * as Generator from "./run_generator";
import * as ThemeStatic from "../templates/theme/copyAll";
import * as Copy from "../copy";
import * as ThemeCustomizables from "../templates/theme/customizable";

const defaultSpacings: { [key: string]: number } = {
  zero: 0,
  sm3: 4,
  sm2: 8,
  sm: 12,
  md: 16,
  lg: 24,
  lg2: 32,
  lg3: 40,
};

const defaultBorderWidths: { [key: string]: number } = {
  sm: 1,
  md: 2,
  lg: 4,
};

const defaultBorderRadii: { [key: string]: number } = {
  sm: 4,
  md: 8,
  lg: 16,
};

const defaultTypography = {
  font: ["Lato", "Roboto", "sans-serif"],
  sizes: {
    h1: { size: 24, weight: 900 },
    h2: { size: 18, weight: 900 },
    h3: { size: 16, weight: 700 },
    h4: { size: 12, weight: 700, variant: "small-caps" },
    default: { size: 14, weights: [400, 700], lineHeight: 1.6 },
    sm: { size: 12, weights: [400, 700], lineHeight: 1.5 },
  },
};

const defaultCodeTypography = {
  font: ["IBM Plex Mono"],
  sizes: {
    code: { size: 14, weights: [400], lineHeight: 1.6 },
  },
};

const defaultTheme = {
  default: {
    text: { default: "700", light: "600" },
    background: {
      default: "200",
    },
    border: {
      default: "300",
      light: "200",
    },
  },
};

const defaultColors = {
  grey: {
    "900": "#121214",
    "800": "#27272F",
    "700": "#53535F",
    "600": "#72727E",
    "500": "#B1B1B8",
    "400": "#CECED6",
    "300": "#E5E5EA",
    "200": "#F3F4F6",
    "100": "#FAFAFC",
  },
  purple: {
    "700": "#3B2D96",
    "600": "#4530CC",
    "500": "#6049F5",
    "400": "#BBB1FC",
    "300": "#E6E3FC",
    "200": "#F8F5FF",
  },
};

const guaranteeDefaults = (options: Options.ThemeOptions) => {
  if (!options.spacing) {
    options.spacing = defaultSpacings;
  }

  if (!options.borders) {
    options.borders = {};
  }

  if (!options.borders.width) {
    options.borders.width = {};
  }
  if (!options.borders.radius) {
    options.borders.radius = {};
  }
  for (const key in defaultBorderWidths) {
    if (!(key in options.borders.width)) {
      // @ts-ignore
      options.borders.width[key] = defaultBorderWidths[key];
    }
  }
  for (const key in defaultBorderRadii) {
    if (!(key in options.borders.radius)) {
      // @ts-ignore
      options.borders.radius[key] = defaultBorderRadii[key];
    }
  }

  if (!options.typography) {
    options.typography = [];
    options.typography.push(defaultTypography);
    options.typography.push(defaultCodeTypography);
  }

  if (!options.colors) {
    options.colors = defaultColors;
  }

  if (!options.themes) {
    options.themes = defaultTheme;
  }
};

export const generator = (options: Options.ThemeOptions): Options.Generator => {
  return {
    name: "theme",
    generatorType: Options.GeneratorType.Standard,
    copy: (runOptions: Options.RunOptions) => {
      let summary: Options.Summary = { generated: [] };
      if (options.target == Options.ThemeTarget.ElmUI) {
        summary = Copy.copyCustomizables(ThemeCustomizables.all, runOptions);
      }

      if (runOptions.generateDefaultFiles) {
        ThemeStatic.copy(runOptions, summary);
      }
    },
    run: async (runOptions: Options.RunOptions) => {
      const summary: Options.Summary = { generated: [] };

      guaranteeDefaults(options);

      const newSummary = await Generator.run(runOptions.internalSrc, {
        theme: options,
      });

      console.log("Generated for theme", newSummary);

      return Options.mergeSummaries(summary, newSummary);
    },
  };
};
