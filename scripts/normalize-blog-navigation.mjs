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
      if (source.includes('nav-buyer-guides')) continue;
      let updated = source.replace(/(<a\b[^>]*href=["']\/oem-manufacturing["'][^>]*>[\s\S]*?<\/a>)/i, '<a class="nav-buyer-guides" href="/blog">Buyer Guides</a>$1');
      if (updated === source) updated = source.replace(/(<a\b[^>]*href=["']\/catalog["'][^>]*>[\s\S]*?<\/a>)/i, '<a class="nav-buyer-guides" href="/blog">Buyer Guides</a>$1');
      if (updated !== source) {
        fs.writeFileSync(full, updated);
        linked += 1;
      }
    }
  }
}

walk(root);
console.log(`Added Buyer Guides navigation link to ${linked} page(s).`);
