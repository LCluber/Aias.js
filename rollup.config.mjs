import progress from "rollup-plugin-progress";
import sizes from "rollup-plugin-sizes";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import analyze from "rollup-plugin-analyzer";

const limitBytes = 1e6;

const onAnalysis = ({ bundleSize }) => {
  if (bundleSize < limitBytes) return;
  console.log(`Bundle size exceeds ${limitBytes} bytes: ${bundleSize} bytes`);
  return process.exit(1);
};

module.exports = {
  input: "src/ts/build/es6/aias.js",
  output: {
    name: "Aias",
    file: "src/ts/build/aias.js",
    format: "es"
  },
  external: ["@lcluber/weejs", "@lcluber/chjs", "@lcluber/mouettejs", "rxjs"],
  plugins: [
    progress({
      clearLine: false // default: true
    }),
    sizes(),
    sizeSnapshot(),
    analyze({ onAnalysis, skipFormatted: false })
  ]
};
