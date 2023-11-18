
module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '@cfg/(.*)': '<rootDir>/src/config/$1',
    '@app/(.*)': '<rootDir>/src/$1',
    '@cmn/(.*)': '<rootDir>/src/common/$1',
  },
};
