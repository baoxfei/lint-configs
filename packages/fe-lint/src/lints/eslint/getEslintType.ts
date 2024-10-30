import { sync } from 'fast-glob';
import { PKG } from '../../types';

export default function (cwd: string, pkg: PKG) {
  const tsFiles = sync('./!(node_modules)/**/*.@(ts|tsx)', { cwd });
  const reactFiles = sync('./!(node_modules)/**/*.@(jsx|tsx)', { cwd });
  const vueFiles = sync('./!(node_modules)/**/*.vue', { cwd });
  const language = tsFiles.length > 0 ? 'typescript' : '';
  const dependencies = Object.keys(pkg.dependencies || {});
  let dsl = '';

  if (reactFiles.length > 0 || dependencies.some((name) => /^react(-|$)/.test(name))) {
    dsl = 'react';
  } else if (vueFiles.length > 0 || dependencies.some((name) => /^vue(-|$)/.test(name))) {
    dsl = 'vue';
  }

  if (language && dsl) {
    return `@bxf1234/eslint-config/${language}/${dsl}`;
  }

  if (dsl) {
    return `@bxf1234/eslint-config/${dsl}`;
  }
  return '@bxf1234/eslint-config';
}
