
# Git 规范

## git message 规范

### 1.1 前言

为什么需要Git `message` 规范

1. 更方便、快捷地浏览和了解项目的历史信息
2. 有利于保证提交内容的独立性，避免把所有改动都放在一个提交里面
3. 便于通过脚本自动化生成 `CHANGELOG`

### 1.2 Git message 的组成

```
<type>[optional scope]: <subject>

[optional body]

[optional footer(s)]
```

其中 `message header`（即首行）必选，scope、body 和 footer 可选。

#### 1.2.1 字数限制

- header： 只有一行不超过50个字符
- body： 每行不超过 72 个字符
- footer： 每行不超过 72 个字符

> 为什么又字数限制？
>
> - header： 像 Linux、Git 这样的开源项目，是以邮件列表作为代码评审的平台，header 要作为邮件的标题，而邮件标题本身就有长度的限制，并且标题太长也不利于浏览和信息获取。
> - body 和 footer：源于大部分编程语言的编码规范，最初源于打字机宽度等物理设备的限制，后来慢慢成为默认遵守的规范。


### 1.3 `message header` 规范

#### 1.3.1 type

`type`: 可选范围

- `feat`: 新增功能
- `fix`: 修复 bug
- `docs`: 文档相关的改动
- `style`: 对代码格式化的改动,代码逻辑并未发生变动（比如删除分号之类的）
- `test`: 测试用例相关
- `chore`: 项目工程方面的改动，代码逻辑并未发生变化
- `revert`: 恢复代码之前的提交
- `refactor`: 重构或优化

> 注意
>
> `css` 相关修改 并不是使用的 `style` 而是使用的  `feat` 和 `fix`

#### 1.3.2 scope

`scope` 描述本次改动的功能模块，视具体模块来确定

在lerna 多项目的情况下，`scope` 可以取值`commitlint-config`、`eslint-config`等 

#### 1.3.3 subject

subject 用来描述本次改动的内容，需要注意的点：

1. 时态方面使用一般现在时，不要使用过去时。虽然查看 `message` 时，`message` 内容本身都发生在过去，然而对于主题来说，使用现在时的时态更简洁明确，并且更易达成一致性：

   ```
    // good
    docs: delete redundant docs

    // bad
    docs: deleted redundant docs
   ```

2. 句式使用祈使句。即一般情况不要增加主语。因为在绝大情况下，主语都是作者『我』：

   ```
    // good
    docs: delete redundant docs

    // bad
    docs: i delete redundant docs
   ```

3. 句首无需大写，句尾无需结束标点。因为主题（或标题）本身不用形成完整的句子：

   ```
    // good
    docs: delete redundant docs

    // bad
    docs: Delete redundant docs.
   ```

### git footer 常用场景

1. 当前场景是破坏性改动 `BREAKING CHANGE`
2. 引用相关的 issue 或 pull request: `Close fix Resolve`

## 2. git 分支 规范

目前互联网和社区中流传最广泛的一个分支模型 [Git Flow](https://github.com/nvie/gitflow) 出自 [a-successful-git-branching-model](https://nvie.com/posts/a-successful-git-branching-model/) 这篇十年前的文章，文章作者 Vincent Driessen 在 2020 年三月份的时候已经公开表示，该分支模型已经不适用于现如今持续交付的软件工程方式，推荐在持续交付的软件工程中使用更简单的 [Github Flow](https://guides.github.com/introduction/flow/) 模型。

### 2.1 新建分支规范

推荐{type}/{需求号｜功能模块}-name-date

- type: 1.3.1 所述的type
- 需求号｜功能模块： 确定你要做的内容
- name： 开发者名称 可选
- date： 日期

## Git tag 命名规范

`Git tag` 就是通过语义化的名称来给仓库标注一个个具体的节点。与此同时还可以根据标签名称来大致了解当前项目的兼容性和迭代情况。

命名格式为 `v{semver}`，`semver` 是遵循 [semantic version](https://semver.org/lang/zh-CN/) 的版本号，例如 `v1.2.3`。

相比于使用例如 `git tag v1.2.3` 这种「轻量标签」，更推荐使用如下命令生成「附注标签」：

`git tag -a v1.2.3 -m "发布经销商管理模块"`

## 参考资料

1. [AngularJS 代码贡献指南][angular-contributing]
2. [AngularJS Git Commit Message Conventions][angular-git-conventions]
3. [Karma 的 Git 日志规范][karma-git-msg]
4. [StackOverflow - 在 Git 日志中我该用过去时态还是现在时态？][stackoverflow-git-msg]
5. [一个成功的 Git 分支模型][a-successful-git-branching-model]
6. [Git 基础打标签][git-basic-tag]
7. [每行字符数][cpl]
8. [Conventional Commits][conventionalcommits]

[angular-contributing]: https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md
[stackoverflow-git-msg]: http://stackoverflow.com/questions/3580013/should-i-use-past-or-present-tense-in-git-commit-messages
[karma-git-msg]: http://karma-runner.github.io/0.13/dev/git-commit-msg.html
[angular-git-conventions]: https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#heading=h.j8e4paqkfz0q
[a-successful-git-branching-model]: https://nvie.com/posts/a-successful-git-branching-model/
[git-basic-tag]: https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%89%93%E6%A0%87%E7%AD%BE
[cpl]: https://en.wikipedia.org/wiki/Characters_per_line
[conventionalcommits]: https://www.conventionalcommits.org