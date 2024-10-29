import { Config, PKG, ScanOptions } from './../../types';
import { ESLint } from 'eslint';
import { ESLINT_FILE_EXT } from '../../utils/constants';

export default function (options: ScanOptions, pkg: PKG, config: Config) {
  const { fix, cwd, ignore } = options;
  const eslintConfig: ESLint.Options = {
    cwd,
    fix,
    ignore,
    extensions: ESLINT_FILE_EXT,
    errorOnUnmatchedPattern: false,
  };
}
