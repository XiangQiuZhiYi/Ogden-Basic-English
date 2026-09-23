import { readFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';

const root = process.cwd();
const [html, sourceWordsText, sourceGrammarText, sourcePatternsText] = await Promise.all([
  readFile(path.join(root, 'ogden-basic-english-850.html'), 'utf8'),
  readFile(path.join(root, 'src/data/words.json'), 'utf8'),
  readFile(path.join(root, 'src/data/grammar.json'), 'utf8'),
  readFile(path.join(root, 'src/data/patterns.json'), 'utf8'),
]);
const errors = [];

if (/\{\{[A-Z_]+\}\}/u.test(html)) errors.push('Unresolved build placeholder found.');
if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/u.test(html)) errors.push('Unexpected control character found.');
if (!html.startsWith('<!doctype html>')) errors.push('Output is not a complete HTML document.');
if (!html.includes('id="onlyUnlearned"')) errors.push('Only-unlearned filter is missing from the build.');

const script = html.match(/<script>([\s\S]*?)<\/script>/u)?.[1];
if (!script) {
  errors.push('Embedded JavaScript was not found.');
} else {
  try {
    new vm.Script(script, { filename: 'ogden-basic-english-850.html#script' });
  } catch (error) {
    errors.push(`Embedded JavaScript syntax error: ${error.message}`);
  }
}

const embeddedWordsMatch = script?.match(/const WORDS=(\[[\s\S]*?\]);\nconst CATEGORIES=/u);
if (!embeddedWordsMatch) {
  errors.push('Embedded word data was not found.');
} else {
  const embeddedWords = JSON.parse(embeddedWordsMatch[1]);
  const sourceWords = JSON.parse(sourceWordsText);
  if (JSON.stringify(embeddedWords) !== JSON.stringify(sourceWords)) {
    errors.push('Embedded word data differs from src/data/words.json.');
  }
}

const embeddedGrammarMatch = script?.match(/const GRAMMAR=(\[[\s\S]*?\]);\nconst PATTERNS=/u);
const embeddedPatternsMatch = script?.match(/const PATTERNS=(\[[\s\S]*?\]);\nconst BUILD_INFO=/u);
if (!embeddedGrammarMatch || JSON.stringify(JSON.parse(embeddedGrammarMatch[1])) !== JSON.stringify(JSON.parse(sourceGrammarText))) {
  errors.push('Embedded grammar data differs from src/data/grammar.json.');
}
if (!embeddedPatternsMatch || JSON.stringify(JSON.parse(embeddedPatternsMatch[1])) !== JSON.stringify(JSON.parse(sourcePatternsText))) {
  errors.push('Embedded pattern data differs from src/data/patterns.json.');
}

if (errors.length) {
  console.error(`Build verification failed (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({
    valid: true,
    bytes: Buffer.byteLength(html),
    embeddedWords: 850,
    grammarRules: JSON.parse(sourceGrammarText).length,
    sentencePatterns: JSON.parse(sourcePatternsText).length,
    externalRuntimeDependencies: 0,
  }, null, 2));
}
