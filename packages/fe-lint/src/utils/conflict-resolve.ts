/**
 * 改文件主要是将项目本来存在的linter 配置删除 重写预制好的linter
 * 找到所有与linter相关的配置文件 待删除
 * package.json找到与linter相关的依赖 待删除
 * package.json 删除对应的 eslintConfig stylelintConfig
 * 找到可配置文件模版
 * 1. 提示 是否允许覆盖
 * 2. 删除操作
 * 3. 重写package.json
 */

import fs from 'fs-extra';
import path from 'path';
import glob from 'glob';
import { confirm } from '@inquirer/prompts';

import { PKG } from '../types';
import log from './log';
import { PKG_NAME } from './pkg';

// 精确移除依赖
const packageNamesToRemove = [
  '@babel/eslint-parser',
  '@commitlint/cli',
  '@iceworks/spec',
  'babel-eslint',
  'eslint',
  'husky',
  'markdownlint',
  'prettier',
  'stylelint',
  'tslint',
];

// 按前缀移除依赖
const packagePrefixesToRemove = [
  '@commitlint/',
  '@typescript-eslint/',
  'eslint-',
  'stylelint-',
  'markdownlint-',
  'commitlint-',
];

/**
 * 待删除的无用配置
 * @param cwd
 */
function checkUselessConfig(cwd: string): string[] {
  return []
    .concat(glob.sync('.eslintrc?(.@(yaml|yml|json))', { cwd }))
    .concat(glob.sync('.stylelintrc?(.@(yaml|yml|json))', { cwd }))
    .concat(glob.sync('.markdownlint@(rc|.@(yaml|yml|jsonc))', { cwd }))
    .concat(
      glob.sync('.prettierrc?(.@(cjs|config.js|config.cjs|yaml|yml|json|json5|toml))', { cwd }),
    )
    .concat(glob.sync('tslint.@(yaml|yml|json)', { cwd }))
    .concat(glob.sync('.kylerc?(.@(yaml|yml|json))', { cwd }));
}

/**
 * 有覆盖的文件
 * @param cwd
 */
function checkReWriteConfig(cwd: string) {
  return glob
    .sync('**/*.ejs', { cwd: path.resolve(__dirname, '../config') })
    .map((name) => name.replace(/^_/, '.').replace(/\.ejs$/, ''))
    .filter((filename) => fs.existsSync(path.resolve(cwd, filename)));
}

export default async function (cwd: string, rewriteConfig?: boolean) {
  // 改的是项目里的pkg
  const pkg: PKG = fs.readJsonSync(path.join(cwd, 'package.json'));
  const dependencies = [].concat(
    Object.keys(pkg.dependencies || {}),
    Object.keys(pkg.devDependencies || {}),
  );

  const willRemovePackage = dependencies.filter(
    (d) => packageNamesToRemove.includes(d) || packagePrefixesToRemove.some((v) => d.startsWith(v)),
  );
  const uselessConfig = checkUselessConfig(cwd);
  const reWriteConfig = checkReWriteConfig(cwd);
  const changeCount = uselessConfig.length + willRemovePackage.length + reWriteConfig.length;
  if (changeCount > 0) {
    log.warn(`检测到项目中存在可能与 ${PKG_NAME} 冲突的依赖和配置，为保证正常运行将`);

    if (willRemovePackage.length > 0) {
      log.warn('删除以下依赖');
      log.warn(JSON.stringify(willRemovePackage, null, 2));
    }

    if (uselessConfig.length > 0) {
      log.warn('删除以下配置文件：');
      log.warn(JSON.stringify(uselessConfig, null, 2));
    }

    if (reWriteConfig.length > 0) {
      log.warn('覆盖以下配置文件：');
      log.warn(JSON.stringify(reWriteConfig, null, 2));
    }

    if (typeof rewriteConfig === 'undefined') {
      const isOverWrite = await confirm({
        message: '请确认是否继续：',
      });
      if (!isOverWrite) process.exit(0);
    } else if (!rewriteConfig) {
      process.exit(0);
    }
  }
}
