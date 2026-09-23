# Ogden Basic English 850 离线学习页

在线页面：[GitHub Pages](https://xiangqiuzhiyi.github.io/Ogden-Basic-English/)

开发态源码位于 `src/`，根目录的 `ogden-basic-english-850.html` 是构建生成的单文件离线发布物。发布物不依赖服务器、npm 运行时或网络资源。

## 目录

```text
src/app.template.html       页面结构与语法、沟通模块
src/css/app.css             页面样式
src/data/words.json         850 词、义项、例句与逐条审校状态
src/data/grammar.json       结构化语法规则、解释、正例与误区
src/data/patterns.json      常用句型、operator 关联与例句
src/data/meta.json          分类、operators、版本信息
src/js/app.js               页面交互
scripts/                    内容修订、校验、构建与发布物验证
ogden-basic-english-850.html  最终单文件
```

## 修改与构建

```bash
npm run validate
npm run build
npm run verify
```

也可以执行 `npm run check` 顺序完成三步。无需安装第三方依赖。

`scripts/bootstrap-source.mjs` 仅用于从旧版单文件初始化开发态源码，不应在日常编辑后再次执行。`scripts/apply-content-revisions.mjs` 记录了本轮批量内容修订，重复运行是幂等的。

## 内容边界

- Ogden 原始词目、顺序与五分类和项目编辑的释义、词形、例句分开标注。
- 词条按 `senses[]` 组织；只拆分会改变意义或句型结构的 Basic 教学义项，不把中文近义翻译机械拆开。
- “只看未学习”会组合当前分类与子分类，过滤本机 `localStorage` 中已经标记为学习完成的词。
- 语法回答“为什么这样说”，句型回答“用什么结构表达”，沟通模块保留完整场景句。
- 自动校验负责数量、唯一性、分类、明确错误词形、示例词汇边界和 JavaScript 语法。
- 自动校验还会检查 850 个词的义项与例句、语法和句型 ID、跨模块引用，以及构建产物中的内联数据一致性。
- 自动校验不等于语言学审校；每个词条通过 `reviewStatus` 显示当前状态。
- IPA 来自 `open-dict-data/ipa-dict` 的英式数据；沟通句目前展示逐词宽式 IPA 参考，不宣称是自然连读标音。
