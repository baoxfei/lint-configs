import { execSync } from 'child_process';
import ora from 'ora';

import npmType from '../utils/npm-type';
import { PKG_VERSION, PKG_NAME } from './../utils/pkg';
import log from '../utils/log';

// 使用 包管理工具获取当前包的version
async function checkVersionUpdate() {
  try {
    const npm = await npmType;
    log.info('latestVersion start');
    const latestVersion = execSync(`${npm} view ${PKG_NAME} version`).toString().trim();
    // const latestVersion = '1.0.0';
    log.info('latestVersion end');
    if (latestVersion === PKG_VERSION) return null;

    const compareArr = PKG_VERSION.split('.').map(Number);
    const beComparedArr = latestVersion.split('.').map(Number);

    // 依次比较版本号每一位大小
    for (let i = 0; i < compareArr.length; i++) {
      if (compareArr[i] > beComparedArr[i]) {
        return null;
      } else if (compareArr[i] < beComparedArr[i]) {
        return latestVersion;
      }
    }
  } catch (error) {
    console.log(error.toString(), 'checkVersionUpdate');
  }
}

export default async function (isInstall?: boolean) {
  const checking = ora(`[${PKG_NAME}] 正在检查最新版本...`);
  checking.start();
  try {
    const npm = await npmType;
    const latestVersion = await checkVersionUpdate();
    checking.stop();
    if (latestVersion && isInstall) {
      const update = ora(`[${PKG_NAME}] 存在新版本，将升级至 ${latestVersion}`);
      update.start();
      execSync(`${npm} i -g ${PKG_NAME}`);
      update.stop();
    } else if (latestVersion) {
      log.warn(
        `当前最新版本为 ${latestVersion}，本地版本为 ${PKG_VERSION},请尽快升级到最新版本。\n你可以执行 ${npm} install -g ${PKG_NAME}@latest 来安装此版本\n`,
      );
    } else if (isInstall) {
      log.warn('当前为最新版本');
    }
  } catch (error) {
    checking.stop();
    log.error(`更新失败：${error.toString()}`);
  }
}
