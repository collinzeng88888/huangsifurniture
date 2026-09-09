(() => {
  const products = {
    "DO36-C0224": {
      slug: "do36-c0224-conference-table",
      count: 1,
      intro: "A contemporary rectangular conference table with a glazed-oak top, gunmetal frame and integrated cable access.",
      chips: ["Boardroom table", "Cable access", "Project sizing"],
      specs: [
        ["Dimensions", "W2400 × D1200 × H750 mm"],
        ["Core material", "E0-grade engineered board with stain-resistant and wear-resistant performance"],
        ["Finish", "Melamine surface in glazed oak with meteorite-gray accents"],
        ["Edge and hardware", "PVC edge banding with environmentally considerate adhesive and standard commercial hardware"],
        ["Frame and details", "Electroplated gunmetal square-tube frame, painted bevel edge and vacuum-formed front panel"]
      ]
    },
    "DO-DRE-C0118-H": {
      slug: "do-dre-c0118-h-conference-table",
      count: 3,
      intro: "A dual-motor height-adjustable conference table with a clean rectangular top and commercial project finishes.",
      chips: ["Height adjustable", "Dual motor", "Five-year warranty"],
      specs: [
        ["Dimensions", "W1800 / 2100 / 2400 × D1200 × H625–1275 mm"],
        ["Height range", "Nominal lifting range 600–1250 mm"],
        ["Core material", "Premium E0-grade particleboard"],
        ["Surface and edge", "Wear-resistant melamine surface with seamless laser edge banding"],
        ["Lift system", "Two motors with three-stage rectangular lifting columns"],
        ["Warranty", "Five-year warranty for the complete table"]
      ]
    },
    "DO-DSDO-03C28": {
      slug: "do-dsdo-03c28-conference-table",
      count: 3,
      intro: "A rounded boardroom table with warm wood tones, sculpted panel bases and integrated two-sided power access.",
      chips: ["Rounded top", "Integrated power", "Multiple sizes"],
      specs: [
        ["Dimensions", "W2000 / 2400 / 2800 × D1200 × H750 mm; W3600 × D1300 × H750 mm; W4200 × D1500 × H750 mm"],
        ["Core material", "E0-grade particleboard with heat-resistant and corrosion-resistant performance"],
        ["Finish", "Cherry woodgrain with frost-gray decorative accents"],
        ["Edge", "Rounded painted tabletop edge with coordinated PVC banding"],
        ["Power and cable management", "One multifunction double-sided socket with organized cable routing"]
      ]
    },
    "DO-DXC-06C32": {
      slug: "do-dxc-06c32-conference-table",
      count: 2,
      intro: "A refined conference table with a dark sculpted top, stainless-steel tubular legs and integrated power access.",
      chips: ["Sculpted top", "Stainless frame", "Power module"],
      specs: [
        ["Dimensions", "W2400 / 3200 × D1200 × H750 mm"],
        ["Core material", "E1-grade MDF combined with E0-grade particleboard"],
        ["Finish", "Vacuum-formed tabletop with coordinated decorative-paper surfaces"],
        ["Frame", "Bent round stainless-steel tube construction"],
        ["Power and cable management", "Standard function box with organized routing for everyday meeting use"]
      ]
    },
    "DO-GXK-02C60": {
      slug: "do-gxk-02c60-conference-table",
      count: 3,
      intro: "A large-format executive conference table with architectural bases, metallic accents and integrated power modules.",
      chips: ["Large boardroom", "Dual power access", "Architectural base"],
      specs: [
        ["Dimensions", "W3600 × D1350 × H760 mm; W4800 × D1500 × H760 mm; W6000 × D1800 × H760 mm"],
        ["Core material", "E1-grade MDF meeting current environmental standards"],
        ["Finish", "Meteorite-gray and brown-gold water-based metallic finishes with teak woodgrain accents"],
        ["Hardware", "Commercial-grade oxidation-resistant hardware"],
        ["Power and cable management", "Two double-sided cable covers and two-sided socket modules"]
      ]
    },
    "DO-SYD-01C48": {
      slug: "do-syd-01c48-conference-table",
      count: 1,
      intro: "A premium dark-wood conference table with faceted metal bases and a multifunction power rail.",
      chips: ["Premium finish", "Power rail", "Boardroom scale"],
      specs: [
        ["Dimensions", "W3600 × D1400 × H760 mm; W4800 × D1500 × H760 mm"],
        ["Core material", "E0-grade particleboard combined with E1-grade MDF"],
        ["Finish", "Obsidian ebony woodgrain with cloud-gray and star-black water-based metallic accents"],
        ["Supporting materials", "Water-based coatings, environmentally considerate adhesive and commercial hardware"],
        ["Power and cable management", "Multifunction electrical rail with organized cable routing"]
      ]
    },
    "DO-UMY-C0424": {
      slug: "do-umy-c0424-conference-table",
      count: 3,
      intro: "A sculptural high collaboration table with an organic worktop and custom folded stainless-steel legs.",
      chips: ["Sculptural form", "High collaboration", "Stainless legs"],
      specs: [
        ["Dimensions", "W2400 × D2600 × H1050 mm"],
        ["Core material", "E1-grade MDF with wear-resistant, heat-resistant and corrosion-resistant performance"],
        ["Surface", "Vacuum-formed tabletop finish"],
        ["Hardware", "Commercial-grade oxidation-resistant hardware"],
        ["Leg construction", "Custom folded and laser-cut stainless-steel legs"]
      ]
    },
    "DO-YAM-C0132": {
      slug: "do-yam-c0132-conference-table",
      count: 1,
      intro: "A modern conference table with a softly shaped top, geometric steel support and integrated protected power outlets.",
      chips: ["Geometric base", "Protected power", "Cable management"],
      specs: [
        ["Dimensions", "W3200 × D1200 × H750 mm"],
        ["Core material", "E1-grade MDF tabletop with E0-grade engineered-board components"],
        ["Finish", "Branded decorative-paper surface with coordinated PVC edge banding"],
        ["Support", "Pickled, phosphated and powder-coated steel support structure"],
        ["Power and cable management", "Two five-hole outlets with high-load capacity, overcurrent protection and automatic overload shutoff"]
      ]
    }
  };

  const model = document.body.dataset.product;
  const product = products[model];
  const root = document.querySelector("[data-conference-detail-root]");
  if (!product || !root) return;

  const listingPath = "/products/conference-tables/page-2";
  document.body.style.setProperty("--gallery-columns", String(product.count));
  const imageBase = "/assets/images/conference-table-details/" + product.slug;
  const imagePath = (index) => imageBase + "/view-" + String(index + 1).padStart(2, "0") + ".webp";
  const slides = Array.from({length: product.count}, (_, index) =>
    "<figure class='m15-slide' data-gallery-slide><img src='" + imagePath(index) + "' width='1400' height='900' alt='" + model + " conference table, product view " + (index + 1) + "'" + (index ? " loading='lazy'" : " fetchpriority='high'") + "></figure>"
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
      "<nav class='m15-breadcrumbs' aria-label='Breadcrumb'><a href='/'>Home</a><span>/</span><a href='" + listingPath + "'>Conference Tables</a><span>/</span><span>" + model + "</span></nav>" +
      "<div class='m15-product-grid'><div class='m15-product-copy'><span class='m15-eyebrow'>Commercial Conference Tables</span><h1>" + model + " Conference Table</h1><p class='m15-byline'>by HUANGSI</p><p class='m15-intro'>" + product.intro + "</p><div class='executive-desk-configurations'>" + chips + "</div><div class='m15-actions'><a class='m15-button m15-button--primary' href='/contact?product=" + encodeURIComponent(model) + "'>Request project quote</a><a class='m15-button' href='#specifications'>View specifications</a></div><p class='m15-note'>Final dimensions, finish, power configuration and packing are confirmed with the quotation and approved sample.</p></div>" +
      "<div class='m15-gallery' data-m15-gallery aria-label='" + model + " product image gallery'><div class='m15-track' data-gallery-track tabindex='0' aria-live='polite'>" + slides + "</div><div class='m15-gallery-controls'><div class='m15-gallery-arrows'><button type='button' data-gallery-prev aria-label='Previous product image'>←</button><button type='button' data-gallery-next aria-label='Next product image'>→</button></div><span class='m15-count'><b data-gallery-current>01</b> / <span>" + String(product.count).padStart(2, "0") + "</span></span><div class='m15-dots' aria-label='Choose product image'>" + dots + "</div></div><div class='m15-thumbnails' aria-label='Product image thumbnails'>" + thumbs + "</div></div></div>" +
    "</section>" +
    "<nav class='m15-anchor-nav' aria-label='Product page sections'><a href='#images'>Images</a><a href='#specifications'>Specifications</a><a href='#materials'>Overview</a><a href='/contact?product=" + encodeURIComponent(model) + "'>Inquiry</a></nav>" +
    "<section class='m15-overview' id='materials'><div class='m15-content'><div><span class='m15-eyebrow'>Meeting-space centerpiece</span><h2>Commercial construction with project-ready options.</h2></div><p>" + product.intro + " Configurations can be reviewed for boardrooms, bulk purchasing and OEM projects.</p></div><div class='m15-feature-grid'><article><span>01</span><h3>Coordinated design</h3><p>Balanced proportions and refined finishes create a professional meeting-space focal point.</p></article><article><span>02</span><h3>Integrated function</h3><p>Power and cable-management options support organized meetings and presentations.</p></article><article><span>03</span><h3>Project customization</h3><p>Dimensions, finishes and accessories can be evaluated against order quantity.</p></article></div></section>" +
    "<section class='m15-specs' id='specifications'><div class='m15-specs-heading'><span class='m15-eyebrow'>" + model + " specification</span><h2>Dimensions, materials and functions.</h2><p>Professional English specifications organized from the supplied product file.</p></div><div class='m15-spec-table' role='table' aria-label='" + model + " specifications'>" + specs + "</div></section>" +
    "<section class='m15-cta'><div><span class='m15-eyebrow'>Commercial project supply</span><h2>Specify " + model + " for your meeting-space project.</h2></div><div><p>Send quantity, destination, preferred finish and timeline for configuration review and export quotation.</p><a class='m15-button m15-button--light' href='/contact?product=" + encodeURIComponent(model) + "'>Request " + model + " details</a></div></section>";

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: model + " Conference Table",
    sku: model,
    description: product.intro,
    brand: {"@type": "Brand", name: "HUANGSI"},
    manufacturer: {"@type": "Organization", name: "Foshan Huangsi Furniture Co., Ltd."},
    category: "Commercial Conference Tables",
    url: "https://huangsifurniture.com/products/" + product.slug,
    image: Array.from({length: product.count}, (_, index) => "https://huangsifurniture.com" + imagePath(index)),
    additionalProperty: product.specs.map((row) => ({"@type": "PropertyValue", name: row[0], value: row[1]}))
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {"@type": "ListItem", position: 1, name: "Home", item: "https://huangsifurniture.com/"},
      {"@type": "ListItem", position: 2, name: "Conference Tables", item: "https://huangsifurniture.com" + listingPath},
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
