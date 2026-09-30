import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const origin = 'https://huangsifurniture.com';
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.name === '.git' ? [] : e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
const errors = [], pages = new Map(), links = new Set(), counts = { html: 0, noindex: 0, prerendered: 0, itemPages: 0 };
const config = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
for (const file of walk(root).filter(f => f.endsWith('.html'))) {
  const html = fs.readFileSync(file, 'utf8'), relative = path.relative(root, file);
  counts.html++;
  const head = html.slice(0, html.indexOf('</head>'));
  const canonical = head.match(/<link\b(?=[^>]*rel=["']canonical["'])(?=[^>]*href=["']([^"']+)["'])[^>]*>/)?.[1];
  const noindex = /<meta\b[^>]*name="robots"[^>]*noindex/.test(head);
  if (noindex) counts.noindex++;
  const alias = relative === 'products/lounge-chairs-paged.html';
  if (!noindex && !alias) {
    if (!canonical?.startsWith(origin + '/')) errors.push(`${relative}: invalid canonical`);
    const expected = relative === 'index.html' ? origin + '/' : origin + '/' + relative.replace(/\.html$/, '');
    if (canonical !== expected) errors.push(`${relative}: canonical does not match route`);
    if ((html.match(/<h1\b/gi) || []).length !== 1) errors.push(`${relative}: requires one static H1`);
    if (!/<meta\b[^>]*name="description"[^>]*content="[^"]+"/.test(head)) errors.push(`${relative}: missing description`);
    pages.set(canonical, relative);
  }
  if (html.includes('data-prerendered="true"')) counts.prerendered++;
  for (const block of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      const schema = JSON.parse(block[1]);
      if (schema['@type'] === 'ItemPage') counts.itemPages++;
      if (schema['@type'] === 'Product' && !schema.offers && !schema.review && !schema.aggregateRating) errors.push(`${relative}: ineligible Product snippet`);
      if (schema['@type'] === 'BreadcrumbList') {
        if (!schema.itemListElement?.length || schema.itemListElement.some((item, i) => item.position !== i + 1 || !item.name || !item.item?.startsWith(origin))) errors.push(`${relative}: invalid breadcrumbs`);
      }
    } catch (e) { errors.push(`${relative}: invalid JSON-LD: ${e.message}`); }
  }
  // Exclude script source: verify real anchor links available in the initial DOM.
  const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
  for (const anchor of markup.matchAll(/<a\b[^>]*href=["']([^"']+)["']/g)) {
    const url = new URL(anchor[1].replaceAll('&amp;', '&'), canonical || origin + '/');
    if (url.origin !== origin) continue;
    const target = url.pathname;
    links.add(origin + target);
    if (target.startsWith('/assets/')) continue;
    const local = target === '/' ? 'index.html' : path.extname(target) ? target.slice(1) : target.slice(1) + '.html';
    if (!fs.existsSync(path.join(root, local))) errors.push(`${relative}: broken link ${anchor[1]}`);
    if (anchor[1].startsWith('#') && !new RegExp(`\\bid=["']${url.hash.slice(1)}["']`).test(markup)) errors.push(`${relative}: broken fragment ${anchor[1]}`);
  }
}
const xml = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(x => x[1]);
if (new Set(urls).size !== urls.length) errors.push('Sitemap contains duplicate URLs');
for (const url of urls) {
  if (!pages.has(url)) errors.push(`Sitemap includes non-indexable or non-canonical URL: ${url}`);
  if (!links.has(url)) errors.push(`No crawlable HTML link to sitemap URL: ${url}`);
}
for (const url of pages.keys()) if (!urls.includes(url)) errors.push(`Indexable URL missing from sitemap: ${url}`);
if (counts.prerendered !== 44) errors.push('Expected 44 prerendered product pages');
if (!config.redirects?.some(r => r.has?.some(h => h.type === 'host' && h.value === 'www.huangsifurniture.com') && r.permanent)) errors.push('Missing permanent www redirect');
for (const route of ['/products/lounge-chairs', '/products/lounge-chairs/page-2']) if (config.rewrites?.some(r => r.source === route)) errors.push(`Pagination route still uses dynamic rewrite: ${route}`);
console.log(JSON.stringify({ ...counts, sitemap: urls.length, errors: errors.length }, null, 2));
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
