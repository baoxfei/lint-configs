

# learn

## basic

1. version 不提供代表： lerna 多包的版本号不一样
    
2. "preinstall": "npx only-allow pnpm", 指定 包管理工具是pnpm

3. lerna.json 里面也是有 workspaces 和 public 但是我们使用package。json

4. 多包 a 引入b 包 是通过软链的形式 (类似npm link )

## secondary

1. 为什么不建议使用id选择器 是因为id选择器 会去匹配所有的id选择器的声明 所有内容进行遍历 会消耗性能
2. stylelint
   1. block 阻塞开发的问题 error
   2. major 会影响开发内容的问题 warning


## third

1. 开源包 使用脚本  prepublicOnly: "npm run test"

## 疑惑

1. lerna run test 和 lerna clean 为啥不run  估计是内部处理
   1. lerna 没有 run 这个命令 走的是子包的test的命令

2. lerna create 新创一个包

## 面试

1. 个人编码能力 `Linter`、`CLI`、`Typescript`、Node 实战
2. 面试的前端深度体现 工程化方面
3. 对于前端整体的理解 业务研发 =》 前端架构 通过工具约束前端开发的张力 保证了项目标准的规范化