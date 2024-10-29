import { glob } from 'fast-glob';
import fs from 'fs-extra';
import path from 'path';
import ejs from 'ejs';
import { mergeWith } from 'lodash';

import {
  ESLINT_IGNORE_PATTERN,
  STYLELINT_FILE_EXT,
  STYLELINT_IGNORE_PATTERN,
  MARKDOWN_LINT_IGNORE_PATTERN,
} from './constants';

/**
 * 合并 vscode 的配置项
 */
function mergeVSCodeConfig(filepath: string, content: string) {
  if (!fs.existsSync(filepath)) return content;

  try {
    const targetData = fs.readJSONSync(filepath);
    const sourceData = JSON.parse(content);
    return JSON.stringify(
      mergeWith(targetData, sourceData, (target, source) => {
        if (Array.isArray(target) && Array.isArray(source)) {
          return [...new Set([...source, target])];
        }
      }),
      null,
      2,
    );
  } catch (error) {
    return '';
  }
}

export default function (cwd: string, config: Record<string, boolean>, vscode?: boolean) {
  const configPath = path.resolve(__dirname, '../config');
  const templates = glob.sync(`${vscode ? '_vscode' : '**'}/*.ejs`, { cwd: configPath });
  for (let name of templates) {
    const filepath = path.resolve(cwd, name.replace(/\.ejs$/, '').replace(/^_/, '.'));
    let content = ejs.render(fs.readFileSync(path.resolve(configPath, name), 'utf8'), {
      eslintIgnores: ESLINT_IGNORE_PATTERN,
      stylelintExt: STYLELINT_FILE_EXT,
      stylelintIgnores: STYLELINT_IGNORE_PATTERN,
      markdownLintIgnores: MARKDOWN_LINT_IGNORE_PATTERN,
      ...config,
    });

    // 合并 vscode config
    if (/^_vscode/.test(name)) {
      content = mergeVSCodeConfig(filepath, content);
    }

    if (!content.trim()) continue;
    // 原生的fs模块 writeFileSync 如果文件不存在会报错
    fs.outputFileSync(content, filepath, 'utf8');
  }
}
