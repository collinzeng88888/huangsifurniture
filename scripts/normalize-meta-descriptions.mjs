import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const descriptionOverrides={
  'applications/education-furniture.html':'Plan education furniture for training rooms, staff offices and reading lounges. Specify tables, chairs, storage and durable finishes for schools and learning projects.',
  'applications/healthcare-waiting-furniture.html':'Plan healthcare waiting-room furniture with companion seating, reception desks and staff workspaces. Compare durable options for clinics, hospitals and care projects.',
  'applications/hospitality-furniture.html':'Coordinate hospitality furniture for reception, lounge seating and back-office workspaces. Plan durable commercial pieces for hotels, lobbies and guest-facing projects.'
};
const titleOverrides={
  'products/modular-office-workstation.html':'Modular Office Workstations & Benching Systems | HUANGSI',
  'quality-control.html':'Office Furniture Quality Control & Inspection | HUANGSI'
};
let descriptions=0,titles=0;
function shorten(value){
  if(value.length<=165)return value;
  const limit=value.slice(0,162);
  return limit.replace(/\s+\S*$/,'').trim()+'…';
}
function walk(directory){
  for(const entry of fs.readdirSync(directory,{withFileTypes:true})){
    if(entry.name==='.git'||entry.name==='node_modules')continue;
    const full=path.join(directory,entry.name);
    if(entry.isDirectory())walk(full);
    else if(entry.name.endsWith('.html')){
      const relative=path.relative(root,full).replaceAll(path.sep,'/');
      let source=fs.readFileSync(full,'utf8'),updated=source;
      if(descriptionOverrides[relative]){
        updated=updated.replace(/(<meta\s+name="description"\s+content=")[^"]*(")/i,'$1'+descriptionOverrides[relative]+'$2');
      }else{
        updated=updated.replace(/(<meta\s+name="description"\s+content=")([^"]*)(")/i,(match,start,value,end)=>start+shorten(value)+end);
      }
      if(updated!==source)descriptions++;
      if(titleOverrides[relative]){
        const titled=updated.replace(/<title>[\s\S]*?<\/title>/i,'<title>'+titleOverrides[relative]+'</title>');
        if(titled!==updated)titles++;
        updated=titled;
      }
      if(updated!==source)fs.writeFileSync(full,updated);
    }
  }
}
walk(root);
console.log(`Normalized ${descriptions} meta description(s) and ${titles} title(s).`);
