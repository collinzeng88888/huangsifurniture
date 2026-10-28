import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const header = home.match(/<header class="site-header home-header">[\s\S]*?<\/header>/)?.[0];
const footer = home.match(/<footer class="footer home-footer">[\s\S]*?<\/footer>/)?.[0];

if (!header || !footer) throw new Error('Homepage shell was not found.');

const blogHeader = header.replace(
  /href="\/blog\/how-to-customize-office-furniture-for-corporate-projects"/,
  'href="/blog"'
);
const targets = [path.join(root, 'blog.html')];
for (const entry of fs.readdirSync(path.join(root, 'blog'))) {
  if (entry.endsWith('.html')) targets.push(path.join(root, 'blog', entry));
}

function addHomepageShellClass(source) {
  return source.replace(/<body\b([^>]*)>/i, (tag, attrs) => {
    const classMatch = attrs.match(/\bclass=(["'])(.*?)\1/i);
    if (classMatch) {
      const classes = new Set(classMatch[2].split(/\s+/).filter(Boolean));
      classes.add('home-page');
      classes.add('blog-page');
      return tag.replace(classMatch[0], `class="${[...classes].join(' ')}"`);
    }
    return `<body class="home-page blog-page"${attrs}>`;
  });
}

let updated = 0;
for (const target of targets) {
  const source = fs.readFileSync(target, 'utf8');
  const next = addHomepageShellClass(source)
    .replace(/<header\b[^>]*>[\s\S]*?<\/header>/, blogHeader)
    .replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/, footer);
  if (next !== source) {
    fs.writeFileSync(target, next);
    updated += 1;
  }
}
console.log(`Unified homepage header and footer on ${updated} blog page(s).`);
