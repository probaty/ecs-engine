
import { defineConfig } from "tsup"

export default defineConfig({
  name: "engine",
  target: "es2020",
  // splitting: false,
  // skipNodeModulesBundle: true,
  dts: true, // Generate .d.ts files
  minify: true, // Minify output
  sourcemap: true, // Generate sourcemaps
  treeshake: true, // Remove unused code
  splitting: false, // Split output into chunks
  clean: true, // Clean output directory before building
  // entryPoints: ["./addons/index.ts", "./components/index.ts", "./systems/index.ts"],
  // entry: ["./addons/index.ts", "./components/index.ts", "./systems/index.ts"],
  entry: ["./packages/ecs/index.ts", "./packages/engine/systems/index.ts", "./packages/engine/addons/index.ts", "./packages/engine/components/index.ts"],
  // entryPoints: ["./index.ts"],
  outDir: "./dist",
  format: ["cjs", "esm"],
})
