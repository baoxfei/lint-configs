module.exports = {
  extends: ['../index.js', '../typescript/index.js'].map(require.resolve),
};
