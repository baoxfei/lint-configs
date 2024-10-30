import fs from 'fs-extra';
import { Config, PKG, ScanOptions } from './../../types';
import { ESLint } from 'eslint';
import { ESLINT_FILE_EXT } from '../../utils/constants';
import { sync } from 'fast-glob';
import { resolve } from 'path';

export default function (options: ScanOptions, pkg: PKG, config: Config) {
  const { fix, cwd, ignore } = options;
  const eslintConfig: ESLint.Options = {
    cwd,
    fix,
    ignore,
    extensions: ESLINT_FILE_EXT,
    errorOnUnmatchedPattern: false,
  };

  if (config.eslintOptions) {
    Object.assign(eslintConfig, config.eslintOptions);
  } else {
    // 判断是否有 eslint 文件
    // 判断pkg 是否有eslint
    // 判断是否有ignore
    // const

    const configFiles = sync('.eslintrc(.@(js|json|yml|yaml))', { cwd });

    // todo
    if (configFiles.length === 0 && !pkg.eslintConfig) {
      eslintConfig.baseConfig = {
        extends: [],
      };
    }

    const ignorePath = resolve(cwd, '.eslintignore');
    if (!fs.existsSync(ignorePath) && !pkg.eslintIgnore) {
      eslintConfig.ignorePath = resolve(__dirname, '../config/_eslintignore.ejs');
    }
  }
  return eslintConfig;
}
