import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let optimized = 0;

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) {
      const source = fs.readFileSync(full, 'utf8');
      const updated = source.replace(/<img\b[^>]*\bloading=(["'])lazy\1[^>]*>/gi, tag => {
        if (/\bdecoding=(["'])async\1/i.test(tag)) return tag;
        optimized += 1;
        return tag.replace(/>$/, ' decoding="async">');
      });
      if (updated !== source) fs.writeFileSync(full, updated);
    }
  }
}

walk(root);
console.log(`Applied asynchronous decoding to ${optimized} lazy-loaded image(s).`);
