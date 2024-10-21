# markdownlint-config-lx

> lx markdownlint 共享配置

## 使用

```bash
npm install --save-dev markdownlint @baoxf/markdownlint-config
```

安装完成之后 在 `.markdownlint.json` 配置如下

```json
{
  "extends": "markdownlint-config-lx"
}
```

## 解释

1. ul-style 无序列表 使用什么
   List style (string, default consistent, values asterisk / consistent(一直使用一种) / dash / plus / sublist)

2. MD010 no-hard-tabs
   不允许使用tab 进行缩进

3. MD011 no-reversed-links
   链接在 () 里，文字在 [] 里

4. MD014 Dollar signs used before commands without showing output
   在文档中为了展示命令，很多人习惯性地在命令前加上 $，但如果仅展示命令而不展示其输出，添加 $ 符号会带来困惑，因为这意味着命令行的提示符。如果只展示命令的时候，不建议使用 $，如果有输出 可以使用 $ 。

5. MD034 Bare URL used
   单独的写链接 需要加上, 例如：<https://www.example.com>

6. MD054: Reference links and images should use a label that is defined
   引用链接 需要 已经定义好的标签

   ```md
    这是一个[链接][已定义标签]。

    ![图片描述][已定义图片标签]

    [已定义标签]: https://example.com
    [已定义图片标签]: https://example.com/image.png
   ```

7. MD053 Link and image reference definitions should be needed
  标签定义了应该使用

## 总述

markdownlint 主要就是对 table、whitespace、title、img、ul、strong、emphasis和代码块等书写的规范和建议

table： 上下有`black_line`、需要有 ｜ 作为表格的开始和结尾、每一行列一致

img：要有alt、 

link： 超链接 要使用 `[]()`、单独链接要使用 `<>`、

title：一页开头 需要是 一级标题、标题不要跳级、开头有空格、结尾不能有标点、使用 `#` 代表标题、不能有emphasis、上下有 `black_line`

ul： 有序 要有序、无序用 `-`、上下有 `black_line`

code-block: 使用 ` ```js ` 作为代码块、上下有 `black_line`
