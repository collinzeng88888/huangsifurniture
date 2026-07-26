import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const meshPath = path.join(root, "products", "ergonomic-mesh-office-chair.html");
const leatherPath = path.join(root, "products", "leather-office-chair.html");

function selector(activeType) {
  const card = (type, href, image, eyebrow, title, text) => {
    const active = activeType === type;
    return `<a class="chair-type-card${active ? " is-active" : ""}" href="${href}"${active ? ' aria-current="page"' : ""}><img src="${image}" width="1200" height="1200" alt="${title}" loading="lazy"><div class="chair-type-card__body"><span>${eyebrow}</span><h3>${title}</h3><p>${text}</p><strong>${active ? "Current selection" : "View category"} →</strong></div></a>`;
  };

  return `<section class="chair-type-selector" aria-labelledby="chair-type-heading"><div class="chair-type-selector__heading"><span class="eyebrow">Office Chair Categories</span><h2 id="chair-type-heading">Choose your office chair type</h2><p>Compare breathable mesh task seating with premium upholstered leather seating for commercial projects and bulk orders.</p></div><div class="chair-type-grid">${card("mesh", "/products/ergonomic-mesh-office-chair", "/assets/images/card-chair-03.webp", "办公网椅 · Mesh Office Chairs", "Ergonomic Mesh Office Chairs", "Breathable task seating with model-based lumbar support, mechanisms, armrests and frame options.")}${card("leather", "/products/leather-office-chair", "/assets/images/card-chair-01.webp", "办公皮椅 · Leather Office Chairs", "Executive Leather Office Chairs", "Upholstered executive seating for private offices, boardrooms and management environments.")}</div></section>`;
}

function addProductImage(html, image) {
  return html.replace(
    /"category":\s*"Commercial Office Furniture",\s*"url":/i,
    `"category": "Office Chairs", "image": "${image}", "url":`,
  );
}

let mesh = fs.readFileSync(meshPath, "utf8");
const originalMesh = mesh.replace(/<section class="chair-type-selector"[\s\S]*?<\/section>/i, "");

mesh = originalMesh
  .replaceAll(
    "https://huangsifurniture.com/assets/images/home-hero-office.webp",
    "https://huangsifurniture.com/assets/images/card-chair-03.webp",
  )
  .replace(
    '<img src="/assets/images/office-chair.svg" alt="Ergonomic Mesh Office Chair Manufacturer" style="border-radius:24px;border:1px solid var(--line);margin-bottom:26px">',
    '<img class="product-hero-image" src="/assets/images/card-chair-03.webp" width="1200" height="1200" alt="Ergonomic mesh office chair for commercial projects" loading="eager">',
  )
  .replace(
    '<div class="badge-row"><span class="badge">Project Supply</span><span class="badge">Bulk Order</span><span class="badge">OEM / ODM</span></div>',
    `<div class="badge-row"><span class="badge">Project Supply</span><span class="badge">Bulk Order</span><span class="badge">OEM / ODM</span></div>${selector("mesh")}`,
  )
  .replace(
    "<option>Office Chairs</option>",
    "<option>Mesh Office Chairs</option><option>Leather Office Chairs</option>",
  );
mesh = addProductImage(
  mesh,
  "https://huangsifurniture.com/assets/images/card-chair-03.webp",
);
fs.writeFileSync(meshPath, mesh);

const leatherDescription =
  "Source executive leather office chairs with model-based upholstery, cushioning, mechanisms, armrests, bases and packing for commercial projects.";
const leatherOverview =
  "Executive leather office chairs and upholstered management seating for private offices, boardrooms, conference rooms and commercial projects. Model options can be reviewed by upholstery, cushioning, mechanism, armrest, base and finish requirements.";
const leatherSpecs =
  '<h2 id="specs">Key Specifications</h2><table class="spec-table"><tr><th>Upholstery</th><td>Model-based genuine leather, PU leather or other approved upholstery options</td></tr><tr><th>Seat &amp; Back</th><td>Upholstered cushioning, high-back or mid-back configurations</td></tr><tr><th>Mechanism</th><td>Height adjustment, tilt, tension and model-based locking positions</td></tr><tr><th>Armrest</th><td>Upholstered, fixed or model-specific armrest configurations</td></tr><tr><th>Base</th><td>Aluminum, chrome or model-based metal and nylon base options</td></tr><tr><th>Color</th><td>Black, brown, neutral and project-based upholstery references subject to model review</td></tr><tr><th>MOQ</th><td>Confirmed by model, upholstery, project quantity and packing requirements</td></tr></table>';

let leather = originalMesh
  .replaceAll(
    "Ergonomic Mesh Office Chair Manufacturer | HUANGSI",
    "Leather Office Chair Manufacturer | HUANGSI",
  )
  .replaceAll(
    "Ergonomic Mesh Office Chair Manufacturer | Office Chair Supplier",
    "Leather Office Chair Manufacturer | Executive Chair Supplier",
  )
  .replaceAll(
    "Ergonomic Mesh Office Chair Manufacturer",
    "Leather Office Chair Manufacturer",
  )
  .replaceAll("Ergonomic Mesh Office Chair", "Leather Office Chair")
  .replaceAll("ergonomic mesh office chair", "leather office chair")
  .replaceAll(
    "https://huangsifurniture.com/products/ergonomic-mesh-office-chair",
    "https://huangsifurniture.com/products/leather-office-chair",
  )
  .replaceAll(
    "Source ergonomic mesh task chairs with model-based mechanisms, lumbar support, armrests, bases, colors and packing for commercial projects.",
    leatherDescription,
  )
  .replaceAll(
    "Mesh task chairs and ergonomic office chairs for corporate offices, distributors and project buyers. Suitable for OEM color, mechanism, armrest and base options.",
    leatherOverview,
  )
  .replaceAll(
    "Breathable mesh back, lumbar support optional",
    "Upholstered high back with model-based cushioning and support",
  )
  .replace(
    /<h2 id="specs">Key Specifications<\/h2><table class="spec-table">[\s\S]*?<\/table>/i,
    leatherSpecs,
  )
  .replace(
    '<img src="/assets/images/office-chair.svg" alt="Leather Office Chair Manufacturer" style="border-radius:24px;border:1px solid var(--line);margin-bottom:26px">',
    '<img class="product-hero-image" src="/assets/images/card-chair-01.webp" width="1200" height="1200" alt="Executive leather office chair for commercial projects" loading="eager">',
  )
  .replaceAll(
    "https://huangsifurniture.com/assets/images/home-hero-office.webp",
    "https://huangsifurniture.com/assets/images/card-chair-01.webp",
  )
  .replace(
    '<div class="badge-row"><span class="badge">Project Supply</span><span class="badge">Bulk Order</span><span class="badge">OEM / ODM</span></div>',
    `<div class="badge-row"><span class="badge">Project Supply</span><span class="badge">Bulk Order</span><span class="badge">OEM / ODM</span></div>${selector("leather")}`,
  )
  .replaceAll(
    "Material Options</h3><p>Board, steel, aluminum, fabric, mesh, upholstery and surface finish can be selected for project requirements.",
    "Upholstery Options</h3><p>Leather type, color, stitching, cushioning and visible surface details are confirmed by model and approved reference.",
  )
  .replaceAll(
    "KD flat-pack cartons for desks and workstations.",
    "Protected cartons for upholstered executive chair components.",
  )
  .replaceAll(
    "Stackable or nested packing for selected seating models.",
    "Surface, armrest and base protection for selected seating models.",
  )
  .replaceAll(
    "What is the MOQ for leather office chair?",
    "What is the MOQ for leather office chairs?",
  )
  .replaceAll(
    "Can you customize size, color and materials?",
    "Can leather chair upholstery and colors be customized?",
  )
  .replaceAll(
    "Yes. OEM / ODM customization can include board finish, frame color, upholstery, dimensions, accessories, carton mark and project labeling.",
    "Model-based options can include upholstery type and color, stitching details, cushioning, armrest finish, base and private-label packaging.",
  )
  .replaceAll(
    "Need a quotation for Leather Office Chair?",
    "Need a quotation for Executive Leather Office Chairs?",
  )
  .replace(
    "<option>Office Chairs</option>",
    "<option>Mesh Office Chairs</option><option selected>Leather Office Chairs</option>",
  )
  .replaceAll(
    "rfq-products-ergonomic-mesh-office-chair-html",
    "rfq-products-leather-office-chair-html",
  );
leather = addProductImage(
  leather,
  "https://huangsifurniture.com/assets/images/card-chair-01.webp",
);
fs.writeFileSync(leatherPath, leather);

const officeChairsPath = path.join(root, "office-chairs.html");
let officeChairs = fs.readFileSync(officeChairsPath, "utf8");
officeChairs = officeChairs.replace(
  /<div class="grid cols-3"><div class="card"><img src="\/assets\/images\/office-chair\.svg" alt="Ergonomic Mesh Office Chair">[\s\S]*?<\/div><\/div><div class="cta-band">/i,
  '<div class="grid cols-3"><div class="card"><img src="/assets/images/card-chair-03.webp" width="1200" height="1200" alt="Ergonomic mesh office chair" loading="lazy"><h3>Mesh Office Chairs</h3><p>Breathable ergonomic task seating with model-based lumbar support, mechanisms, armrests and bases.</p><a class="text-link" href="/products/ergonomic-mesh-office-chair">View mesh office chairs →</a></div><div class="card"><img src="/assets/images/card-chair-01.webp" width="1200" height="1200" alt="Executive leather office chair" loading="lazy"><h3>Leather Office Chairs</h3><p>Upholstered executive seating for private offices, boardrooms and management environments.</p><a class="text-link" href="/products/leather-office-chair">View leather office chairs →</a></div></div><div class="cta-band">',
);
fs.writeFileSync(officeChairsPath, officeChairs);

const indexPath = path.join(root, "index.html");
let index = fs.readFileSync(indexPath, "utf8");
index = index
  .replace(
    '<a class="home-catalog-card" href="/products/ergonomic-mesh-office-chair"><img src="/assets/images/card-chair-01.webp" width="1200" height="1200" alt="Ergonomic mesh task chair" loading="lazy"><div><small>Office Chairs</small><strong>Ergonomic Mesh Chair</strong></div></a>',
    '<a class="home-catalog-card" href="/products/leather-office-chair"><img src="/assets/images/card-chair-01.webp" width="1200" height="1200" alt="Black executive leather office chair" loading="lazy"><div><small>Leather Office Chairs</small><strong>Executive Leather Chair</strong></div></a>',
  )
  .replace(
    '<a class="home-catalog-card" href="/products/office-chair"><img src="/assets/images/card-chair-02.webp" width="1200" height="1200" alt="Commercial office task chair" loading="lazy"><div><small>Office Chairs</small><strong>Commercial Task Chair</strong></div></a>',
    '<a class="home-catalog-card" href="/products/leather-office-chair"><img src="/assets/images/card-chair-02.webp" width="1200" height="1200" alt="Light upholstered leather office chair" loading="lazy"><div><small>Leather Office Chairs</small><strong>Upholstered Office Chair</strong></div></a>',
  )
  .replace(
    '<a class="home-catalog-card" href="/products/ergonomic-mesh-office-chair"><img src="/assets/images/card-chair-03.webp" width="1200" height="1200" alt="High-back mesh office chair" loading="lazy"><div><small>Office Chairs</small><strong>High-Back Mesh Chair</strong></div></a>',
    '<a class="home-catalog-card" href="/products/ergonomic-mesh-office-chair"><img src="/assets/images/card-chair-03.webp" width="1200" height="1200" alt="High-back ergonomic mesh office chair" loading="lazy"><div><small>Mesh Office Chairs</small><strong>High-Back Mesh Chair</strong></div></a>',
  )
  .replace(
    '<a class="home-catalog-card" href="/products/office-chair"><img src="/assets/images/card-chair-04.webp" width="1200" height="1200" alt="Multipurpose office chair" loading="lazy"><div><small>Office Chairs</small><strong>Multipurpose Chair</strong></div></a>',
    '<a class="home-catalog-card" href="/products/ergonomic-mesh-office-chair"><img src="/assets/images/card-chair-04.webp" width="1200" height="1200" alt="Black commercial mesh task chair" loading="lazy"><div><small>Mesh Office Chairs</small><strong>Commercial Mesh Chair</strong></div></a>',
  );
fs.writeFileSync(indexPath, index);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === ".git" || entry.name === "node_modules") return [];
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

for (const file of walk(root).filter((item) => item.endsWith(".html"))) {
  let html = fs.readFileSync(file, "utf8");
  html = html.replace(
    "<option>Office Chairs</option>",
    "<option>Mesh Office Chairs</option><option>Leather Office Chairs</option>",
  );
  fs.writeFileSync(file, html);
}

const sitemapPath = path.join(root, "sitemap.xml");
let sitemap = fs.readFileSync(sitemapPath, "utf8");
if (!sitemap.includes("/products/leather-office-chair")) {
  sitemap = sitemap.replace(
    "<url><loc>https://huangsifurniture.com/products/ergonomic-mesh-office-chair</loc>",
    "<url><loc>https://huangsifurniture.com/products/leather-office-chair</loc><lastmod>2026-07-26</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>\n<url><loc>https://huangsifurniture.com/products/ergonomic-mesh-office-chair</loc>",
  );
}
fs.writeFileSync(sitemapPath, sitemap);

const keywordPath = path.join(root, "keyword-map.csv");
let keywords = fs
  .readFileSync(keywordPath, "utf8")
  .replaceAll("\r\n", "\n")
  .replaceAll(".html,", ",");
if (!keywords.includes("leather office chair manufacturer")) {
  keywords +=
    "\nA,leather office chair manufacturer,/products/leather-office-chair,Manufacturer,KD 35–50,Executive and upholstered office seating\nA,executive leather office chair supplier,/products/leather-office-chair,Supplier,KD 35–50,Commercial project and bulk order intent\n";
}
fs.writeFileSync(keywordPath, keywords);

console.log("Added mesh and leather office chair category options.");
