module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['./'],
    silent: false,
    verbose: true,
    collectCoverageFrom: [
        '**/*.ts',
        '!**/*.test.ts',
        '!**/*.spec.ts',
        '!**/node_modules/**',
        '!**/types.ts',
        '!**/config.ts',
    ],
    coverageReporters: ['text'],
    coverageThreshold: {
        global: {
          lines: 90
        }
      }
  };
  