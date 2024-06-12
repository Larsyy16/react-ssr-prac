import esbuild from "esbuild";
import { copy } from "esbuild-plugin-copy";

esbuild
  .build({
    entryPoints: ["./src/App.jsx"],
    bundle: true,
    outfile: "./dist/bundle.js",
    plugins: [
      copy({
        resolveFrom: "cwd",
        assets: {
          from: ["./public/**/*"],
          to: ["./dist"],
        },
      }),
    ],
  })
  .catch(() => process.exit(1));
