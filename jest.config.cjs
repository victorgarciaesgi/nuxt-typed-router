const { compilerOptions } = require('./tsconfig');
module.exports = {
  preset: '@nuxt/test-utils',
  moduleFileExtensions: ['js', 'ts', 'json'],
  testRegex: '(/__tests__/.+|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testURL: 'http://localhost/',
  collectCoverage: false,
  transformIgnorePatterns: ['/node_modules/(?!lodash-es|log-symbols)/'],
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
    },
  },
  testEnvironment: 'jsdom',
};
