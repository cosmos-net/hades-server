module.exports = {
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/src/modules/core/$1',
    '^@common/(.*)$': '<rootDir>/src/modules/common/$1',
    '^@user/(.*)$': '<rootDir>/src/modules/user/$1',
    '^@role/(.*)$': '<rootDir>/src/modules/role/$1',
    '^@assignment/(.*)$': '<rootDir>/src/modules/assignment/$1',
    '^@permission/(.*)$': '<rootDir>/src/modules/permission/$1',
    '^@policy/(.*)$': '<rootDir>/src/modules/policy/$1',
    '^@helpers/(.*)$': '<rootDir>/src/helpers/$1',
  },
};
