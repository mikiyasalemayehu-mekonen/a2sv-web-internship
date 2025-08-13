/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.jest.json" }],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^next/image$": "<rootDir>/test/__mocks__/next-image.tsx",
  },
  setupFilesAfterEnv: ["<rootDir>/test/setupTests.ts"],
  transformIgnorePatterns: [
    "/node_modules/(?!(@testing-library|next)/)",
    "\\.pnp\\.[^\\/]+$",
  ],
};
