import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  }))).flat();
}

const files = await walk(root);
const relativeFiles = files.map(file => path.relative(root, file).split(path.sep).join('/'));
const names = new Set(relativeFiles);
assert.equal(new Set(relativeFiles.map(file => file.toLowerCase())).size, files.length, 'Case-conflicting filenames will fail on some hosts.');
assert.ok(files.length < 1000, 'Cloudflare dashboard uploads allow up to 1,000 files.');
let totalBytes = 0;
for (const file of files) {
  const size = (await stat(file)).size;
  assert.ok(size < 25 * 1024 * 1024, `${file} exceeds the upload size limit.`);
  totalBytes += size;
}

function checkUrl(url, from = '') {
  if (!url || /^(?:[a-z]+:|#|\/\/)/i.test(url)) return;
  const clean = decodeURIComponent(url.split(/[?#]/)[0]);
  const target = clean.startsWith('/') ? clean.slice(1) : path.posix.join(path.posix.dirname(from), clean);
  assert.ok(names.has(target), `Missing or incorrectly cased release asset: ${target}`);
}
const html = await readFile(path.join(root, 'index.html'), 'utf8');
for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) checkUrl(match[1], 'index.html');
for (const file of relativeFiles.filter(file => file.endsWith('.css'))) {
  const css = await readFile(path.join(root, file), 'utf8');
  for (const match of css.matchAll(/url\((?:["']?)([^)'"\s]+)["']?\)/g)) checkUrl(match[1], file);
}
for (const required of ['_headers', 'robots.txt', 'Ashmit-Avash-Resume.pdf', 'favicon.svg']) {
  assert.ok(names.has(required), `Required release file is missing: ${required}`);
}
assert.ok(!html.includes('/src/'), 'The release HTML still points to development source.');
assert.ok(!relativeFiles.some(file => /(?:^|\/)(?:node_modules|\.env|\.git)(?:\/|$)/.test(file)), 'The release contains development-only files.');
console.log(`Release checked: ${files.length} files, ${(totalBytes / 1024 / 1024).toFixed(2)} MiB; local HTML/CSS assets resolved.`);
