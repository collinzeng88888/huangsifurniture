import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const before='I agree to the <a href="/privacy">privacy policy</a> and allow HUANGSI to respond to my inquiry.';
const after='I agree to the <a href="/privacy">privacy policy</a> and <a href="/terms">terms</a>, and allow HUANGSI to respond to my inquiry.';
let changed=0;
function walk(directory){
  for(const entry of fs.readdirSync(directory,{withFileTypes:true})){
    if(entry.name==='.git'||entry.name==='node_modules')continue;
    const full=path.join(directory,entry.name);
    if(entry.isDirectory())walk(full);
    else if(entry.name.endsWith('.html')){
      const source=fs.readFileSync(full,'utf8');
      if(!source.includes(before))continue;
      fs.writeFileSync(full,source.replaceAll(before,after));
      changed++;
    }
  }
}
walk(root);
console.log(`Added terms links to ${changed} RFQ consent form(s).`);
