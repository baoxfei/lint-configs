import ora from 'ora';
import { PKG_NAME } from './utils/pkg';
import initAction from './actions/init';
import scanAction from './actions/scan';
import type { ScanOptions, InitOptions } from './types';

export const init = (options: InitOptions) => {
  return initAction({
    ...options,
    checkVersionUpdate: false,
  });
};

export const scan = async (options: ScanOptions) => {
  try {
    const checking = ora();
    checking.start(`开始执行 ${PKG_NAME} 代码检测`);
    const { runErrors, results, errorCount, warningCount } = await scanAction(options);

    let type = 'success';
    if (runErrors.length > 0 || errorCount > 0) {
      type = 'fail';
    } else if (warningCount > 0) {
      type = 'warn';
    }
    checking[type]();
    return results;
  } catch (error) {}
};
