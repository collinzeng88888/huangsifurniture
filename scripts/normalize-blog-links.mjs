import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let linked = 0;

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) {
      const source = fs.readFileSync(full, 'utf8');
      if (source.includes('href="/blog"')) continue;
      const updated = source.replace(/(<span class="footer-legal">)/, '$1<a href="/blog">Buying Guides</a> · ');
      if (updated !== source) {
        fs.writeFileSync(full, updated);
        linked += 1;
      }
    }
  }
}

walk(root);
console.log(`Added Buying Guides footer link to ${linked} page(s).`);
