module.exports = {
  parserPreset: "conventional-changelog-conventionalcommits",
  rules: {
    "type-empty": [2, "never"],
    "type-enums": [
      2,
      "always",
      ["feat", "fix", "chore", "refactor", "docs", "style", "test"],
    ],
    "type-case": [2, "always", "low-case"],
    "subject-case": [2, "always", "low-case"],
    "subject-empty": [2, "never"],
    "subject-max-length": [2, "always", 60],
    "body-leading-blank": [1, "always"], // 需要以空白行开头
    "body-max-line-length": [2, "always", 100],
    "footer-leading-blank": [1, "always"],
    "footer-max-line-length": [2, "always", 100],
    "header-max-length": [2, "always", 100],
    "scope-case": [2, "always", "lower-case"],
  },
};
