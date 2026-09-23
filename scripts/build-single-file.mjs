import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const read = relativePath => readFile(path.join(root, relativePath), 'utf8');

const [template, styles, appScript, wordsText, metaText, grammarText, patternsText] = await Promise.all([
  read('src/app.template.html'),
  read('src/css/app.css'),
  read('src/js/app.js'),
  read('src/data/words.json'),
  read('src/data/meta.json'),
  read('src/data/grammar.json'),
  read('src/data/patterns.json'),
]);

const words = JSON.parse(wordsText);
const meta = JSON.parse(metaText);
const grammar = JSON.parse(grammarText);
const patterns = JSON.parse(patternsText);
const reviewCounts = Object.fromEntries(
  Object.entries(Object.groupBy(words, word => word.reviewStatus ?? '未标记'))
    .map(([status, items]) => [status, items.length]),
);

const dataScript = [
  `const WORDS=${JSON.stringify(words)};`,
  `const CATEGORIES=${JSON.stringify(meta.categories)};`,
  `const OPERATORS=${JSON.stringify(meta.operators)};`,
  `const GRAMMAR=${JSON.stringify(grammar)};`,
  `const PATTERNS=${JSON.stringify(patterns)};`,
  `const BUILD_INFO=${JSON.stringify({
    version: meta.version,
    distribution: meta.distribution,
    reviewCounts,
  })};`,
].join('\n');

const html = template
  .replace('{{STYLES}}', styles.trim())
  .replace('{{DATA}}', dataScript)
  .replace('{{APP_SCRIPT}}', appScript.trim())
  .replaceAll('{{VERSION}}', meta.version)
  .replaceAll(
    '{{REVIEW_SUMMARY}}',
    Object.entries(reviewCounts).map(([status, count]) => `${status} ${count}`).join('；'),
  );

if (/\{\{[A-Z_]+\}\}/u.test(html)) {
  throw new Error('The generated page still contains unresolved build placeholders.');
}

await writeFile(path.join(root, 'ogden-basic-english-850.html'), html, 'utf8');
console.log(`Built ogden-basic-english-850.html (${words.length} words, ${meta.version}).`);
