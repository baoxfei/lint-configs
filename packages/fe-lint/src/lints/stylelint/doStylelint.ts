import { extname, join } from 'path';
import { PKG, ScanOptions, ScanResult } from '../../types';
import { STYLELINT_FILE_EXT, STYLELINT_IGNORE_PATTERN } from '../../utils/constants';
import fg from 'fast-glob';
import stylelint from 'stylelint';
import getStyleLintConfig from './getStyleLintConfig';
import formatStyleLintResult from './formatStyleLintResult';

export interface DoStylelintOptions extends ScanOptions {
  pkg: PKG;
}

export default async function (options: DoStylelintOptions): Promise<ScanResult[]> {
  let files: string[];
  if (options.files) {
    files = options.files.filter((name) => STYLELINT_FILE_EXT.includes(extname(name)));
  } else {
    const pattern = join(
      options.include,
      `**/*.{${STYLELINT_FILE_EXT.map((t) => t.replace(/^\./, '')).join(',')}}`,
    );
    files = await fg(pattern, {
      cwd: options.cwd,
      ignore: STYLELINT_IGNORE_PATTERN,
    });
  }

  const data = await stylelint.lint({
    ...getStyleLintConfig(options, options.pkg, options.config),
    files,
  });

  return formatStyleLintResult(data.results, options.quiet);
}
