const { compilerOptions } = require('./tsconfig.json')

const prepareModuleName = Object.keys(compilerOptions.paths)
  .map(path => ({
    [path.replace('*', '(.*)$').replace('@', '^@')]:
      `<rootDir>/${compilerOptions.paths[path]}`.replace('*', '$1')
  }))
  .reduce(
    (obj, key) => ({
      ...obj,
      ...key
    }),
    {}
  )

module.exports = {
  testPathIgnorePatterns: ['/node_modules', '/dist/', '/.husky/'],
  collectCoverageFrom: ['/src/**/*.ts'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  clearMocks: true,
  coverageDirectory: 'coverage',
  collectCoverage: true,
  coverageProvider: 'v8',
  coverageReporters: ['text', 'text-summary', 'lcov', 'html'],
  moduleNameMapper: prepareModuleName,
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  moduleFileExtensions: ['js', 'json', 'ts']
}