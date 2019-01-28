import babel from "rollup-plugin-babel"
import commonjs from "rollup-plugin-commonjs"
import resolve from "rollup-plugin-node-resolve"
import pkg from "./package.json"

export default [
  // browsers
  {
    input: `source/main.js`,
    output: {
      name: `simpleDifference`,
      file: pkg.browser,
      format: `umd`,
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: [ `node_modules/**` ],
      }),
    ],
  },
  // node and bundlers
  {
    input: `source/main.js`,
    external: Object.keys(pkg.dependencies || {}),
    output: [
      { file: pkg.main, format: `cjs` },
      { file: pkg.module, format: `es` },
    ],
    plugins: [
      babel({
        exclude: [ `node_modules/**` ],
      }),
    ],
  },
]
