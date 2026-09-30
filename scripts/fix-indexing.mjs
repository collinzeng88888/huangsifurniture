import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const origin = 'https://huangsifurniture.com';
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const write = (file, text) => {
  fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
  fs.writeFileSync(path.join(root, file), text);
};
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap(e =>
  e.name === '.git' ? [] : e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
const plain = (s) => s.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const schemaTag = (data) => `<script type="application/ld+json">${JSON.stringify(data).replaceAll('<', '\\u003c')}</script>`;
let rendered = 0, pageSchemas = 0, breadcrumbs = 0;

// Use the existing renderer itself, so the initial HTML matches the gallery UI.
for (const file of walk(root).filter(f => f.endsWith('.html'))) {
  let html = fs.readFileSync(file, 'utf8');
  const mount = html.match(/<main\b[^>]*\bdata-(staff|conference)-detail-root[^>]*>/);
  if (!mount || mount[0].includes('data-prerendered')) continue;
  const renderer = html.match(/src="(\/assets\/js\/(?:staff-desk-(?:extended|page2)-detail|conference-table-page2-detail)\.js)"/)?.[1];
  const model = html.match(/<body\b[^>]*data-product="([^"]+)"/)?.[1];
  if (!renderer || !model) throw new Error(`Cannot render ${file}`);
  const element = { innerHTML: '', dataset: {} }, schemas = [], styles = {};
  const document = {
    body: { dataset: { product: model }, style: { setProperty: (key, value) => { styles[key] = value; } } },
    querySelector: selector => selector.includes('detail-root') ? element : null,
    createElement: () => ({}),
    head: { appendChild: script => schemas.push(JSON.parse(script.textContent)) },
  };
  vm.runInNewContext(read(renderer.slice(1)), { document, console }, { timeout: 2000 });
  if (!element.innerHTML.includes('<h1>')) throw new Error(`Empty rendered product ${model}`);
  html = html.replace(/<main\b[^>]*\bdata-(?:staff|conference)-detail-root[^>]*>[\s\S]*?<\/main>/,
    `${mount[0].slice(0, -1)} data-prerendered="true">${element.innerHTML}</main>`);
  if (styles['--gallery-columns']) html = html.replace(/<body\b/, `<body style="--gallery-columns:${styles['--gallery-columns']}"`);
  html = html.replace('</head>', `${schemas.map(schemaTag).join('')}</head>`);
  fs.writeFileSync(file, html);
  rendered++;
}
for (const file of ['staff-desk-extended-detail.js', 'staff-desk-page2-detail.js', 'conference-table-page2-detail.js']) {
  let code = read(`assets/js/${file}`);
  code = code.replace('if (!product || !root) return;', 'if (!product || !root || root.dataset.prerendered === "true") return;');
  write(`assets/js/${file}`, code);
}

// Both pagination routes get their own complete HTML and canonical before JS runs.
const template = read('products/lounge-chairs-paged.html');
const inline = [...template.matchAll(/<script>([\s\S]*?)<\/script>/g)].at(-1)?.[1];
for (const page of [1, 2]) {
  const route = '/products/lounge-chairs' + (page === 2 ? '/page-2' : '');
  const elements = new Map();
  const get = selector => {
    if (!elements.has(selector)) elements.set(selector, { value: 'featured', innerHTML: '', textContent: '', href: '',
      style: {}, classList: { toggle() {} }, addEventListener() {} });
    return elements.get(selector);
  };
  const document = { querySelector: get, title: '' };
  vm.runInNewContext(inline, { document, location: { pathname: route } }, { timeout: 2000 });
  let html = template.replace(/<title>.*?<\/title>/, `<title>${document.title}</title>`)
    .replace(/(<link\b[^>]*id="canonical-link"[^>]*href=")[^"]+/, `$1${origin}${route}`)
    .replace(/(<div\b[^>]*id="mesh-chair-grid"[^>]*>)[\s\S]*?<\/div>/, `$1${get('#mesh-chair-grid').innerHTML}</div>`);
  for (const [id, tag] of [['model-count', 'strong'], ['page-note', 'p'], ['breadcrumb-page', 'span']]) {
    html = html.replace(new RegExp(`(<${tag}[^>]*id="${id}"[^>]*>)[\\s\\S]*?</${tag}>`), `$1${get('#' + id).textContent}</${tag}>`);
  }
  for (const id of ['prev-page', 'next-page']) html = html.replace(new RegExp(`<a id="${id}"`), `<a style="visibility:${get('#' + id).style.visibility}" id="${id}"`);
  html = html.replace(`<a id="page-${page}"`, `<a class="active" id="page-${page}"`);
  html = html.replace(/(<meta\b[^>]*property="og:url"[^>]*content=")[^"]+/, `$1${origin}${route}`);
  write(route.slice(1) + '.html', html);
}

for (const file of walk(root).filter(f => f.endsWith('.html'))) {
  let html = fs.readFileSync(file, 'utf8');
  const canonical = html.match(/<link\b(?=[^>]*rel=["']canonical["'])(?=[^>]*href=["']([^"']+)["'])[^>]*>/)?.[1];
  if (!canonical || /<meta\b[^>]*name="robots"[^>]*noindex/.test(html)) continue;
  // RFQ-only products have no published price or review. Describe the page honestly
  // rather than declaring eligibility for Google's priced/reviewed Product snippets.
  html = html.replace(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g, (tag, text) => {
    const data = JSON.parse(text);
    if (data['@type'] !== 'Product' || data.offers || data.review || data.aggregateRating) return tag;
    const item = { '@context': 'https://schema.org', '@type': 'ItemPage', '@id': `${canonical}#webpage`,
      url: canonical, name: data.name, description: data.description,
      identifier: data.sku, image: data.image,
      publisher: data.manufacturer || { '@type': 'Organization', name: 'Foshan Huangsi Furniture Co., Ltd.' },
      isPartOf: { '@type': 'WebSite', '@id': `${origin}/#website`, url: `${origin}/`, name: 'HUANGSI' } };
    pageSchemas++;
    return schemaTag(item);
  });
  if (!html.includes('"BreadcrumbList"') && canonical !== `${origin}/`) {
    const nav = html.match(/<nav\b[^>]*(?:breadcrumb|aria-label=["']Breadcrumb)[^>]*>([\s\S]*?)<\/nav>/i)?.[1];
    if (nav) {
      const items = [];
      for (const match of nav.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/g)) {
        const url = new URL(match[1], canonical).href;
        if (url === canonical || items.some(x => x.item === url)) continue;
        items.push({ '@type': 'ListItem', position: items.length + 1, name: plain(match[2]), item: url });
      }
      items.push({ '@type': 'ListItem', position: items.length + 1,
        name: plain(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || html.match(/<title>(.*?)<\/title>/)?.[1] || ''), item: canonical });
      html = html.replace('</head>', `${schemaTag({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items })}</head>`);
      breadcrumbs++;
    }
  }
  fs.writeFileSync(file, html);
}
const config = JSON.parse(read('vercel.json'));
config.rewrites = config.rewrites.filter(r => !r.source.startsWith('/products/lounge-chairs'));
config.redirects = [
  { source: '/:path*', has: [{ type: 'host', value: 'www.huangsifurniture.com' }], destination: `${origin}/:path*`, permanent: true },
  { source: '/index', destination: '/', permanent: true },
  { source: '/products/lounge-chairs-paged', destination: '/products/lounge-chairs', permanent: true },
];
write('vercel.json', JSON.stringify(config, null, 2) + '\n');
console.log(JSON.stringify({ rendered, pageSchemas, breadcrumbs, staticLoungePages: 2 }));
