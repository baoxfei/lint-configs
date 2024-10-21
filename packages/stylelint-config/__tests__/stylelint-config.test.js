const assert = require('assert');
const stylelint = require('stylelint');
const path = require('path');

describe('stylelint-config test', () => {
  it('validate css', async () => {
    const configFilePath = path.join(__dirname, '../index.js');
    const result = await stylelint.lint({
      configFile: configFilePath,
      files: [path.join(__dirname, './fixtures/index.css')],
      fix: false,
    });
    console.log(result);
  });
});
