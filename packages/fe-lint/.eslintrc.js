module.exports = {
  extends: ['@bxf1234/typescript/node'],
  overrides: [
    {
      files: ['test/**/*'],
      env: {
        jest: true,
      },
    },
  ],
};
