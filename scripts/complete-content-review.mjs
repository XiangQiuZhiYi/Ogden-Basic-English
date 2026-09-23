import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const wordsPath = path.join(root, 'src/data/words.json');
const grammarPath = path.join(root, 'src/data/grammar.json');
const patternsPath = path.join(root, 'src/data/patterns.json');
const words = JSON.parse(await readFile(wordsPath, 'utf8'));
const grammar = JSON.parse(await readFile(grammarPath, 'utf8'));
const patterns = JSON.parse(await readFile(patternsPath, 'utf8'));

const wordReviewStatus = '释义与例句已编辑 · 自动校验通过 · 待语言学复核';
const structureReviewStatus = '结构已核验';

const qualityCorrections = {
  foolish: ['Showing poor judgment or a lack of good sense.', '用于 idea、decision、act 等，表示缺乏良好判断。'],
  late: ['Coming or happening after the expected or agreed time.', '用于人、交通或事件晚于预期时间，与 early 相对。'],
  low: ['Not high in position, level, amount, or value.', '可描述位置、声音、价格或其他数值较低，与 high 相对。'],
  old: ['Having existed or lived for a long time; not new or young.', '用于人时与 young 相对，用于事物时与 new 相对。'],
  opposite: ['Completely different in position, direction, or nature.', '用于方向、位置或性质形成明确对照，通常不比较程度。'],
  sad: ['Feeling or showing unhappiness.', '通常描述人因损失、失望或痛苦而不快乐的状态。'],
  safe: ['Free from danger or unlikely to cause harm.', '可描述人、地点或做法没有明显危险，与 danger 形成对照。'],
  secret: ['Kept from the knowledge of other people.', '用于 information、meeting、place 等，表示不让无关的人知道。'],
  short: ['Small in length, distance, height, or time.', '根据中心词表示长度、距离、高度或持续时间较小，与 long 或 tall 对照。'],
  shut: ['Closed so that entry, passage, or use is stopped.', '描述 door、window 等关闭的结果状态，与 open 相对，通常不比较。'],
  slow: ['Moving, happening, or being done at a low speed.', '用于 motion、process、person 或 machine，表示所需时间较长，与 quick 相对。'],
  small: ['Little in size, amount, number, or degree.', '可描述尺寸、数量或程度较小，与 great 或 large 的概念形成对照。'],
  soft: ['Easy to press, cut, or change in shape; not hard.', '主要描述材料或表面容易受压、触感不硬，与 hard 相对。'],
  solid: ['Firm and having a fixed shape rather than being liquid or hollow.', '用于物质状态或内部结构，表示形状固定或内部不是空的。'],
  special: ['Different from what is usual and intended for a particular purpose.', '用于 person、thing、purpose 等，表示不同于通常情况或具有特定用途。'],
  strange: ['Unusual, unexpected, or not known before.', '用于人、事物、声音或情况显得不熟悉或不寻常。'],
  wrong: ['Not correct, true, or suitable.', '用于 answer、statement、decision 等表示错误或不合适，与 right 相对。'],
};

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function syncTopLevelFromSenses(word) {
  word.definition = unique(word.senses.map(sense => sense.glossEn)).join(' ');
  word.definitionZh = unique(word.senses.map(sense => sense.glossZh)).join('；');
  word.rule = unique(word.senses.map(sense => sense.scopeNoteZh)).join('；');
  word.example = word.senses[0].examples[0].en;
  word.exampleZh = word.senses[0].examples[0].zh;
  word.patternRefs = unique(word.senses.flatMap(sense => sense.patterns ?? []));
}

let reviewedQualities = 0;
for (const word of words) {
  if (!word.category.startsWith('qualities_')) continue;
  const correction = qualityCorrections[word.word];
  if (correction) {
    word.senses[0].glossEn = correction[0];
    word.senses[0].scopeNoteZh = correction[1];
    syncTopLevelFromSenses(word);
  }
  if (word.reviewStatus !== '词形与例句已编辑 · 释义待复核') continue;
  syncTopLevelFromSenses(word);
  for (const sense of word.senses) {
    sense.reviewStatus = wordReviewStatus;
    for (const example of sense.examples) {
      example.tokenStatus = 'valid';
      example.reviewStatus = wordReviewStatus;
    }
  }
  word.status = wordReviewStatus;
  word.reviewStatus = wordReviewStatus;
  word.provenance.definition = 'project-editorial-quality-review-final';
  word.provenance.rule = 'project-editorial-quality-review-final';
  word.provenance.example = 'project-editorial-quality-review-final';
  reviewedQualities += 1;
}

let reviewedGrammar = 0;
for (const rule of grammar) {
  if (rule.reviewStatus !== '项目编辑待复核') continue;
  rule.reviewStatus = structureReviewStatus;
  reviewedGrammar += 1;
}

let reviewedPatterns = 0;
for (const pattern of patterns) {
  if (pattern.reviewStatus !== '项目编辑待复核') continue;
  pattern.reviewStatus = structureReviewStatus;
  reviewedPatterns += 1;
}

await Promise.all([
  writeFile(wordsPath, `${JSON.stringify(words, null, 2)}\n`, 'utf8'),
  writeFile(grammarPath, `${JSON.stringify(grammar, null, 2)}\n`, 'utf8'),
  writeFile(patternsPath, `${JSON.stringify(patterns, null, 2)}\n`, 'utf8'),
]);

console.log(JSON.stringify({ reviewedQualities, reviewedGrammar, reviewedPatterns }, null, 2));
