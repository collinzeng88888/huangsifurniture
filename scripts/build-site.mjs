import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const steps=[
  'assemble-catalogues.mjs',
  'normalize-rfq-copy.mjs',
  'normalize-legal-links.mjs',
  'normalize-blog-links.mjs',
  'normalize-blog-navigation.mjs',
  'normalize-meta-descriptions.mjs',
  'optimize-image-loading.mjs',
  'inject-ga4.mjs',
  'audit-site.mjs',
  'audit-indexing.mjs'
];
for(const step of steps)execFileSync(process.execPath,[path.join(root,'scripts',step)],{stdio:'inherit'});
