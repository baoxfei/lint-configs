import fs from 'fs-extra';
import path from 'path';

const pkgJson = fs.readJsonSync(path.join(__dirname, '../../package.json'));

export const PKG_NAME = pkgJson.name;

export const PKG_VERSION = pkgJson.version;
