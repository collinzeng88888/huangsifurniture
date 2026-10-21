import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'scripts/catalogue-manifest.json'), 'utf8'));
for (const item of manifest) {
  const output = path.join(root, item.output);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  const temp = `${output}.assembling`;
  const fd = fs.openSync(temp, 'w');
  const hash = crypto.createHash('sha256');
  let size = 0;
  try {
    for (const part of item.parts) {
      const bytes = fs.readFileSync(path.join(root, part));
      hash.update(bytes);
      size += bytes.length;
      let written = 0;
      while (written < bytes.length) written += fs.writeSync(fd, bytes, written, bytes.length - written);
    }
  } finally { fs.closeSync(fd); }
  if (size !== item.size || hash.digest('hex') !== item.sha256) {
    fs.unlinkSync(temp);
    throw new Error(`Catalogue integrity check failed: ${item.output}`);
  }
  fs.renameSync(temp, output);
  console.log(`Verified original PDF: ${item.output}`);
}
// Remove transfer parts from the deployment output after all originals pass validation.
if (process.env.VERCEL === '1') fs.rmSync(path.join(root, '.catalogue-parts'), { recursive: true });
