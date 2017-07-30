import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/teslabus.js',
  dest: 'build/teslabus.js',
  format: 'iife',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
};
