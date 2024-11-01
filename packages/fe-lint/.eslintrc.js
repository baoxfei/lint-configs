module.exports = {
  extends: ['@bxf1234/eslint-config/typescript/node'],
  overrides: [
    {
      files: ['test/**/*'],
      env: {
        jest: true,
      },
    },
  ],
};
