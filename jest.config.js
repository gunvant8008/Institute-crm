/** @type {import('ts-jest').JestConfigWithTsJest} */

const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});
// Add any custom config to be passed to Jest
const customJestConfig = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "./tsconfig.jest.json" }],
  },
  setupFilesAfterEnv: ["<rootDir>./src/jest.setup.ts"],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);

// module.exports = {
//   preset: "ts-jest",
//   testEnvironment: "jsdom",
//   transform: {
//     "^.+\\.tsx?$": ["ts-jest", { tsconfig: "./tsconfig.jest.json" }]
//   },
//   setupFilesAfterEnv: ["<rootDir>./src/jest.setup.ts"],
//   coverageThreshold: {
//     global: {
//       branches: 50,
//       functions: 50,
//       lines: 50,
//       statements: 50
//     }
//   },

//   moduleNameMapper: {
//     "^@/(.*)$": "<rootDir>/src/$1"
//   },
// globals: {
//   "ts-jest": {
//     isolatedModules: true
//   }
// }
// }
