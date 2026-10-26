import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const measurementId = 'G-RGXHH7VQY0';
const snippet = `<script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script>
<script>
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
gtag('js',new Date());
gtag('config','${measurementId}',{anonymize_ip:true});
</script>
<script>
document.addEventListener('DOMContentLoaded',function(){
  var key='huangsi_analytics_consent';
  if(new URLSearchParams(location.search).has('analytics-preferences'))localStorage.removeItem(key);
  var saved=localStorage.getItem(key);
  function grant(){gtag('consent','update',{analytics_storage:'granted'});}
  if(saved==='granted'){grant();return;}
  if(saved==='denied')return;
  var banner=document.createElement('section');
  banner.setAttribute('role','dialog');
  banner.setAttribute('aria-label','Analytics cookie preference');
  banner.style.cssText='position:fixed;z-index:9999;right:16px;bottom:16px;max-width:390px;padding:16px;background:#19251f;color:#fff;border:1px solid #c6a15b;box-shadow:0 12px 32px rgba(0,0,0,.28);font:14px/1.5 Arial,sans-serif';
  banner.innerHTML='<strong style="display:block;margin-bottom:6px">Analytics preference</strong><span style="display:block;margin-bottom:12px">We use optional analytics to improve this website. <a href="/privacy" style="color:#f2cf86">Privacy policy</a></span><button type="button" data-essential style="margin-right:8px;padding:8px 10px;border:1px solid #fff;background:transparent;color:#fff;cursor:pointer">Essential only</button><button type="button" data-accept style="padding:8px 10px;border:1px solid #c6a15b;background:#c6a15b;color:#182219;cursor:pointer;font-weight:700">Accept analytics</button>';
  document.body.appendChild(banner);
  banner.querySelector('[data-essential]').addEventListener('click',function(){localStorage.setItem(key,'denied');banner.remove();});
  banner.querySelector('[data-accept]').addEventListener('click',function(){localStorage.setItem(key,'granted');grant();banner.remove();});
});
</script>
`;
let injected = 0;
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) {
      const source = fs.readFileSync(full, 'utf8');
      if (source.includes(measurementId)) continue;
      const updated = source.replace('</head>', `${snippet}</head>`);
      if (updated === source) throw new Error(`Missing </head> in ${full}`);
      fs.writeFileSync(full, updated);
      injected += 1;
    }
  }
}
walk(root);
console.log(`Injected GA4 consent-aware tracking into ${injected} page(s).`);
