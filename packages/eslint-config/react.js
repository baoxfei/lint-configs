module.exports = {
  extends: ['./rules/react.js', './index.js'].map(require.resolve),
  parserOptions: {
    babelOptions: ['@babel/preset-react'],
  },
};
