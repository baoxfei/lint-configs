# learn

## basic

1. version 不提供代表： lerna 多包的版本号不一样
2. "preinstall": "npx only-allow pnpm", 指定 包管理工具是pnpm

3. lerna.json 里面也是有 workspaces 和 public 但是我们使用package.json

4. 多包 a 引入b 包 是通过软链的形式 (类似npm link )

## secondary

1. 为什么不建议使用id选择器 是因为id选择器 会去匹配所有的id选择器的声明 所有内容进行遍历 会消耗性能
2. stylelint
   1. block 阻塞开发的问题 error
   2. major 会影响开发内容的问题 warning

## third

1. 开源包 使用脚本 prepublicOnly: "npm run test"

## 疑惑

1. lerna run test 和 lerna clean 为啥不run 估计是内部处理

   1. lerna 没有 run 这个命令 走的是子包的test的命令

2. lerna create 新创一个包

## 面试

1. 个人编码能力 `Linter`、`CLI`、`Typescript`、Node 实战
2. 面试的前端深度体现 工程化方面
3. 对于前端整体的理解 业务研发 =》 前端架构 通过工具约束前端开发的张力 保证了项目标准的规范化

## 微前端

### 具备能力

微前端 必须要要做的事情

js css 隔离

预加载

通信机制

公共依赖

子应用嵌套

子应用并行

### 微前端框架

#### iframe

1. 优点

   1. js css 隔离

2. 缺点
   1. url 不同步 刷新状态丢失
   2. ui不同步 dom结构不共享
   3. 全局上下文隔离 状态不共享
   4. 慢 加载慢

#### single-spa

#### 样式隔离方案

1. vue scoped

   ```vue
   <style scoped>
   .example {
   }
   </style>

   <!-- 编译后 -->

   <style>
   .example[data-xxx] {
   }
   </style>
   ```

2. shadow dom

3. single-spa-css

#### js 隔离方案

1. proxy 隔离方案
2. iframe
3. spingle-spa

#### qiankun

- 通过import-html-entry
- fetch entry 获取应用资源
- 拿到 html processtpl style scripts
- 收集资源 获取所有css 通过shadow dom方式塞入到对应的应用
- 收集资源 js 通过requestIdleCallback 对资源 async
- js 字符串 通过eval 来执行js 通过proxy改变window的指向

1. 样式隔离

   1. 通过shadow dom

2. js隔离

- es6 通过proxy 进行代理
- 支持子应用单实例沙箱 legacySandbox
- 多实例 ProxySandbox
- SnapshotSandbox

3. 通信机制

观察者模式

setGlobalState

onGlobalStateChange

### EMP

### wujie

同源的iframe 可以进行通信 ？

白屏问题 预加载

通信方式： eventBus window.parent
既要iframe的优势 原生 成本低 又要微前端的

### wujie 和 qiankun的 对比

1. wujie 的社区不够活跃 不成熟

重构如何解决 css 隔离，js隔离 公共依赖 公共的数据 和

**需要了解shadowDom和webComponent**
