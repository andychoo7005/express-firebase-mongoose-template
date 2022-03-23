module.exports = {
  env: {
    browser: false,
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'plugin:import/recommended'],
  parserOptions: {
    ecmaVersion: 12,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['#config/*', './src/config'],
          ['#controllers/*', './src/controllers'],
          ['#dtos/*', './src/dtos'],
          ['#helpers/*', './src/helpers'],
          ['#loaders/*', './src/loaders'],
          ['#middlewares/*', './src/middlewares'],
          ['#models/*', './src/models'],
          ['#services/*', './src/services'],
          ['#utils/*', './src/utils'],
          ['#resources/*', './src/resources'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
    },
  },
};
