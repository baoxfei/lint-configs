# `commitlint-config`

> commitlint 自定义扩展

## 安装

使用时，需要安装 [@commitlint/cli](https://www.npmjs.com/package/@commitlint/cli)：

```bash
npm i --save-dev @baoxf/commitlint-config @commitlint/cli
```

## 使用

在`commitlint.config.js` 中集成本包

```js
// commitlint.config.js
module.export = {
  extends: ['commitlint-config-lx'],
};
```

## 设置 git hook

可通过 [husky](https://www.npmjs.com/package/husky) 设置在 `git commit` 时触发 `commitlint`。

首先安装 husky：

```bash
npm install husky --save-dev
```

然后执行添加`commit-msg`:

```bash
npx husky add .husky/commit-msg 'npx commitlint --edit $1'
```

更多信息可参考 [commitlint 文档](https://commitlint.js.org/#/guides-local-setup?id=install-husky)。
