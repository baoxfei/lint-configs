import { STYLELINT_IGNORE_PATTERN } from './../../utils/constants';
import { Config, PKG, ScanOptions } from '../../types';
import { LinterOptions } from 'stylelint';
import { sync } from 'fast-glob';
import { resolve } from 'path';
import fs from 'fs-extra';

export default function (options: ScanOptions, pkg: PKG, config: Config): LinterOptions {
  if (config.enableStylelint === false) return {};
  const lintConfig: LinterOptions = {
    fix: !!options.fix,
    allowEmptyInput: true,
  };
  if (config) {
    Object.assign(lintConfig, config.stylelintOptions);
  } else {
    const configFiles = sync('.stylelintrc?(.@(json|js|yml|yaml))', { cwd: options.cwd });
    if (configFiles.length === 0 && !pkg.stylelint) {
      // 读取默认
    }
    // ignore 配置
    const ignoreFilePath = resolve(options.cwd, '.stylelintignore');
    if (!fs.existsSync(ignoreFilePath)) {
      lintConfig.ignorePattern = STYLELINT_IGNORE_PATTERN;
    }
    return lintConfig;
  }
}
