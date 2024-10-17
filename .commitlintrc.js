// .commitlintrc.js
/** @type {import('cz-git').UserConfig} */
module.exports = {
  extends: ["./packages/commitlint-config/index.js"],
  prompt: {
    useEmoji: true,
  },
};
