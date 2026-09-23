import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const htmlPath = path.join(root, 'ogden-basic-english-850.html');
const html = await readFile(htmlPath, 'utf8');

const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/u);
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/u);
const wordsMatch = scriptMatch?.[1].match(/const WORDS=(\[[\s\S]*?\]);\s*const CATEGORIES=/u);
const categoriesMatch = scriptMatch?.[1].match(/const CATEGORIES=(\{[^\n]+\});/u);
const operatorsMatch = scriptMatch?.[1].match(/const OPERATORS=(\[[^\n]+\]);/u);

if (!styleMatch || !scriptMatch || !wordsMatch || !categoriesMatch || !operatorsMatch) {
  throw new Error('Unable to locate the embedded assets in the current single-file page.');
}

const words = JSON.parse(wordsMatch[1]);
const categories = JSON.parse(categoriesMatch[1]);
const operators = JSON.parse(operatorsMatch[1]);
const appScript = scriptMatch[1].replace(
  /^[\s\S]*?const OPERATORS=\[[^\n]+\];\s*/u,
  '',
);

const template = html
  .replace(styleMatch[0], '<style>\n{{STYLES}}\n  </style>')
  .replace(scriptMatch[0], '<script>\n{{DATA}}\n{{APP_SCRIPT}}\n  </script>')
  .replace('版本 2026-09-17。', '版本 {{VERSION}}。');

await Promise.all([
  mkdir(path.join(root, 'src', 'css'), { recursive: true }),
  mkdir(path.join(root, 'src', 'data'), { recursive: true }),
  mkdir(path.join(root, 'src', 'js'), { recursive: true }),
]);

await Promise.all([
  writeFile(path.join(root, 'src', 'app.template.html'), template, 'utf8'),
  writeFile(path.join(root, 'src', 'css', 'app.css'), `${styleMatch[1].trim()}\n`, 'utf8'),
  writeFile(path.join(root, 'src', 'data', 'words.json'), `${JSON.stringify(words, null, 2)}\n`, 'utf8'),
  writeFile(
    path.join(root, 'src', 'data', 'meta.json'),
    `${JSON.stringify({
      version: '2026-09-22',
      categories,
      operators,
      distribution: 'single-file-offline',
    }, null, 2)}\n`,
    'utf8',
  ),
  writeFile(path.join(root, 'src', 'js', 'app.js'), `${appScript.trim()}\n`, 'utf8'),
]);

console.log(`Bootstrapped ${words.length} words into src/.`);
