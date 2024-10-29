import { sync } from 'fast-glob';
import markdownlint from 'markdownlint';
import { join, resolve } from 'path';
import { Config, PKG, ScanOptions } from '../../types';

type LintOptions = markdownlint.Options & { fix?: boolean };

export default function (opt: ScanOptions, pkg: PKG, config: Config) {
  const lintConfig: LintOptions = {
    fix: !!opt.fix,
    resultVersion: 3,
  };
  if (config.markdownlintOptions) {
    Object.assign(lintConfig, config.markdownlintOptions);
  } else {
    const configFiles = sync('.markdownlint(.@(yaml|yml|json))', {
      cwd: opt.cwd,
    });
    if (configFiles.length === 0) {
      // 没有config文件 则使用默认的
    } else {
      // 有config文件则使用
      lintConfig.config = markdownlint.readConfigSync(resolve(opt.cwd, configFiles[0]));
    }
  }
  return lintConfig;
}
