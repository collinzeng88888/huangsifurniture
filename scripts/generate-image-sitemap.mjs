import fs from "node:fs";
import path from "node:path";
const root=path.resolve(import.meta.dirname,".."),site="https://huangsifurniture.com";
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>[".git","node_modules"].includes(e.name)?[]:(e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]));
const attr=(tag,name)=>tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`,"i"))?.[2]; const xml=v=>v.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;");
const pages=[]; for(const file of walk(root).filter(f=>f.endsWith('.html'))){const html=fs.readFileSync(file,'utf8');if(/<meta\b[^>]*name=["']robots["'][^>]*noindex/i.test(html))continue;const tag=[...html.matchAll(/<link\b[^>]*>/gi)].map(m=>m[0]).find(t=>attr(t,'rel')==='canonical');const canonical=attr(tag||'', 'href');if(!canonical?.startsWith(`${site}/`))continue;const images=new Map();for(const match of html.matchAll(/<img\b[^>]*>/gi)){const t=match[0],src=attr(t,'src');if(!src||src.startsWith('data:'))continue;const href=new URL(src,site).href;if(/(?:logo|favicon|icon)(?:[._-]|$)/i.test(href))continue;images.set(href,attr(t,'alt')?.trim()||'HUANGSI commercial office furniture');}if(images.size)pages.push([canonical,[...images]]);}
const body=pages.sort((a,b)=>a[0].localeCompare(b[0])).map(([page,images])=>{
  const children=images.flatMap(([src,title])=>['    <image:image>',`      <image:loc>${xml(src)}</image:loc>`,`      <image:title>${xml(title)}</image:title>`,'    </image:image>']);
  return ['  <url>',`    <loc>${xml(page)}</loc>`,...children,'  </url>'].join('\n');
}).join('\n');
fs.writeFileSync(path.join(root,'image-sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${body}\n</urlset>\n`);
console.log(`Generated image-sitemap.xml with ${pages.length} pages.`);
