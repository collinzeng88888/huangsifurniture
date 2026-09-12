import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = path.resolve(import.meta.dirname, "..");
const today = new Date().toISOString().slice(0, 10);

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if ([".git", "node_modules"].includes(entry.name)) return [];
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}

function lastModified(file) {
  try {
    const changed = execFileSync("git", ["status", "--porcelain", "--", file], {
      cwd: root,
      encoding: "utf8",
    }).trim();
    if (changed) return today;
    return execFileSync("git", ["log", "-1", "--format=%cs", "--", file], {
      cwd: root,
      encoding: "utf8",
    }).trim() || today;
  } catch {
    return today;
  }
}

function priority(url) {
  if (url === "https://huangsifurniture.com/") return "1.0";
  if (/\/products\/[^/]+$/.test(url)) return "0.9";
  if (/\/products\//.test(url)) return "0.8";
  return "0.8";
}

const pages = new Map();
for (const file of walk(root).filter((item) => item.endsWith(".html"))) {
  const relative = path.relative(root, file).replaceAll(path.sep, "/");
  if (relative === "404.html") continue;
  const html = fs.readFileSync(file, "utf8");
  const robots = html.match(/<meta\b[^>]*\bname=["']robots["'][^>]*>/i)?.[0] || "";
  if (/noindex/i.test(robots)) continue;
  const canonical = html.match(/<link\b(?=[^>]*\brel=["']canonical["'])(?=[^>]*\bhref=["']([^"']+)["'])[^>]*>/i)?.[1];
  if (!canonical?.startsWith("https://huangsifurniture.com/")) continue;
  if (!pages.has(canonical) || relative === `${new URL(canonical).pathname.replace(/^\//, "") || "index"}.html`) {
    pages.set(canonical, { file: relative, lastmod: lastModified(relative) });
  }
}

const urls = [...pages.entries()].sort(([a], [b]) => {
  if (a === "https://huangsifurniture.com/") return -1;
  if (b === "https://huangsifurniture.com/") return 1;
  return a.localeCompare(b);
});

const body = urls.map(([url, item]) => [
  "  <url>",
  `    <loc>${url}</loc>`,
  `    <lastmod>${item.lastmod}</lastmod>`,
  "    <changefreq>weekly</changefreq>",
  `    <priority>${priority(url)}</priority>`,
  "  </url>",
].join("\n")).join("\n");

fs.writeFileSync(path.join(root, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`);
console.log(`Generated sitemap.xml with ${urls.length} canonical URLs.`);
