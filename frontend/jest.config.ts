module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], 
};

  