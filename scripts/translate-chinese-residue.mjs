import fs from "node:fs";
const file = new URL("../products/ergonomic-mesh-office-chair.html", import.meta.url);
const original = fs.readFileSync(file, "utf8");
const translated = original.replace("办公网椅 · Mesh Office Chairs", "Mesh Office Chairs").replace("办公皮椅 · Leather Office Chairs", "Leather Office Chairs");
if (translated === original) throw new Error("Expected Chinese product-category labels were not found");
fs.writeFileSync(file, translated);
console.log("Translated the remaining visitor-facing Chinese labels.");
