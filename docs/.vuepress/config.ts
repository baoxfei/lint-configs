import { viteBundler } from "@vuepress/bundler-vite";
import { defaultTheme, SidebarArrayOptions } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";
import { searchPlugin } from "@vuepress/plugin-search";

export default defineUserConfig({
  bundler: viteBundler({
    viteOptions: {
      publicDir: "/lint-configs/",
    },
  }),
  plugins: [
    searchPlugin({
      locales: {
        "/": {
          placeholder: "搜索",
        },
      },
    }),
  ],
  locales: {
    "/": {
      title: "前端lint规范化",
      lang: "zh-cn",
      description: "前端编码规范工程化",
    },
  },
  theme: defaultTheme({
    logo: "https://vuejs.org/images/logo.png",
    logoAlt: "lint配置",
    navbar: [
      {
        text: "首页",
        link: "/",
      },
      {
        text: "编码规范",
        prefix: "/coding/",
        children: [
          { text: "HTML 编码规范", link: "html.md" },
          { text: "CSS 编码规范", link: "css.md" },
          { text: "JavaScript 编码规范", link: "javascript.md" },
          { text: "Typescript 编码规范", link: "typescript.md" },
          { text: "Node 编码规范", link: "node.md" },
        ],
      },
      {
        text: "工程规范",
        prefix: "/engineering/",
        children: [
          { text: "Git 规范", link: "git.md" },
          { text: "文档规范", link: "doc.md" },
          // { text: "CHANGELOG 规范", link: "/engineering/changelog.md" },
        ],
      },
      {
        text: "NPM包",
        prefix: "/npm/",
        children: [
          { text: "eslint-config", link: "eslint.md" },
          { text: "stylelint-config", link: "stylelint.md" },
          { text: "commitlint-config", link: "commitlint.md" },
          { text: "markdownlint-config", link: "markdownlint.md" },
          { text: "eslint-plugin", link: "eslint-plugin.md" },
        ],
      },
      // {
      //   text: "脚手架",
      //   children: [{ text: "encode-fe-lint", link: "/cli/encode-fe-lint.md" }],
      // },
    ],
    sidebar: [
      {
        text: "编码规范",
        prefix: "/coding/",
        link: "/coding/",
        children: [
          {
            text: "HTML 编码规范",
            link: "html.md",
          },
          {
            text: "CSS 编码规范",
            link: "css.md",
          },
          {
            text: "JavaScript 编码规范",
            link: "javascript.md",
          },
          {
            text: "Typescript 编码规范",
            link: "typescript.md",
          },
          {
            text: "Node 编码规范",
            link: "node.md",
          },
        ],
      },
      {
        text: "工程规范",
        prefix: "/engineering/",
        link: "/engineering/",
        children: [
          {
            text: "Git 规范",
            link: "git.md",
          },
          {
            text: "文档规范",
            link: "doc.md",
          },
        ],
      },
      {
        text: "NPM包",
        prefix: "/npm/",
        link: "/npm/",
        children: [
          { text: "eslint-config", path: "/npm/eslint.md" },
          { text: "stylelint-config", path: "/npm/stylelint.md" },
          { text: "commitlint-config", path: "/npm/commitlint.md" },
          { text: "markdownlint-config", path: "/npm/markdownlint.md" },
          { text: "eslint-plugin", path: "/npm/eslint-plugin.md" },
        ],
      },
    ] as SidebarArrayOptions,
    repo: "https://github.com/baoxfei/lint-configs.git",
  }),
  head: [],
});
