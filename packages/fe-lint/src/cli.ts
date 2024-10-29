#!/usr/bin/env node
import { program } from 'commander';
import path from 'path';
import fs from 'fs-extra';
import spawn from 'cross-spawn';
import glob from 'fast-glob';

import generateTemplate from './utils/generate-template';
import init from './actions/init';
import { PKG_VERSION, PKG_NAME } from './utils/pkg';
import update from './actions/update';
import npmType from './utils/npm-type';

const cwd = process.cwd();

async function installDepsIfThereNo() {
  const paths = []
    .concat(glob.sync('.eslintrc?(.@(js|json|ymal|yml))', { cwd }))
    .concat(glob.sync('.stylelintrc?(.@(js|json|yml|ymal))', { cwd }))
    .concat(glob.sync('.markdownlint(.@(yaml|yml|json))', { cwd }));
  if (paths.length > 0 && !fs.existsSync(path.resolve(cwd, 'node_modules'))) {
    const npm = await npmType;
    spawn.execSync(npm, ['i']);
  }
}

program
  .version(PKG_VERSION)
  .description(
    `${PKG_NAME} 收敛各种linter的工具，能够为项目配置git commit 卡点，降低项目实施的成本`,
  );

program
  .command('--linter-init')
  .description('一键接入：为项目初始化工具和配置，可以根据项目的类型和需求进行定制')
  .option('--vscode', '生成.vscode/setting.json配置')
  .action(async (cmd) => {
    const configPath = path.resolve(cwd, `${PKG_NAME}.config.js`);
    if (!fs.existsSync(configPath)) {
      return init({
        cwd,
        checkVersionUpdate: true,
      });
    }
    generateTemplate(cwd, require(configPath), cmd.vscode);
  });

program
  .command('init')
  .description('一键生成： 生成预制的初始化模版文件')
  .action(async () => {
    // todo: 生成模版
  });

program
  .command('scan')
  .description('一键扫描：对项目进行代码规范问题扫描')
  .option('-q, --quiet', '仅报告错误信息，默认为false')
  .option('-o, -output-report', '输出扫描出的规范问题日志')
  .option('-i, --include <dirpath>', '指定扫描文件')
  .option('--no-ignore', '忽略eslint 的 ignore配置文件和配置规则')
  .action(async (cmd) => {
    await installDepsIfThereNo();
  });

program
  .command('fix')
  .description('一键修复：自动修复项目的代码规范扫描问题')
  .option('-i, --include <dirpath>', '指定扫描文件')
  .option('--no-ignore', '忽略eslint 的 ignore配置文件和配置规则')
  .action(async (cmd) => {
    await installDepsIfThereNo();
  });

program
  .command('update')
  .description('检测当前版本并更新')
  .action(() => {
    update(true);
  });
