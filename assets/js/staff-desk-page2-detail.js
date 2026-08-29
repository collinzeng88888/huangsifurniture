(() => {
  const products = {
    "VT-WA1212": {
      slug: "vt-wa1212-office-workstation",
      count: 4,
      intro: "A modular team workstation with integrated privacy panels, full-height side storage, cable-ready aluminum hardware and lockable drawers.",
      chips: ["2/4-person planning", "E0 MFC panels", "Cable-ready beam", "Lockable storage"],
      specs: [
        ["Configuration sizes", "W1420 × D2400 × H1100 mm; W2840 × D2400 × H1100 mm"],
        ["Worktop", "25 mm E0-grade MFC with a beveled painted edge and matte finish"],
        ["Side storage", "16 mm E0-grade MFC panels with 1 mm PVC edge banding"],
        ["Frame", "1.2 mm aluminum hardware frame with cable-routing crossbeam"],
        ["Hardware", "Three-section drawer slides and combination locks"]
      ]
    },
    "YBL-UML-D0824": {
      slug: "ybl-uml-d0824-office-workstation",
      count: 6,
      intro: "A light-finish workstation family with rounded aluminum edge detailing, rubberwood legs, privacy screens and integrated pedestal storage.",
      chips: ["E0 particleboard", "Rounded aluminum edge", "Rubberwood legs", "PVC edge banding"],
      specs: [
        ["Configuration sizes", "W1200 × D600 × H750 mm; W1200 × D1200 × H1045 mm; W2400 × D1200 × H1045 mm"],
        ["Panel", "E0-grade particleboard selected for commercial office use"],
        ["Edge banding", "2 mm PVC edge banding applied with high-temperature hot-melt adhesive"],
        ["Edge detail", "70 mm rounded aluminum-alloy edge with titanium-tone surface treatment"],
        ["Legs", "60 mm imported Thai rubberwood legs"],
        ["Hardware", "Commercial-grade furniture hardware"]
      ]
    },
    "DO-ULX-D0214": {
      slug: "do-ulx-d0214-office-workstation",
      count: 6,
      intro: "A flexible workstation and extension combination with privacy screens, integrated storage and durable commercial panel construction.",
      chips: ["Extension planning", "E0 particleboard", "PVC edge banding", "Integrated storage"],
      specs: [
        ["Configuration sizes", "W1200 × D1200 × H750 mm; W1400 × D2200 × H750 mm; W1750 × D2200 × H1100 mm"],
        ["Panel", "E0-grade particleboard with wear-, heat- and corrosion-resistant performance"],
        ["Surface", "Quality melamine decorative paper finish"],
        ["Edge banding", "Color-matched PVC edge banding with hot-melt adhesive"],
        ["Hardware", "Commercial-grade oxidation- and corrosion-resistant hardware"]
      ]
    },
    "DO-UMY-D0314": {
      slug: "do-umy-d0314-office-workstation",
      count: 6,
      intro: "A contemporary workstation system with a formed worktop, integrated storage, privacy screens and distinctive stainless-steel legs.",
      chips: ["Formed worktop", "Integrated storage", "Privacy screen", "Stainless-steel legs"],
      specs: [
        ["Configuration sizes", "W1400 × D1400 × H750 mm; W1750 × D2200 × H1100 mm; W1400 × D2200 × H750 mm"],
        ["Worktop", "E1-grade MDF with a vacuum-formed surface"],
        ["Other panels", "E0-grade particleboard with melamine decorative paper"],
        ["Edge banding", "Color-matched PVC edge banding with hot-melt adhesive"],
        ["Legs", "Bent and laser-cut stainless steel with a custom profile"],
        ["Hardware", "Commercial-grade oxidation- and corrosion-resistant hardware"]
      ]
    },
    "DO-UYJ-D0215": {
      slug: "do-uyj-d0215-office-workstation",
      count: 5,
      intro: "A warm wood-tone two-person workstation with integrated high storage, privacy screens and a durable powder-coated support structure.",
      chips: ["Two-person layout", "E0 particleboard", "Integrated high storage", "Powder-coated frame"],
      specs: [
        ["Two-person size", "W1500 × D2200 × H1031 mm"],
        ["Panel", "E0-grade particleboard with wear-, heat- and corrosion-resistant performance"],
        ["Surface", "Quality melamine decorative paper finish"],
        ["Edge banding", "Color-matched PVC edge banding with hot-melt adhesive"],
        ["Aluminum", "Industrial-grade aluminum with electrostatic powder coating and baked finish"],
        ["Base", "Pentagonal tube and formed sheet-steel leg structure"]
      ]
    },
    "DO-YYDD-D0429": {
      slug: "do-yydd-d0429-office-workstation",
      count: 6,
      intro: "A four-person workstation with soft neutral finishes, integrated power access, lockable storage and ventilation-ready equipment space.",
      chips: ["Four-person layout", "Integrated power", "Combination locks", "Ventilated storage"],
      specs: [
        ["Four-person size", "W2900 × D1200 × H1000 mm"],
        ["Panel", "Environmentally rated solid-wood particleboard"],
        ["Finish", "Indigo gray and indigo brown melamine surfaces"],
        ["Edge banding", "Matching PVC edge banding with compliant low-impact adhesive"],
        ["Power", "Three-dimensional cable box sized for workstation power requirements"],
        ["Storage / base", "Combination locks, ventilated CPU cover and powder-coated steel feet and brackets"]
      ]
    },
    "DY-D0712": {
      slug: "dy-d0712-office-workstation",
      count: 6,
      intro: "A compact team workstation with privacy screens, integrated storage and durable melamine surfaces for commercial office planning.",
      chips: ["E0 melamine panel", "PUR edge banding", "Integrated storage", "Team planning"],
      specs: [
        ["Configuration size", "W1200 × D2000 × H765/1035 mm"],
        ["Panel", "E0-grade melamine-faced high-density board"],
        ["Panel performance", "Formaldehyde release ≤0.050 mg/L; density ≥700 kg/m³; bending strength ≥15.0 MPa"],
        ["Surface", "Melamine resin protective layer with scratch and fade resistance"],
        ["Edge banding", "PUR edge banding for strong, temperature-stable adhesion"],
        ["Adhesive / hardware", "Quality latex adhesive and corrosion-resistant commercial hardware"]
      ]
    },
    "DY-D2112": {
      slug: "dy-d2112-office-workstation",
      count: 6,
      intro: "A modular shared workstation with upholstered privacy screens, integrated storage and a formed surface system for multiple team sizes.",
      chips: ["Shared workstation", "E0 melamine panel", "PUR edge banding", "Formed PVC finish"],
      specs: [
        ["Configuration sizes", "W1200 × D1200 × H1030 mm; W1400 × D1200 × H1030 mm; W2400 × D1200 × H1030 mm; W2800 × D1200 × H1030 mm"],
        ["Panel", "E0-grade melamine-faced high-density board"],
        ["Panel performance", "Formaldehyde release ≤0.05 mg/L; density ≥760 kg/m³; water swelling ≤8.1%"],
        ["Surface", "Melamine resin protective layer with scratch and fade resistance"],
        ["Edge banding", "PUR edge banding for strong, temperature-stable adhesion"],
        ["Formed finish", "Seamless vacuum-pressed PVC membrane with high impact resistance"]
      ]
    },
    "DY-P0112": {
      slug: "dy-p0112-office-workstation",
      count: 6,
      intro: "A panel-based workstation system with integrated cable channels, adjustable feet and multiple planning sizes for individual or team use.",
      chips: ["Panel workstation", "Integrated cable channel", "Adjustable feet", "E0 worktop"],
      specs: [
        ["Configuration sizes", "W1260 × D630 × H1100 mm; W2430 × D1430 × H1100 mm; W2430 × D2830 × H1100 mm"],
        ["Panel frame", "1.2 mm aluminum vertical, horizontal and cable-channel sections with zinc-alloy connectors"],
        ["Leveling", "Height-adjustable feet for uneven floors"],
        ["Screen", "30 mm dark-gray partition profile"],
        ["Worktop", "25 mm E0-grade particleboard with imported melamine surface"],
        ["Edge / hardware", "2 mm matching PVC edge banding and commercial-grade hardware"]
      ]
    }
  };

  const model = document.body.dataset.product;
  const product = products[model];
  const root = document.querySelector("[data-staff-detail-root]");
  if (!product || !root) return;

  document.body.style.setProperty("--gallery-columns", String(product.count));
  const imageBase = "/assets/images/staff-desk-details/" + product.slug;
  const imagePath = (index) => imageBase + "/view-" + String(index + 1).padStart(2, "0") + ".webp";
  const slides = Array.from({length: product.count}, (_, index) =>
    "<figure class='m15-slide' data-gallery-slide><img src='" + imagePath(index) + "' width='1400' height='900' alt='" + model + " office workstation, product view " + (index + 1) + "'" + (index ? " loading='lazy'" : " fetchpriority='high'") + "></figure>"
  ).join("");
  const dots = Array.from({length: product.count}, (_, index) =>
    "<button type='button' data-gallery-dot='" + index + "' aria-label='Show image " + (index + 1) + "'" + (index === 0 ? " aria-current='true'" : "") + "></button>"
  ).join("");
  const thumbs = Array.from({length: product.count}, (_, index) =>
    "<button type='button' data-gallery-thumb='" + index + "'" + (index === 0 ? " aria-current='true'" : "") + "><img src='" + imagePath(index) + "' width='1400' height='900' alt='" + model + " view " + (index + 1) + " thumbnail' loading='lazy'></button>"
  ).join("");
  const chips = product.chips.map((chip) => "<span>" + chip + "</span>").join("");
  const specs = product.specs.map((row) => "<div role='row'><b role='cell'>" + row[0] + "</b><span role='cell'>" + row[1] + "</span></div>").join("");

  root.innerHTML =
    "<section class='m15-product' id='images'>" +
      "<nav class='m15-breadcrumbs' aria-label='Breadcrumb'><a href='/'>Home</a><span>/</span><a href='/products/staff-desk/page-2'>Staff Desks</a><span>/</span><span>" + model + "</span></nav>" +
      "<div class='m15-product-grid'><div class='m15-product-copy'><span class='m15-eyebrow'>Commercial Staff Workstations</span><h1>" + model + " Office Workstation</h1><p class='m15-byline'>by HUANGSI</p><p class='m15-intro'>" + product.intro + "</p><div class='staff-desk-configurations'>" + chips + "</div><div class='m15-actions'><a class='m15-button m15-button--primary' href='/contact?product=" + encodeURIComponent(model) + "'>Request project quote</a><a class='m15-button' href='#specifications'>View specifications</a></div><p class='m15-note'>Final dimensions, finishes, configuration and packing are confirmed with the quotation and approved sample.</p></div>" +
      "<div class='m15-gallery' data-m15-gallery aria-label='" + model + " product image gallery'><div class='m15-track' data-gallery-track tabindex='0' aria-live='polite'>" + slides + "</div><div class='m15-gallery-controls'><div class='m15-gallery-arrows'><button type='button' data-gallery-prev aria-label='Previous product image'>←</button><button type='button' data-gallery-next aria-label='Next product image'>→</button></div><span class='m15-count'><b data-gallery-current>01</b> / <span>" + String(product.count).padStart(2, "0") + "</span></span><div class='m15-dots' aria-label='Choose product image'>" + dots + "</div></div><div class='m15-thumbnails' aria-label='Product image thumbnails'>" + thumbs + "</div></div></div>" +
    "</section>" +
    "<nav class='m15-anchor-nav' aria-label='Product page sections'><a href='#images'>Images</a><a href='#specifications'>Specifications</a><a href='#materials'>Overview</a><a href='/contact?product=" + encodeURIComponent(model) + "'>Inquiry</a></nav>" +
    "<section class='m15-overview' id='materials'><div class='m15-content'><div><span class='m15-eyebrow'>Project-ready workstation</span><h2>Designed for coordinated commercial office planning.</h2></div><p>" + product.intro + " Available configurations can be reviewed for bulk purchasing, project fit-outs and OEM requirements.</p></div><div class='m15-feature-grid'><article><span>01</span><h3>Flexible planning</h3><p>Configuration options support different team sizes and workspace layouts.</p></article><article><span>02</span><h3>Commercial materials</h3><p>Specified panels, finishes and hardware are selected for everyday office use.</p></article><article><span>03</span><h3>Project customization</h3><p>Colors, dimensions and accessories can be evaluated against order quantity.</p></article></div></section>" +
    "<section class='m15-specs' id='specifications'><div class='m15-specs-heading'><span class='m15-eyebrow'>" + model + " specification</span><h2>Configuration and material details.</h2><p>Reference specifications are translated and organized from the supplied product file.</p></div><div class='m15-spec-table' role='table' aria-label='" + model + " specifications'>" + specs + "</div></section>" +
    "<section class='m15-cta'><div><span class='m15-eyebrow'>Commercial project supply</span><h2>Specify " + model + " for your next office project.</h2></div><div><p>Send quantity, destination, preferred finish and timeline for configuration review and export quotation.</p><a class='m15-button m15-button--light' href='/contact?product=" + encodeURIComponent(model) + "'>Request " + model + " details</a></div></section>";

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: model + " Office Workstation",
    sku: model,
    description: product.intro,
    brand: {"@type": "Brand", name: "HUANGSI"},
    manufacturer: {"@type": "Organization", name: "Foshan Huangsi Furniture Co., Ltd."},
    category: "Commercial Staff Desks and Workstations",
    url: "https://huangsifurniture.com/products/" + product.slug,
    image: Array.from({length: product.count}, (_, index) => "https://huangsifurniture.com" + imagePath(index)),
    additionalProperty: product.specs.map((row) => ({"@type": "PropertyValue", name: row[0], value: row[1]}))
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {"@type": "ListItem", position: 1, name: "Home", item: "https://huangsifurniture.com/"},
      {"@type": "ListItem", position: 2, name: "Staff Desks", item: "https://huangsifurniture.com/products/staff-desk/page-2"},
      {"@type": "ListItem", position: 3, name: model, item: "https://huangsifurniture.com/products/" + product.slug}
    ]
  };
  [productSchema, breadcrumbSchema].forEach((schema) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
})();
