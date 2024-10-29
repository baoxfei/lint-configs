import { async } from 'fast-glob';
import { PKG, ScanOptions, ScanResult } from '../types';
import path from 'path';
import fs from 'fs-extra';
import { PKG_NAME } from '../utils/pkg';
import { doStylelint, doEslint, doMarkdownlint, doPrettier } from '../lints';

export default async (options: ScanOptions): Promise<ScanResult> => {
  const { cwd, fix, config: scanConfig } = options;
  const readConfigFile = (pth: string): any => {
    const localPath = path.resolve(cwd, pth);
    return fs.existsSync(localPath) ? require(localPath) : {};
  };
  const pkg: PKG = readConfigFile('package.json');
  const config: ScanOptions['config'] = scanConfig || readConfigFile(`${PKG_NAME}.config.js`);

  let results: ScanResult[] = [];

  const runErrors: Error[] = [];

  if (fix && config.enablePrettier !== false) {
    await doPrettier(options);
  }

  // eslint
  if (config.enableESLint !== false) {
    try {
      const eslintResults = await doEslint({ ...options, pkg, config });
      results = results.concat(eslintResults);
    } catch (e) {
      runErrors.push(e);
    }
  }

  // stylelint
  if (config.enableStylelint !== false) {
    try {
      const stylelintResults = await doStylelint({ ...options, pkg, config });
      results = results.concat(stylelintResults);
    } catch (e) {
      runErrors.push(e);
    }
  }

  // markdown
  if (config.enableMarkdownlint !== false) {
    try {
      const markdownlintResults = await doMarkdownlint({ ...options, pkg, config });
      results = results.concat(markdownlintResults);
    } catch (e) {
      runErrors.push(e);
    }
  }
  return null;
};
