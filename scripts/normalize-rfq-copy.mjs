import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const legacy = '<small>Review and send in your email application or WhatsApp. This form does not submit directly to a server. Email: yuna@huangsifurniture.com</small>';
const replacement = '<small>Your inquiry is sent securely to HUANGSI. We will reply within 1 working day. Email, WhatsApp and Copy RFQ remain available as alternatives.</small>';
let changed = 0;

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) {
      const source = fs.readFileSync(full, 'utf8');
      if (!source.includes(legacy)) continue;
      fs.writeFileSync(full, source.replaceAll(legacy, replacement));
      changed += 1;
    }
  }
}

walk(root);
if (!changed) console.log('No legacy RFQ copy found.');
else console.log(`Normalized RFQ copy on ${changed} page(s).`);
