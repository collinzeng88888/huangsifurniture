import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const issues = [];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === ".git" || entry.name === "node_modules") return [];
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function expectedUrl(relativePath) {
  if (relativePath === "index.html") return "https://huangsifurniture.com/";
  return `https://huangsifurniture.com/${relativePath.replace(/\.html$/, "")}`;
}

function localTarget(href) {
  if (href === "/") return path.join(root, "index.html");
  const clean = href.split(/[?#]/)[0].replace(/^\//, "");
  if (!clean) return path.join(root, "index.html");
  return path.join(root, `${clean}.html`);
}

const htmlFiles = walk(root).filter((file) => file.endsWith(".html"));
let missingImageDimensions = 0;
let formCount = 0;
let blogPostingCount = 0;
let faqPageCount = 0;
let noindexCaseCount = 0;
let breadcrumbCount = 0;

for (const file of htmlFiles) {
  const relative = path.relative(root, file).replaceAll(path.sep, "/");
  const html = fs.readFileSync(file, "utf8");
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  const description = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1];
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i)?.[1];
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  const isNoindex = /<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html);

  if (!title) issues.push(`${relative}: missing title`);
  if (!description) issues.push(`${relative}: missing meta description`);
  if (!isNoindex && title && title.length > 65) {
    issues.push(`${relative}: title is longer than 65 characters`);
  }
  if (!isNoindex && description && (description.length < 120 || description.length > 165)) {
    issues.push(`${relative}: meta description should be 120-165 characters`);
  }
  if (canonical !== expectedUrl(relative)) {
    issues.push(`${relative}: canonical mismatch (${canonical ?? "missing"})`);
  }
  if (h1Count !== 1) issues.push(`${relative}: expected one H1, found ${h1Count}`);
  if (!html.includes('property="og:title"')) issues.push(`${relative}: missing Open Graph metadata`);
  if (!html.includes('name="twitter:card"')) issues.push(`${relative}: missing Twitter card metadata`);
  if (/\.html(?:["#?])/i.test(html)) issues.push(`${relative}: contains a .html public URL`);
  if (/COF Manufacturing|Actiu|target keywords|before publishing|replace (?:this )?placeholder|temporary product-card|target for Top 15/i.test(html)) {
    issues.push(`${relative}: contains forbidden template copy`);
  }

  for (const script of html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try {
      const data = JSON.parse(script[1]);
      if (JSON.stringify(data).includes('"BlogPosting"')) blogPostingCount += 1;
      if (JSON.stringify(data).includes('"FAQPage"')) faqPageCount += 1;
      if (JSON.stringify(data).includes('"BreadcrumbList"')) breadcrumbCount += 1;
    } catch (error) {
      issues.push(`${relative}: invalid JSON-LD (${error.message})`);
    }
  }

  for (const img of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = img[0];
    if (!/\balt="[^"]*"/i.test(tag)) issues.push(`${relative}: image missing alt text`);
    if (!/\bwidth="[^"]+"/i.test(tag) || !/\bheight="[^"]+"/i.test(tag)) {
      if (!/\.svg(?:["?#])/i.test(tag)) missingImageDimensions += 1;
    }
  }

  for (const link of html.matchAll(/href="([^"]+)"/gi)) {
    const href = link[1];
    if (href.startsWith("#") && href.length > 1) {
      const id = href.slice(1).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      if (!new RegExp(`\\bid=["']${id}["']`, "i").test(html)) {
        issues.push(`${relative}: broken page fragment ${href}`);
      }
    }
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    if (/\.[a-z0-9]+$/i.test(href.split(/[?#]/)[0])) continue;
    const target = localTarget(href);
    if (!fs.existsSync(target)) issues.push(`${relative}: broken internal link ${href}`);
  }

  formCount += (html.match(/data-rfq-form/g) ?? []).length;
  if (relative.startsWith("case-studies/") && isNoindex) noindexCaseCount += 1;
  if (!html.includes('rel="icon"')) issues.push(`${relative}: missing favicon link`);
  if (!html.includes('href="/privacy"')) issues.push(`${relative}: missing privacy link`);
  if (!html.includes('href="/terms"')) issues.push(`${relative}: missing terms link`);
  if (!isNoindex && relative !== "index.html" && !html.includes('"BreadcrumbList"')) {
    issues.push(`${relative}: missing BreadcrumbList schema`);
  }
}

const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
if (sitemapUrls.some((url) => url.endsWith(".html"))) issues.push("sitemap.xml: contains .html URLs");
if (sitemapUrls.some((url) => url.includes("/case-studies/"))) issues.push("sitemap.xml: contains noindex case-study URLs");
if (new Set(sitemapUrls).size !== sitemapUrls.length) issues.push("sitemap.xml: contains duplicate URLs");

if (blogPostingCount !== 10) issues.push(`expected 10 BlogPosting schemas, found ${blogPostingCount}`);
if (faqPageCount < 10) issues.push(`expected at least 10 FAQPage schemas, found ${faqPageCount}`);
if (noindexCaseCount !== 6) issues.push(`expected 6 noindex case studies, found ${noindexCaseCount}`);
if (missingImageDimensions !== 0) issues.push(`${missingImageDimensions} raster images missing dimensions`);
if (formCount < 1) issues.push("no functional RFQ form found");
if (!fs.existsSync(path.join(root, "favicon.svg"))) issues.push("favicon.svg is missing");
if (!fs.existsSync(path.join(root, "404.html"))) issues.push("404.html is missing");
if (!fs.existsSync(path.join(root, "privacy.html"))) issues.push("privacy.html is missing");
if (!fs.existsSync(path.join(root, "terms.html"))) issues.push("terms.html is missing");
const homepage = fs.readFileSync(path.join(root, "index.html"), "utf8");
if (!homepage.includes('"WebSite"')) issues.push("index.html: missing WebSite schema");

const summary = {
  htmlFiles: htmlFiles.length,
  sitemapUrls: sitemapUrls.length,
  functionalRfqForms: formCount,
  blogPostingSchemas: blogPostingCount,
  faqPageSchemas: faqPageCount,
  breadcrumbSchemas: breadcrumbCount,
  noindexCaseStudies: noindexCaseCount,
  missingRasterImageDimensions: missingImageDimensions,
  issues: issues.length,
};

console.log(JSON.stringify(summary, null, 2));
if (issues.length) {
  console.error(issues.join("\n"));
  process.exit(1);
}
