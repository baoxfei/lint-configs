/** @type {import('stylelint').Config} */
module.exports = {
  defaultSeverity: 'warning',
  plugins: ['stylelint-scss'],
  rules: {
    /**
     * Possible errors
     * @link https://stylelint.io/user-guide/rules/#possible-errors
     */
    'block-no-empty': null,
    'color-no-invalid-hex': true,
    'comment-no-empty': true,
    'functino-calc-no-unspaced-operator': true,
    'media-feature-name-no-unknown': true,
    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignore: [
          'consecutive-duplicates-with-same-prefixless-values',
          'consecutive-duplicates-with-different-values',
        ],
      },
    ], // css property duplicates
    'keyframe-declaration-no-important': true,
    'function-linear-gradient-no-nonstandard-direction': true,
    'no-invalid-double-slash-comments': true, // 不用双斜杠 进行注释
    'declaration-block-no-shorthand-property-overrides': true,
    'font-family-no-duplicate-names': true,
    'function-calc-no-unspaced-operator': true,
    'function-linear-gradient-no-nonstandard-direction': true,
    'keyframe-declaration-no-important': true,
    'media-feature-name-no-unknown': true,
    'no-descending-specificity': null, // @reason 实际有很多这样用的，且多数人熟悉 css 优先级
    'no-duplicate-at-import-rules': true,
    'no-duplicate-selectors': true,
    'no-empty-source': null,
    'no-extra-semicolons': true,
    'no-invalid-double-slash-comments': true,
    'property-no-unknown': true,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local', 'export'],
      },
    ], // todo 自定义的伪类 :--global-class
    'selector-pseudo-element-no-unknown': true, // 自定义的伪元素
    'string-no-newline': true,
    'unit-no-unknown': [
      true,
      {
        ignoreUnits: ['rpx'],
      },
    ],
    // 特殊供应商提供的 语法 比如 @-webkit-keyfreame @document
    'at-rule-no-vendor-prefix': null,
    // 禁止使用相对协议的url/根据当前页面的协议
    'function-url-no-scheme-relative': null,
    'at-rule-empty-line-before': 'always',
    indentation: 2,
    'block-closing-brace-newline-before': 'always-multi-line',
    'block-closing-brace-space-before': 'always-single-line',
    'block-opening-brace-newline-after': 'always-multi-line',
    'block-opening-brace-space-before': 'always',
    'block-opening-brace-space-after': 'always-single-line',
    'color-hex-case': 'lower',
    'color-hex-length': 'short',
    'comment-whitespace-inside': 'always',
    'declaration-colon-space-before': 'never',
    'declaration-colon-space-after': 'always',
    'declaration-block-single-line-max-declarations': 1,
    'length-zero-no-unit': [
      true,
      {
        ignore: ['custom-properties'],
      },
    ],
    'max-line-length': 100,
    'selector-max-id': 1,

    /**
     * stylelint-scss rules
     * @link https://www.npmjs.com/package/stylelint-scss
     */
    'scss/double-slash-comment-whitespace-inside': 'always',
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
};
