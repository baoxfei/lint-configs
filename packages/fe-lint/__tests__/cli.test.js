const package = require('../package.json');
const execa = require('execa');
const fs = require('fs-extra');
const path = require('path');

const cli = (args, options) => {
  return execa('node', [path.resolve(__dirname, '../lib/cli.js'), ...args], options);
};

test('--version should out right version', async () => {
  const { stdout } = await cli('--version');
  expect(stdout).toBe(package.version);
});

describe(`'exec' command`, () => {
  const semverRegex = /(\d+)\.(\d+).(\d+)/;

  test(`'exec eslint' should work as expected`, async () => {
    const { stdout } = await cli(['exec', 'eslint', '-v']);
    expect(stdout).toMatch(semverRegex);
  });

  test(`'exec stylelint' should work as expected`, async () => {
    const { stdout } = await cli(['exec', 'stylelint', '-v']);
    expect(stdout).toMatch(semverRegex);
  });

  test(`'exec markdownlint' should work as expected`, async () => {
    const { stdout } = await cli(['exec', 'markdownlint', '-v']);
    expect(stdout).toMatch(semverRegex);
  });
});
