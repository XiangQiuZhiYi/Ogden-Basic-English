# Ogden Basic English 学习页优化 - 技术方案

> 日期：2026-09-22  
> 涉及模块：`ogden-basic-english-850.html`  
> 需求来源：详细理解 Ogden Basic English，并为当前离线学习页建立优化方案

> 实施状态（2026-09-22）：已完成 P0 第一批内容修订、P2 工程拆分与自动校验，并保持单文件离线发布。150 个 qualities 的词形和例句已逐条编辑；其余尚未完成语言学审校的内容已明确标记，不再笼统宣称全部核验完成。P1 学习功能未进入本轮范围。

## 1. 需求概述

### 1.1 背景与目标

当前项目是一个不依赖服务器的单文件中文学习页，内含 Ogden Basic English 850 词、12 组语法规则、56 个沟通句、浏览器语音朗读和本机学习进度。

优化目标不应只是增加界面功能，而应先建立“内容可考证、规则可验证、学习可推进”的产品基础。建议保留最终单文件离线交付形式，但把开发态的内容、逻辑、样式和校验拆开管理，再构建回一个 HTML 文件。

### 1.2 Ogden Basic English 的产品含义

Basic English 不是“背完 850 个常用词”，而是一套受控英语系统：

- 850 个核心词由 100 个 operations、600 个 things、150 个 qualities 组成；当前项目进一步按 Ogden 顺序分成 `100 + 400 + 200 + 100 + 50`，数量正确。
- 18 个 operators（16 个核心操作词，加 `may`、`will`）承担普通英语中大量动词的工作。
- 大量表达依靠 `operator + thing / quality / direction` 重组，例如 `make a decision`、`give an answer`、`go through`。
- 850 是词根层，不等于页面上只能出现 850 个表面词形。代词和 operators 可完整变形；名词复数、部分派生、quality 的副词/否定/程度形式、透明复合词，以及数字、度量、日历、国际词和必要术语，均需按规则分层处理。
- Ogden 的目标是以有限词汇进行正常、清楚的英语表达，而不是把每个词机械地套进同一个句型。

主要核对依据：

- [Ogden 1930 年原著书目与公开 PDF（Max Planck Institute）](https://www.mpi.nl/publications/item2366945/basic-english-general-introduction-rules-and-grammar)
- [Ogden 原课程 Step 1：代词、operators、方向词和基本词序](https://basicenglish.org/step-1/index.html)
- [Basic English 语法规则摘要](https://zbenglish.net/sites/basic/rules.html)

### 1.3 当前实现概况

| 项目 | 当前状态 |
|---|---|
| 代码形态 | 1 个 HTML 文件，约 656 KB、117 行；大部分数据集中在单行 JSON 中 |
| 核心数据 | 850 条，无重复 ID、无空字段；五类数量正确 |
| 词汇模块 | 分类、子分类、每次加载 80 条、展开详情、朗读、已学习标记 |
| 语法模块 | 12 张规则卡片 |
| 沟通模块 | 7 个场景、56 句 |
| 状态存储 | `localStorage` 保存词汇进度、当前模块和语音选择 |
| 运行依赖 | 无，可直接离线打开 |
| 版本管理 | 当前目录不是 Git 仓库 |

### 1.4 优化优先级

1. **P0：内容正确性与可验证性**
2. **P1：学习闭环和检索能力**
3. **P2：工程可维护性、自动校验和可访问性**
4. **P3：进阶练习、统计、PWA 或云同步等扩展功能**

## 2. 现状问题审计

### 2.1 P0 内容问题

#### A. “允许形式”存在机械生成错误

当前把许多 quality 直接套用 `-er/-est`，产生明显错误或教学上不应推荐的形式，例如：

- `cut -> cuter -> cutest`：会变成另一个词 `cute` 的比较级含义。
- `first -> firster -> firstest`
- `fixed -> fixeder -> fixedest`
- `mixed -> mixeder -> mixedest`
- `last -> laster -> lastest`
- `shut -> shuter -> shutest`
- `tired -> tireder -> tiredest`

原规则强调程度通常用 `more/most` 表示，`-er/-est` 只应在标准英语正常使用且语义可比较时出现，不能靠拼写算法批量生成。

#### B. 教学释义的有效信息不足

数据审计结果：

- 750/850 条中文教学释义使用“指……这一性质或状态”或同类模板，基本只是重复中文词义。
- 92 条英文释义为泛化模板；其中 67 条是 `A structure word used in Basic English.`。
- 630 条状态仅标记为“分类已核验 · 教学义项”，只有 202 条标记为“BE850 释义已审计”，18 条为核心用法已核验。
- 600 个 thing 共用同一条规则文字，150 个 quality 共用另一条规则文字，无法解释每个词的具体搭配限制。

这与页面标题中的“严格学习页”和“完整规则”承诺不匹配。

#### C. 例句过度模板化

150 个 quality 全部使用 `This thing is ...`，包括 `This thing is future / public / opposite / ill` 等不自然或语义不合适的句子。例句应展示真实受控表达，而不是只证明形容词能放在 `be` 后面。

#### D. 来源粒度不足

每条记录只有“Ogden 原序 + IPA-dict en_UK”的笼统来源，无法区分：

- 原始词表事实；
- 项目自编英文释义；
- 中文翻译；
- 允许词形；
- 自编例句；
- IPA 数据。

建议将“原文事实”和“教学编辑内容”分开标注，并记录每个字段的审校状态。

#### E. IPA 不是自然的整句英式发音标注

56 句 IPA 看起来由单词词典音标拼接而成，重音标记和弱读缺少整句层面的人工校对，例如单音节功能词也普遍带词汇重音。应明确标为“逐词音标”，或改为人工审校的宽式英式句音标。

### 2.2 P1 产品问题

- CSS 中保留了搜索框样式，但实际 DOM、状态和事件中没有搜索功能；空状态文案却仍提示用户“换一个英文、中文或分类条件”。
- “已学习”只有布尔标记，没有复习队列、遗忘曲线、掌握度或错题记录，不能形成学习闭环。
- 分类顺序适合查阅，不适合零基础学习。用户更需要按 operator、结构词、高复用 things/qualities 和句型逐步学习。
- 词卡展示“词形、规则、释义、例句”，但缺少词义辨析、典型搭配、Basic 改写示例和常见错误。
- 56 句只能朗读，不能遮挡中文、听写、跟读、自测或替换造句。
- 页面缺少“为什么这样表达”的练习，例如把普通英语动词改写成 `operator + thing`。

### 2.3 P2 工程问题

- 850 条数据、HTML、CSS 和 JavaScript 全部耦合在一个文件内，且大块数据占单行，无法有效审查 diff。
- 没有自动化内容校验；机械词形错误本可在构建阶段被阻止。
- `localStorage` 数据只在 JSON 解析时报错时回退；如果解析成功但不是数组，`new Set(...)` 会令页面初始化失败。
- 学习进度未过滤未知 ID，损坏或旧版本数据可能出现大于 850 的进度。
- 男声排除正则中的 `\b` 实际被写成两个 U+0008 控制字符，正则不会按预期匹配单词边界。
- Tab 状态不写入 URL，刷新和分享无法稳定保留模块；初始化时还会移除任意 hash。
- 动态重绘整个卡片列表，数据量目前尚可，但已学习切换也会重建全部可见卡片。
- 没有测试、内容 schema、构建脚本、变更日志或版本号。

## 3. 文件变更清单

以下是推荐的开发态结构；最终仍输出 `ogden-basic-english-850.html` 作为可分发离线文件。

### 3.1 新增文件

| 文件路径 | 用途 |
|---|---|
| `src/data/words.json` | 850 词的结构化数据，按字段逐条可审查 |
| `src/data/grammar.json` | 语法规则、公式、例句与来源 |
| `src/data/phrases.json` | 场景沟通句与 IPA |
| `src/data/sources.json` | 书目、页面、数据许可及来源标识 |
| `src/js/app.js` | 初始化与模块路由 |
| `src/js/words.js` | 搜索、筛选、分页和词卡交互 |
| `src/js/progress.js` | 版本化进度模型、迁移、导入导出 |
| `src/js/speech.js` | 语音选择与朗读 |
| `src/css/app.css` | 从 HTML 拆出的样式 |
| `scripts/validate-content.mjs` | schema、数量、ID、词形、例句词汇边界校验 |
| `scripts/build-single-file.mjs` | 将开发态资源内联生成单文件 |
| `tests/content.test.mjs` | 内容回归测试 |
| `tests/app.test.mjs` | 关键交互测试（后续引入浏览器测试运行器） |

### 3.2 修改文件

| 文件路径 | 修改内容 | 影响范围 |
|---|---|---|
| `ogden-basic-english-850.html` | 改为构建产物；修正数据和正则；恢复搜索；增加学习模式 | 整个页面 |

### 3.3 删除文件

无。现有 HTML 在迁移完成并验证一致前保留；后续只将其标记为生成文件，不手工编辑。

## 4. 数据模型与方法变更

### 4.1 词条模型

```ts
interface BasicWord {
  id: string;
  headword: string;
  variants: string[];
  category: 'operations' | 'general_things' | 'picturable_things'
    | 'qualities_general' | 'qualities_opposites';
  subgroup: string;
  originalIndex: number;
  ipa: { dialect: 'en-GB'; broad: string; sourceId: string; reviewed: boolean };
  senses: Array<{
    en: string;
    zh: string;
    scopeNote?: string;
    sourceType: 'ogden' | 'editorial';
    reviewStatus: 'draft' | 'reviewed';
  }>;
  allowedForms: Array<{
    form: string;
    kind: 'inflection' | 'derivative' | 'comparison' | 'pronoun-form';
    note?: string;
  }>;
  patterns: string[];
  examples: Array<{
    en: string;
    zh: string;
    note: string;
    tokensValidated: boolean;
  }>;
  commonMistakes: string[];
  sourceRefs: string[];
}
```

### 4.2 学习进度模型

```ts
interface ProgressStateV2 {
  version: 2;
  words: Record<string, {
    status: 'new' | 'learning' | 'review' | 'mastered';
    ease: number;
    intervalDays: number;
    dueAt: string | null;
    correct: number;
    incorrect: number;
  }>;
  settings: { voiceId: string; activeModule: string };
}
```

旧版 `ogden850.learned: string[]` 首次读取时迁移为 `mastered`，过滤不在 850 词表内的 ID，并保留回滚副本。

### 4.3 新增/修改方法

| 方法 | 作用 |
|---|---|
| `validateWordDataset(words)` | 校验 850 总数、五类数量、唯一 ID、连续原序和必填字段 |
| `validateAllowedForms(word)` | 对照人工白名单/规则表，禁止仅靠字符串拼接生成词形 |
| `validateBasicSentence(sentence)` | 识别核心词、许可词形、专名/数字/术语，并返回逐 token 解释 |
| `searchWords(query, filters)` | 同时搜索 headword、英/中释义、搭配和例句 |
| `loadProgress()` | 验证、迁移并清洗本地状态 |
| `recordReview(wordId, result)` | 更新掌握度和下次复习时间 |
| `selectModule(id)` | 同步 Tab、URL hash 和本地设置，不删除无关 hash |
| `speakText(text, options)` | 保留系统 TTS，暴露速度、音色和错误状态 |

不新增后端接口；第一阶段保持完全离线。

## 5. 具体实现方案

### 5.1 整体架构

```text
可审查的源数据 JSON
        ↓
内容校验器 ──→ 错误即阻止构建
        ↓
静态 HTML/CSS/JS 源码
        ↓
单文件构建器
        ↓
ogden-basic-english-850.html（离线交付物）
```

### 5.2 第一阶段：建立可信内容基线（P0）

1. 将 850 条数据迁移至 JSON，保持 ID 和原序不变。
2. 以 Ogden 词表和规则为事实源，移除自动拼接的比较级、最高级和派生形式。
3. 为词形建立显式白名单；不确定项标为待审，不展示为“允许形式”。
4. 把 750 条模板化中文解释分批替换为“核心义 + 使用边界 + 典型结构”。
5. 为每个词至少提供一个自然例句；优先审校 18 operators、82 个其他 operations、常用 action-things 和 150 qualities。
6. 给所有例句运行 Basic 词汇验证，允许的非核心项必须显示其类型和依据。
7. 把内容状态改为可见的 `草稿 / 自动校验通过 / 人工审校通过`，避免泛称“已核验”。

验收条件：

- 五类数量保持 `100 / 400 / 200 / 100 / 50`。
- 无机械拼接出的非法词形。
- 所有“允许形式”都有规则或人工条目支持。
- 所有例句能给出逐词合法性报告。
- 页面不再把未人工审校内容描述为“严格”或“已核验”。

### 5.3 第二阶段：恢复查找并形成学习闭环（P1）

1. 恢复搜索框，支持英文、中文、词形和例句搜索；保留分类与子类组合筛选。
2. 增加三种入口：`查词`、`课程`、`今日复习`。
3. 课程优先级：18 operators → directions/structure words → action-things → qualities → 场景表达。
4. 复习题型先做四种：认义、听音选词、补全 operator、普通英语到 Basic 改写。
5. 词卡新增“为什么这样说”“普通英语对照”“常见错误”。
6. 沟通句支持逐词高亮、隐藏中文、听写和替换练习。

### 5.4 第三阶段：工程化与质量保障（P2）

1. 加入 Node 内容校验和最小测试，不引入前端框架。
2. 生成文件写入构建时间、数据版本和来源版本。
3. 修复本地存储异常、语音正则控制字符、Tab 深链和键盘焦点。
4. 对 320/375/768/1440 px 进行响应式检查；对键盘、屏幕阅读器和 reduced-motion 做回归。
5. 在内容完成审校前，测试报告应显示“已审校数量”，而不是只有构建通过/失败。

### 5.5 暂不进入第一轮的功能

- 账号、云同步和后端数据库；
- AI 自由对话或自动批改开放式作文；
- PWA 安装包；
- 大规模插图或图片记忆卡；
- 与普通 CEFR 课程体系混合。

这些功能会扩大范围，但不能解决当前最核心的内容可信度问题。

## 6. 注意事项

### 6.1 内容边界

- “850 核心词”与“合法表面词形”必须分开计数。
- 现代常用英语、Basic English 的许可表达、项目为了教学添加的解释不能混成同一来源层。
- 不把所有普通英语同形词性带入 Basic；例如 action-thing 在普通英语可作动词，不代表严格 Basic 中应自由作动词。
- 比较形式、副词、`un-`、复合词和派生词均应通过规则表验证，不应从字符长度或结尾猜测。

### 6.2 兼容性

- 保持直接打开 HTML 即可运行。
- Web Speech API 的声音由操作系统和浏览器提供，页面不能承诺每台设备一定有“英式女声”。
- 用户现有的已学习数据需要无损迁移。

### 6.3 性能

850 条无需后端分页。现有每次 80 条的渐进展示可以保留；搜索应在完整内存数据上完成。

## 7. 可能遗漏与待确认项

- 主要目标用户尚未明确：中文零基础学习者、已有英语基础的受控英语学习者，还是 Basic English 研究/查阅者。
- “严格”是优先忠于 1930 年 Ogden 原体系，还是允许用现代教学英语补充，需要产品层确认。
- 是否必须永远保持手工可打开的单文件源码，还是允许“开发态多文件、发布态单文件”。本方案推荐后者。
- IPA 要保留词典宽式音标，还是投入人工校对整句连读与弱读。
- 内容审校需要确定责任人和通过标准；自动校验不能替代语言学审校。
- 本地目录未启用 Git，进行大规模内容修改前建议先建立可回滚版本。

## 8. 变更总结

| 类型 | 新增 | 修改 | 删除 |
|---|---:|---:|---:|
| 文件（建议） | 12 | 1 | 0 |
| 逻辑模块 | 4 | 1 | 0 |
| 后端接口 | 0 | 0 | 0 |

建议先完成 P0 的数据拆分、词形校验和首批高频词内容审校，再进入学习功能开发。若直接在当前 656 KB 单文件中继续堆功能，后续每次内容修订都会变得更难审查和回归。
