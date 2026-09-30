import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const origin = 'https://huangsifurniture.com';
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(e =>
  e.name === '.git' ? [] : e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
const escape = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const pages = new Map();
for (const file of walk(root).filter(f => f.endsWith('.html'))) {
  const html = fs.readFileSync(file, 'utf8');
  if (file.endsWith('sitemap.html') || file.endsWith('lounge-chairs-paged.html') || /<meta\b[^>]*name="robots"[^>]*noindex/.test(html)) continue;
  const url = html.match(/<link\b(?=[^>]*rel="canonical")(?=[^>]*href="([^"]+)")[^>]*>/)?.[1];
  const heading = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  if (url?.startsWith(origin + '/') && heading) pages.set(url, { name: heading, path: new URL(url).pathname });
}
const groups = new Map(['Company & services', 'Application solutions', 'Buyer guides', 'Product collections', 'Product models'].map(x => [x, []]));
for (const page of pages.values()) {
  const group = page.path.startsWith('/blog/') ? 'Buyer guides' : page.path.startsWith('/applications/') ? 'Application solutions' :
    page.path.startsWith('/products/') ? (/page-\d+$/.test(page.path) || /Collection|Chairs$|Tables$|Desks$|Sofas$|Pods$|Furniture$|Storage$|Office Workstations$/i.test(page.name) ? 'Product collections' : 'Product models') : 'Company & services';
  groups.get(group).push(page);
}
const sections = [...groups.entries()].filter(([, pages]) => pages.length).map(([group, items]) =>
  `<section><h2>${group}</h2><ul class="sitemap-links">${items.sort((a, b) => a.name.localeCompare(b.name)).map(p => `<li><a href="${p.path}">${p.name}</a></li>`).join('')}</ul></section>`).join('');
const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const header = home.match(/<header\b[\s\S]*?<\/header>/)?.[0] || '';
const footer = home.match(/<footer\b[\s\S]*?<\/footer>/)?.[0] || '';
const styles = [...home.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/g)].map(x => x[0]).join('');
const description = 'Browse HUANGSI office furniture models, product collections, buyer guides, application solutions and company information from one complete site directory.';
const schemas = [{ '@context': 'https://schema.org', '@type': 'WebPage', url: origin + '/sitemap', name: 'HUANGSI Website Directory', description },
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: origin + '/' },
    { '@type': 'ListItem', position: 2, name: 'Sitemap', item: origin + '/sitemap' }]}];
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Website Directory &amp; Product Sitemap | HUANGSI</title><meta name="description" content="${description}"><link rel="canonical" href="${origin}/sitemap"><meta property="og:type" content="website"><meta property="og:title" content="Website Directory | HUANGSI"><meta property="og:description" content="${description}"><meta property="og:url" content="${origin}/sitemap"><meta name="twitter:card" content="summary"><link rel="icon" href="/favicon.svg" type="image/svg+xml">${styles}<script defer src="/assets/js/main.js"></script><style>.site-directory{padding:48px 0}.site-directory h1{font-size:2.5rem}.site-directory section{margin:40px 0}.sitemap-links{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px 32px;padding-left:20px}.sitemap-links a{color:inherit;text-decoration:underline;overflow-wrap:anywhere}.site-directory p{max-width:760px}</style>${schemas.map(x => `<script type="application/ld+json">${JSON.stringify(x)}</script>`).join('')}</head><body>${header}<main class="site-directory"><div class="container"><nav aria-label="Breadcrumb"><a href="/">Home</a> / Sitemap</nav><h1>HUANGSI Website Directory</h1><p>${escape(description)}</p>${sections}</div></main>${footer}</body></html>`;
fs.writeFileSync(path.join(root, 'sitemap.html'), html);
for (const file of walk(root).filter(f => f.endsWith('.html'))) {
  const html = fs.readFileSync(file, 'utf8');
  const updated = html.replace(/href="\/sitemap\.xml"(?=>Sitemap<)/g, 'href="/sitemap"');
  if (updated !== html) fs.writeFileSync(file, updated);
}
console.log(`HTML directory links to ${pages.size} canonical pages.`);
