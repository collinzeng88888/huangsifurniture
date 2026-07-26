import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === ".git" || entry.name === "node_modules") return [];
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function textBetween(content, pattern) {
  return content.match(pattern)?.[1]?.trim() ?? "";
}

function cleanUrl(value) {
  if (value === "https://huangsifurniture.com/index.html") {
    return "https://huangsifurniture.com/";
  }
  return value.replace(/\.html$/, "");
}

function addImageDimensions(content) {
  return content.replace(/<img\b[^>]*>/gi, (tag) => {
    if (/\bwidth=/.test(tag) && /\bheight=/.test(tag)) return tag;
    const src = tag.match(/\bsrc="([^"]+)"/i)?.[1];
    if (!src || /^(?:https?:|data:)/i.test(src) || /\.svg(?:$|[?#])/i.test(src)) return tag;

    const local = path.join(root, src.replace(/^\//, ""));
    if (!fs.existsSync(local)) return tag;

    try {
      const size = execFileSync("identify", ["-format", "%w %h", local], {
        encoding: "utf8",
      }).trim();
      const [width, height] = size.split(/\s+/);
      if (!width || !height) return tag;
      const withoutPartialDimensions = tag
        .replace(/\swidth="[^"]*"/i, "")
        .replace(/\sheight="[^"]*"/i, "");
      return withoutPartialDimensions.replace(
        /\bsrc="[^"]+"/i,
        (srcAttr) => `${srcAttr} width="${width}" height="${height}"`,
      );
    } catch {
      return tag;
    }
  });
}

function addSocialMetadata(content) {
  if (content.includes('property="og:title"')) return content;

  const title = textBetween(content, /<title>([\s\S]*?)<\/title>/i);
  const description = textBetween(
    content,
    /<meta\s+name="description"\s+content="([^"]*)"/i,
  );
  const canonical = textBetween(
    content,
    /<link\s+rel="canonical"\s+href="([^"]*)"/i,
  );
  if (!title || !description || !canonical) return content;

  const tags = [
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="HUANGSI">`,
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${description}">`,
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:image" content="https://huangsifurniture.com/assets/images/home-hero-office.webp">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${title}">`,
    `<meta name="twitter:description" content="${description}">`,
    `<meta name="twitter:image" content="https://huangsifurniture.com/assets/images/home-hero-office.webp">`,
  ].join("");

  return content.replace(
    /(<link\s+rel="canonical"\s+href="[^"]+">)/i,
    `$1${tags}`,
  );
}

function addBlogPostingSchema(content, relativePath) {
  if (!relativePath.startsWith("blog/") || content.includes('"BlogPosting"')) {
    return content;
  }

  const title = textBetween(content, /<title>([\s\S]*?)<\/title>/i);
  const description = textBetween(
    content,
    /<meta\s+name="description"\s+content="([^"]*)"/i,
  );
  const canonical = textBetween(
    content,
    /<link\s+rel="canonical"\s+href="([^"]*)"/i,
  );
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title.replace(/\s*\|\s*Office Furniture Buying Guide\s*$/i, ""),
    description,
    url: canonical,
    datePublished: "2026-07-22",
    dateModified: "2026-07-26",
    author: { "@type": "Organization", name: "HUANGSI" },
    publisher: {
      "@type": "Organization",
      name: "Foshan Huangsi Furniture Co., Ltd.",
      logo: {
        "@type": "ImageObject",
        url: "https://huangsifurniture.com/assets/images/logo-huangsi.png",
      },
    },
    image: "https://huangsifurniture.com/assets/images/home-hero-office.webp",
    mainEntityOfPage: canonical,
  };

  return content.replace(
    "</head>",
    `<script type="application/ld+json">${JSON.stringify(schema)}</script></head>`,
  );
}

function improvePublicCopy(content, relativePath) {
  let next = content
    .replaceAll("COF Manufacturing", "HUANGSI")
    .replaceAll(
      "© 2026 HUANGSI. Replace this placeholder brand, address and contact information with your real company details before publishing.",
      "© 2026 Foshan Huangsi Furniture Co., Ltd. All rights reserved.",
    )
    .replaceAll(
      "© 2026 HUANGSI. Replace placeholder company and contact information before publishing.",
      "© 2026 Foshan Huangsi Furniture Co., Ltd. All rights reserved.",
    )
    .replaceAll(
      "Write real production capacity, workshop photos and equipment here.",
      "Each project is reviewed by product type, quantity, finish and destination so the supply scope can be confirmed before quotation.",
    )
    .replaceAll(
      "Show customization, samples, drawings and private-label packaging options.",
      "Customization can cover dimensions, colors, materials, accessories, carton marks and packing requirements, subject to model review.",
    )
    .replaceAll(
      "Add carton data, 20GP/40HQ loading, destination markets and delivery terms.",
      "Packing and container planning are prepared around the approved product mix and destination requirements.",
    )
    .replaceAll(
      "Prepare a supplier profile for buyers",
      "Plan Your Office Furniture Project",
    )
    .replaceAll(
      "Add real credentials, audits, test reports, case studies and catalog files.",
      "Send your product list, quantities, finish references and destination port for a tailored quotation.",
    )
    .replace(/KD \d+–\d+ \| \d+–\d+ months target for Top 15/g, "Project Supply")
    .replaceAll(
      " This page is structured for manufacturer, supplier, wholesale and OEM search intent rather than retail shopping intent.",
      "",
    )
    .replace(
      /<p><strong>Target keywords:<\/strong><\/p><p>(?:<span class="tag">.*?<\/span>)+<\/p>/g,
      "",
    )
    .replaceAll(
      "Export packaging should be engineered for damage reduction and container efficiency. We recommend showing carton size, gross weight, net weight, CBM, pallet option, KD structure and 20GP/40HQ loading quantity on real product pages.",
      "Packaging is confirmed against the approved product specification and shipping plan. Ask for model-specific carton dimensions, gross weight, CBM, pallet options and estimated 20GP/40HQ loading quantities with your quotation.",
    )
    .replaceAll(
      "Quality content should include incoming material inspection, trial assembly, color/finish checking, load testing where applicable, hardware counting, carton drop protection and final inspection before shipment.",
      "Order checks can cover material and finish confirmation, trial assembly, functional inspection, hardware counting, packaging review and pre-shipment verification according to the approved specification.",
    )
    .replace(
      /<div class="notice"><strong>Before publishing:<\/strong> replace placeholder specifications with real factory data, real product photos, test standards, certificates and exact MOQ\.<\/div>/g,
      '<div class="notice"><strong>Quotation note:</strong> Final specifications, MOQ, testing requirements, packing method and delivery plan are confirmed by model and order scope.</div>',
    )
    .replaceAll(
      "We are positioned as a factory supplier for bulk commercial office furniture projects. Replace this placeholder with your real factory information, certifications and production capacity.",
      "HUANGSI supports commercial office furniture manufacturing and project supply for distributors, contractors and corporate buyers. Factory qualification documents and production details can be reviewed during the RFQ process.",
    )
    .replaceAll("SEO Guide", "Buyer Guide")
    .replace(
      /B2B buying guide focused on [^.]+ and commercial office furniture procurement\./g,
      "Practical guidance for commercial buyers comparing specifications, customization, packing and quotations.",
    )
    .replace(
      /For a new independent website, content should support product pages and answer procurement questions\. This article targets <strong>[^<]+<\/strong> while guiding buyers toward specifications, customization, packing and quotation details\./g,
      "Clear specifications help commercial buyers compare suppliers, reduce quotation revisions and align product, finish, packing and delivery requirements before ordering.",
    )
    .replaceAll(
      "This hub page is designed as the main authority page for commercial office furniture manufacturer, office furniture OEM factory, custom office furniture manufacturer and office furniture supplier searches.",
      "HUANGSI brings together workstations, desks, seating, reception furniture, storage and acoustic solutions for distributors, contractors and commercial project buyers.",
    )
    .replaceAll(
      "Why This Positioning Works for New SEO Sites",
      "Built for Commercial Project Purchasing",
    )
    .replaceAll(
      "Instead of directly competing with broad retail terms such as office chair, office furniture or desk, this site focuses on B2B terms with manufacturer, supplier, OEM, custom and bulk order intent.",
      "The product range is organized around commercial use, coordinated specifications, OEM options, export packing and mixed-category project supply rather than single-item retail orders.",
    )
    .replaceAll(
      "QC should include material inspection, color confirmation, trial assembly, load testing where applicable, hardware counting, carton check and pre-shipment inspection.",
      "A project quality plan can include material and color confirmation, trial assembly, functional checks, hardware counting, packaging review and pre-shipment verification according to the approved specification.",
    )
    .replaceAll(
      "Use this page to host PDF catalog downloads, product range summaries, MOQ, material options and RFQ forms.",
      "Browse the main HUANGSI product categories, then send the relevant models, quantities, finish requirements and destination for a project quotation.",
    )
    .replaceAll(
      "Packaging and loading content is critical for B2B buyers. Include carton size, CBM, gross weight, pallet option, mixed container plan and damage-control methods.",
      "Model-specific packing information can include carton dimensions, CBM, gross weight, pallet options and estimated container quantities. Mixed-category loading plans are reviewed against the approved product list.",
    )
    .replaceAll(
      '"manufacturer": {"@type": "Organization", "name": "HUANGSI"}',
      '"manufacturer": {"@type": "Organization", "name": "Foshan Huangsi Furniture Co., Ltd."}',
    )
    .replaceAll("Recommended Internal Links", "Related Products")
    .replaceAll("Are you an reception desk manufacturer", "Are you a reception desk manufacturer")
    .replace(
      /Are you (?:a|an) ([^?]+) manufacturer or trading company\?/g,
      "Does HUANGSI supply $1 for commercial projects?",
    )
    .replace(
      /The standard MOQ depends on model and configuration\. For [^.]+, typical MOQ is listed in the specification table and can be adjusted for mixed-container projects\./g,
      "MOQ depends on the selected model, finish, quantity and packing requirements. It is confirmed in the project quotation.",
    )
    .replace(
      /<tr><th>MOQ<\/th><td>[\s\S]*?<\/td><\/tr>/g,
      "<tr><th>MOQ</th><td>Confirmed by model, finish, project quantity and packing requirements</td></tr>",
    )
    .replaceAll(
      "Modular office workstations for corporate offices, call centers, co-working spaces and commercial projects. Designed for bulk export, projec...",
      "Modular office workstations for corporate offices, call centers, co-working spaces and commercial projects.",
    )
    .replaceAll(
      "Flexible workstation systems for open-plan offices and commercial office projects, with cable management and scalable layouts....",
      "Flexible workstation systems for open-plan offices, with cable management and scalable layouts.",
    )
    .replaceAll(
      "Custom reception desks and front counters for offices, clinics, hotels, schools and commercial lobbies. Built for project purchasing and bra...",
      "Custom reception desks and front counters for offices, clinics, hotels, schools and commercial lobbies.",
    )
    .replaceAll(
      "Executive desks for management offices, corporate projects and government procurement. Available in premium finishes with side cabinet, wire...",
      "Executive desks with coordinated side cabinets, wire management and finish options for commercial projects.",
    )
    .replaceAll(
      "Mesh task chairs and ergonomic office chairs for corporate offices, distributors and project buyers. Suitable for OEM color, mechanism, armr...",
      "Mesh task chairs for corporate offices and distributors, with model-based color, mechanism, armrest and base options.",
    )
    .replaceAll(
      "Office storage cabinets, filing cabinets, lockers and bookcase storage systems for corporate offices, schools, clinics and commercial interi...",
      "Office storage cabinets, filing cabinets, lockers and bookcases for corporate and commercial interiors.",
    )
    .replaceAll(
      "Metal and board filing cabinets for bulk office furniture projects, document rooms and corporate storage systems....",
      "Metal and board filing cabinets for office projects, document rooms and corporate storage systems.",
    )
    .replaceAll(
      "Acoustic panels and sound-absorbing wall solutions for meeting rooms, phone booths, open-plan offices and commercial interiors....",
      "Acoustic panels and sound-absorbing wall solutions for meeting rooms, phone areas and open-plan offices.",
    )
    .replaceAll(
      "Acoustic office pods and phone booths for private calls, focused work and flexible workplace layouts. Project-based supply with customizatio...",
      "Acoustic office pods and phone booths for private calls, focused work and flexible workplace layouts.",
    )
    .replaceAll(
      "Office sofas and commercial lounge seating for reception areas, waiting rooms, executive lounges and collaborative office spaces....",
      "Office sofas and lounge seating for reception areas, waiting rooms and collaborative spaces.",
    )
    .replaceAll(
      "Electric height adjustable desks and sit-stand office desks for corporate wellness projects, commercial workstations and office furniture di...",
      "Electric sit-stand desks for corporate projects, commercial workstations and office furniture distributors.",
    )
    .replaceAll(
      "Commercial office desks for project buyers, distributors and bulk export. Available in standard, manager, staff and training desk configurat...",
      "Commercial office desks for project buyers, including staff, manager and training configurations.",
    )
    .replaceAll(
      "Office chairs for commercial furniture distributors, office projects and bulk export. This page supports the ergonomic mesh chair page and b...",
      "Office seating options for commercial furniture distributors and coordinated workplace projects.",
    )
    .replaceAll(
      "Yes. Product pages include export packing logic, and bulk projects can include carton size, CBM, 20GP/40HQ loading plan and mixed-container suggestions.",
      "Yes. Model-specific packing data can include carton dimensions, CBM, estimated 20GP/40HQ quantities and mixed-category loading suggestions.",
    )
    .replace(
      /<h2>What to replace<\/h2><p>Replace this placeholder with real photos, order quantity, delivery country, product list, timeline, packaging method and buyer feedback\.<\/p>/g,
      "<h2>Project Documentation</h2><p>Detailed project records are shared when publication and customer confidentiality allow. Contact HUANGSI for product references, packing examples and qualification information relevant to your procurement scope.</p>",
    )
    .replaceAll('<div class="eyebrow">Case Study</div>', '<div class="eyebrow">Project Capability</div>')
    .replace(
      '<form><label>Name</label><input placeholder="Your name">',
      '<form data-rfq-form><label>Name</label><input name="name" autocomplete="name" required>',
    )
    .replace(
      '<label>Email</label><input placeholder="Your email">',
      '<label>Email</label><input type="email" name="email" autocomplete="email" required>',
    )
    .replace(
      '<label>Product Needed</label><select>',
      '<label>Product Needed</label><select name="product">',
    )
    .replace(
      '<textarea rows="5" placeholder="Quantity, dimensions, MOQ, target price, destination port..."></textarea>',
      '<textarea name="message" rows="5" required placeholder="Quantity, dimensions, materials and destination port..."></textarea>',
    )
    .replace(
      '<a class="btn" href="mailto:huangsifurniture@gmail.com">Email RFQ</a></form>',
      '<button class="btn" type="submit">Prepare Email RFQ</button><p class="form-status" data-rfq-status aria-live="polite"></p><p class="form-note">Opens your email application for review before sending.</p></form>',
    );

  if (relativePath.startsWith("case-studies/")) {
    if (!next.includes('name="robots"')) {
      next = next.replace(
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
        '<meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, follow">',
      );
    }
  }

  return next;
}

const htmlFiles = walk(root).filter((file) => file.endsWith(".html"));

for (const file of htmlFiles) {
  const relativePath = path.relative(root, file).replaceAll(path.sep, "/");
  let content = fs.readFileSync(file, "utf8");

  content = content
    .replaceAll("https://huangsifurniture.com/index.html", "https://huangsifurniture.com/")
    .replaceAll("/index.html", "/")
    .replace(/(https:\/\/huangsifurniture\.com\/[^"'?#\s<]*)\.html/g, "$1")
    .replace(/href="([^"]*?)\.html([#?"])/g, 'href="$1$2');

  content = improvePublicCopy(content, relativePath);
  content = addSocialMetadata(content);
  content = addBlogPostingSchema(content, relativePath);
  content = addImageDimensions(content);
  fs.writeFileSync(file, content);
}

let sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
sitemap = sitemap
  .replaceAll("https://huangsifurniture.com/index.html", "https://huangsifurniture.com/")
  .replace(/(https:\/\/huangsifurniture\.com\/[^<]*)\.html/g, "$1")
  .replace(/<url><loc>https:\/\/huangsifurniture\.com\/case-studies\/[\s\S]*?<\/url>\n?/g, "")
  .replaceAll("<lastmod>2026-07-13</lastmod>", "<lastmod>2026-07-26</lastmod>");
fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap);

console.log(`Updated ${htmlFiles.length} HTML files and sitemap.xml.`);
