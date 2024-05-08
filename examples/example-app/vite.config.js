import { defineConfig } from "vite";
import elmPlugin from "vite-plugin-elm";

export default defineConfig(({ mode }) => {
  const isDev = mode == "development";
  return {
    clearScreen: false,
    server: {
      strictPort: true,
    },

    build: {
      minify: "esbuild",
      outDir: "../dist",
    },
    root: "src",
    plugins: [
      elmPlugin({
        debug: isDev,
        optimize: !isDev,
      }),
    ],
  };
});
