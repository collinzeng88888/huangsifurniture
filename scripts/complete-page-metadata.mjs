import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const origin = 'https://huangsifurniture.com';
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry =>
  ['.git', 'node_modules'].includes(entry.name) ? [] : entry.isDirectory()
    ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
const attr = (tag, name) => tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, 'i'))?.[2];
const plain = text => text.replace(/<[^>]+>/g, '').replaceAll('&amp;', '&').replace(/\s+/g, ' ').trim();
const escape = text => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const changed = [];
let social = 0, breadcrumbs = 0;

for (const file of walk(root).filter(file => file.endsWith('.html'))) {
  const relative = path.relative(root, file).replaceAll(path.sep, '/');
  // Preserve the approved homepage and intentional non-indexable drafts/aliases.
  if (relative === 'index.html') continue;
  const before = fs.readFileSync(file, 'utf8');
  let html = before;
  const head = html.slice(0, html.indexOf('</head>'));
  const tags = [...head.matchAll(/<(?:meta|link)\b[^>]*>/gi)].map(match => match[0]);
  if (tags.some(tag => attr(tag, 'name') === 'robots' && /noindex/i.test(attr(tag, 'content') || ''))) continue;
  const canonical = attr(tags.find(tag => attr(tag, 'rel') === 'canonical') || '', 'href');
  const expected = `${origin}/${relative.replace(/\.html$/, '')}`;
  if (canonical !== expected) continue;
  const title = plain(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '');
  const description = attr(tags.find(tag => attr(tag, 'name') === 'description') || '', 'content');
  const firstImage = [...html.matchAll(/<img\b[^>]*>/gi)].map(match => match[0])
    .find(tag => !/logo|nav-scene|nav-filing/i.test(attr(tag, 'src') || '') && attr(tag, 'src')?.startsWith('/assets/'));
  const image = new URL(attr(firstImage || '', 'src') || '/assets/images/home-hero-office.webp', origin).href;
  const missing = [];
  const hasOpenGraph = tags.some(tag => attr(tag, 'property') === 'og:title');
  const hasTwitterCard = tags.some(tag => attr(tag, 'name') === 'twitter:card');
  for (const [name, value, property] of [
    ['og:type', 'website', true], ['og:site_name', 'HUANGSI', true],
    ['og:title', title, true], ['og:description', description, true],
    ['og:url', canonical, true], ['og:image', image, true],
    ['twitter:card', 'summary_large_image', false], ['twitter:title', title, false],
    ['twitter:description', description, false], ['twitter:image', image, false],
  ]) {
    if (property ? hasOpenGraph : hasTwitterCard) continue;
    if (value && !tags.some(tag => attr(tag, property ? 'property' : 'name') === name)) {
      missing.push(`<meta ${property ? 'property' : 'name'}="${name}" content="${escape(value)}">`);
    }
  }
  if (missing.length) { html = html.replace('</head>', missing.join('') + '</head>'); social++; }
  if (!html.includes('"BreadcrumbList"')) {
    const nav = html.match(/<nav\b[^>]*(?:breadcrumb|aria-label=["']Breadcrumb)[^>]*>([\s\S]*?)<\/nav>/i)?.[1];
    if (nav) {
      const items = [];
      for (const match of nav.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
        const href = attr(match[1], 'href');
        if (!href) continue;
        const item = new URL(href, canonical).href;
        if (!item.startsWith(origin + '/') || item === canonical || items.some(x => x.item === item)) continue;
        items.push({ '@type': 'ListItem', position: items.length + 1, name: plain(match[2]), item });
      }
      const name = plain(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || title);
      items.push({ '@type': 'ListItem', position: items.length + 1, name, item: canonical });
      const schema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items };
      html = html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script></head>`);
      breadcrumbs++;
    }
  }
  if (html !== before) { fs.writeFileSync(file, html); changed.push(relative); }
}
console.log(JSON.stringify({ changed: changed.length, social, breadcrumbs, files: changed }, null, 2));
