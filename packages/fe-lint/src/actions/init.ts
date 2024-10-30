// init config 模版 的大体流程
// 1. 检测当前版本 是否更新
// 2. 检测当前使用的包管理工具
// 3. 通过inquire 问答式 得出配置选项
// 4. 根据配置选项进行生成模版
import path from 'path';
import fs from 'fs-extra';
import { select, confirm } from '@inquirer/prompts';
import spawn from 'cross-spawn';

import update from './update';
import generateTemplate from '../utils/generate-template';
import { Config, InitOptions } from './../types';
import { PROJECT_TYPES } from './../utils/constants';
import conflictResolve from '../utils/conflict-resolve';
import log from '../utils/log';
import npmType from '../utils/npm-type';
import { PKG_NAME } from '../utils/pkg';

let step = 0;
/**
 * 选择eslint type
 */
function chooseEslintType(): Promise<string> {
  return select({
    message: `Step ${++step}. 请选择项目的语言（JS/TS）和框架（React/Vue）类型：`,
    choices: PROJECT_TYPES,
  });
}

/**
 * 选择是否启用 stylelint
 */
function chooseStylelint(): Promise<boolean> {
  return confirm({
    message: `Step：${++step}, 是否需要配置stylelint （若没有样式文件，则不需要配置）`,
    default: true,
  });
}

/**
 * 选择是否启用 markdownlint
 */
function chooseEnableMarkdownLint(): Promise<boolean> {
  return confirm({
    message: `Step：${++step}, 是否需要配置MarkdownLint （若没有md 文件，则不需要配置）`,
    default: true,
  });
}

/**
 * 选择是否启用 prettier
 */
function chooseEnablePrettier(): Promise<boolean> {
  return confirm({
    message: `Step：${++step}, 是否需要使用 Prettier 格式化代码：`,
    default: true,
  });
}

export default async function (options?: InitOptions) {
  const cwd = options.cwd || process.cwd();
  const disableNpmInstall = options.disableNpmInstall || true;

  const pkgPath = path.resolve(cwd, './package.json');
  const isTest = process.env.NODE_ENV === 'test';
  let pkgJson = fs.readJsonSync(pkgPath);

  if (!isTest) {
    update(false);
  }

  const config: Record<string, any> = {};

  if (typeof options.enableESLint === 'boolean') {
    config.enableESLint = options.enableESLint;
  } else {
    config.enableESLint = true;
  }

  if (options.eslintType && PROJECT_TYPES.find((n) => n.value === options.eslintType)) {
    config.eslintType = options.eslintType;
  } else {
    config.eslintType = await chooseEslintType();
  }

  // 初始化 `enableStylelint`
  if (typeof options.enableStylelint === 'boolean') {
    config.enableESLint = options.enableESLint;
  } else {
    config.enableESLint = await chooseStylelint();
  }

  // 初始化 `enableMarkdownlint`
  if (typeof options.enableMarkdownlint === 'boolean') {
    config.enableMarkdownlint = options.enableMarkdownlint;
  } else {
    config.enableMarkdownlint = await chooseEnableMarkdownLint();
  }

  // 初始化 `enablePrettier`
  if (typeof options.enablePrettier === 'boolean') {
    config.enablePrettier = options.enablePrettier;
  } else {
    config.enablePrettier = await chooseEnablePrettier();
  }

  // 解决 dep 依赖冲突
  // 判断是否安装
  if (!isTest) {
    log.info(`Step ${++step}. 检查并处理项目中可能存在的依赖和配置冲突`);
    pkgJson = conflictResolve(cwd, options.rewriteConfig);
    log.success(`Step ${++step}. 冲突解决完毕`);
    if (!disableNpmInstall) {
      log.info(`Step ${++step}, 安装依赖`);
      const npm = await npmType;
      spawn.sync(npm, ['-i', '-D', PKG_NAME], { stdio: 'inherit', cwd });
      log.info(`Step ${++step}, 依赖安装完成`);
    }
  }

  // 插入git 卡点
  pkgJson = fs.readJSONSync(cwd, 'package.json');

  // 在scripts 写入对应的脚本文件
  if (!pkgJson['scripts']) {
    pkgJson['scripts'] = {};
  }
  if (!pkgJson['scripts'][`${PKG_NAME}-scan`]) {
    pkgJson['scripts'][`${PKG_NAME}-scan`] = `${PKG_NAME} scan`;
  }
  if (!pkgJson['scripts'][`${PKG_NAME}-fix`]) {
    pkgJson['scripts'][`${PKG_NAME}-fix`] = `${PKG_NAME} fix`;
  }

  // 在 husky中写入git commit卡点
  log.info(`Step ${++step}. 配置 git commit 卡点`);
  if (!pkgJson['husky']) {
    pkgJson['husky'] = {};
  }
  if (!pkgJson.husky.hooks) pkgJson.husky.hooks = {};
  pkgJson.husky.hooks['pre-commit'] = `${PKG_NAME} commit-file-scan`;
  pkgJson.husky.hooks['commit-msg'] = `${PKG_NAME} commit-msg-scan`;
  log.success(`Step ${++step}. 配置 git commit 卡点写入成功`);

  fs.writeJSONSync(pkgPath, JSON.stringify(pkgJson, null, 2));

  log.info(`${++step} 写入配置文件`);
  generateTemplate(cwd, config);
  log.success(`${++step} 配置文件写入成功`);

  log.success('配置完成');
}
