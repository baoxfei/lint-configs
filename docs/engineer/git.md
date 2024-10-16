
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

## git 分支 规范

## git tag 规范