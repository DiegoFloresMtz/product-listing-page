import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
    dir: './',
});

const customJestConfig: Config = {
    setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    setupFiles: ['<rootDir>/jest.setup.js'],
    testEnvironmentOptions: {
        customExportConditions: [''],
    },
};

export default createJestConfig(customJestConfig); 