import { ScanOptions } from './../../types';
import * as prettier from 'prettier';
import path, { extname } from 'path';
import { readFile, writeFile } from 'fs-extra';
import { PRETTIER_FILE_EXT, PRETTIER_IGNORE_PATTERN } from '../../utils/constants';
import fg from 'fast-glob';

export default async function (options: ScanOptions) {
  // const filepath = path.join(options.cwd, '.prettierrc.js');
  let files = [];
  if (options.files) {
    files.filter((filename) => PRETTIER_FILE_EXT.includes(extname(filename)));
  } else {
    const partten = path.join(
      options.include,
      `**/*.${PRETTIER_FILE_EXT.map((ext) => ext.replace('/^./', '')).join(',')}`,
    );
    files = await fg(partten, { cwd: options.cwd, ignore: PRETTIER_IGNORE_PATTERN });
  }
  return Promise.all(files.map(formatFile));
}

async function formatFile(filePath) {
  const text = await readFile(filePath, 'utf8');
  const options = await prettier.resolveConfig(filePath);
  const formatted = await prettier.format(text, options);
  return writeFile(filePath, formatted, 'utf8');
}
