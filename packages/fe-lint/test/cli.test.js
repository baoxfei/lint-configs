const execa = require('execa');
const pkg = require('../package.json');
const fs = require('fs-extra');
const path = require('path');
// import execa from 'execa';
// import pkg from '../package.json';
// import fs from 'fs-extra';
// import path, { dirname } from 'path';
// import { fileURLToPath } from 'url';

// // 获取当前模块的文件名
// const __filename = fileURLToPath(import.meta.url);
// // 获取当前模块的目录名
// const __dirname = dirname(__filename);

const cli = (args, options) => {
  return execa('node', [path.resolve(__dirname, '../lib/cli.js'), ...args], options);
};

test('--version should out right version', async () => {
  const { stdout } = await cli('--version');
  expect(stdout).toBe(pkg.version);
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
