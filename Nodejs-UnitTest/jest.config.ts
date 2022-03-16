import { pathsToModuleNameMapper } from 'ts-jest/utils';
import { compilerOptions } from './tsconfig.json';

export default {
  testEnvironment: 'node',
  //preset: '@shelf/jest-mongodb',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '/test/.*\\.(spec|test)\\.[tj]sx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  //testResultsProcessor: 'jest-sonar-reporter',
  //moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
