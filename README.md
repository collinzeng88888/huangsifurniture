# Commercial Office Furniture Manufacturer Deep Site Package

Static B2B manufacturer website for Foshan Huangsi Furniture Co., Ltd.

## Positioning
Commercial Office Furniture Manufacturer / Office Furniture OEM Factory / Bulk Export Supplier

## Included
- Home page
- Commercial office furniture hub page
- 13 product pages
- Category pages
- 5 application pages
- 10 SEO blog support pages
- 6 case-study drafts kept out of search indexing until verified project evidence is available
- OEM Manufacturing, Quality Control, Packaging & Loading, Catalog, Contact, About pages
- sitemap.xml, robots.txt, keyword-map.csv
- Responsive CSS/JS
- Product and project imagery
- Canonical, Open Graph, Product, FAQ, Organization and BlogPosting metadata
- Browser-assisted RFQ email forms
- Automated SEO maintenance and site-audit scripts

## Content governance

Do not publish unverified factory capacity, certifications, test results, MOQ, lead time, prices or customer cases. Add model-specific data only after it has been confirmed by the business.

Run the static audit after content or routing changes:

```bash
node scripts/audit-site.mjs
```

Run the idempotent metadata and URL maintenance pass when new HTML pages are added:

```bash
node scripts/seo-maintenance.mjs
```

## Deployment
Upload the folder to GitHub and deploy with Vercel as a static site. No build step is required.
