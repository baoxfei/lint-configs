import fg from 'fast-glob';
import { extname, join } from 'path';
import { ScanResult, ScanOptions, PKG, Config } from '../../types';
import { MARKDOWN_LINT_FILE_EXT, MARKDOWN_LINT_IGNORE_PATTERN } from '../../utils/constants';
import getMarkdownLintConfig from './getMarkdownLintConfig';
import markdownlint, { LintError, LintResults } from 'markdownlint';
import { applyFixes } from 'markdownlint/helpers';
import formatMarkdonwLintResult from './formatMarkdonwLintResult';
import fs from 'fs-extra';

export interface DoMarkdownlintOptions extends ScanOptions {
  pkg: PKG;
}

export default async function (options: DoMarkdownlintOptions): Promise<ScanResult[]> {
  const { cwd } = options;
  let files = [];
  if (options.files) {
    files = options.files.filter((file) => MARKDOWN_LINT_FILE_EXT.includes(extname(file)));
  } else {
    const pattern = join(
      options.include,
      `**/*.${MARKDOWN_LINT_FILE_EXT.map((ext) => ext.replace(/^\./, '')).join(',')}`,
    );
    files = await fg(pattern, {
      cwd,
      ignore: MARKDOWN_LINT_IGNORE_PATTERN,
    });
  }

  const results = await markdownlint.promises.markdownlint({
    ...getMarkdownLintConfig(options, options.pkg, options.config),
    files,
  });

  if (options.fix) {
    await Promise.all(
      Object.keys(results).map((filename) => formatMarkdownFile(filename, results[filename])),
    );
  }

  return formatMarkdonwLintResult(results, options.quiet);
}

async function formatMarkdownFile(filename, errors: LintError[]) {
  const content = await fs.readFile(filename, 'utf8');
  const fixes = errors?.filter((error) => error.fixInfo);

  if (fixes?.length > 0) {
    const fixesApplied = applyFixes(content, fixes);
    if (fixesApplied) {
      await fs.writeFile(filename, fixesApplied, 'utf8');
      return errors.filter((error) => !error.fixInfo);
    }
  }
  return errors;
}
