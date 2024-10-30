import fg from 'fast-glob';
import { extname, join } from 'path';
import { PKG, ScanOptions, ScanResult } from './../../types';
import { ESLINT_FILE_EXT, ESLINT_IGNORE_PATTERN } from '../../utils/constants';
import { ESLint } from 'eslint';
import getESLintConfig from './getESLintConfig';
import formatEsLintResult from './formatEsLintResult';

interface DoESLintOptions extends ScanOptions {
  pkg: PKG;
}

// 1. 获取 files
// 2. 初始化 eslint
// 3. 通过eslint 获取 result

export default async function (options: DoESLintOptions): Promise<ScanResult[]> {
  let files = [];
  if (Array.isArray(options.files)) {
    files = options.files.filter((filename) => ESLINT_FILE_EXT.includes(extname(filename)));
  } else {
    const patten = join(
      options.cwd,
      `**/*.${ESLINT_FILE_EXT.map((ext) => ext.replace(/^\./, '')).join(',')}`,
    );
    files = await fg(patten, {
      cwd: options.include,
      ignore: ESLINT_IGNORE_PATTERN,
    });
  }

  const eslint = new ESLint(getESLintConfig(options, options.pkg, options.config));

  const reports = await eslint.lintFiles(files);

  if (options.fix) {
    await ESLint.outputFixes(reports);
  }

  return formatEsLintResult(reports, options.quiet, eslint);
}
