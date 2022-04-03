import type { Config } from '@jest/types';
import { defaults } from 'jest-config';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'jsx', 'ts', 'tsx'],
  //
  automock: false,
  clearMocks: true,
  // collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  // transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      diagnostics: {
        warnOnly: true,
      },
    },
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: -10,
  //   },
  // },
  // injectGlobals: true,
  transform: {
    '^.+\\.(js|jsx|ts|tsx)?$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],

  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/fileMock.js',
    '\\.css$': '<rootDir>/src/__mocks__/fileMock.js',
    '@reframework/classNames':
      '<rootDir>/node_modules/@reframework/classNames/dist/index.js',
  },
};

export default config;
