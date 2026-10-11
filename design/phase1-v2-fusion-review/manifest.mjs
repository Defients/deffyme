// SHA-256 manifest of every file created in this dir plus referenced assets.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url));
async function sha(rel){
 const buf=await fs.readFile(path.resolve(here,rel));
 return {path:rel,sha256:crypto.createHash('sha256').update(buf).digest('hex'),bytes:buf.length};
}
async function walk(dir){
 const out=[];
 for(const e of await fs.readdir(dir,{withFileTypes:true})){
  const p=path.join(dir,e.name);
  if(e.isDirectory())out.push(...await walk(p));else out.push(p);
 }
 return out;
}
const skip=new Set(['manifest.mjs','evidence/manifest.json']);
const files=(await walk(here)).map(f=>path.relative(here,f).split(path.sep).join('/')).filter(f=>!skip.has(f)).sort();
const created=[];for(const f of files)created.push(await sha(f));
const referenced=[];for(const a of ['signal-loom-desktop.webp','signal-loom-medium.webp','signal-loom-mobile.webp','defdef-resting.webp','inter.woff2','space-grotesk.woff2'])
 referenced.push({...await sha(`../phase1-v2-refinement/assets/${a}`),handling:'Referenced unchanged; no copy or derivative generated'});
await fs.writeFile(path.join(here,'evidence','manifest.json'),JSON.stringify({scope:'design/phase1-v2-fusion-review static review study',created,referenced},null,2));
console.log(`manifest: ${created.length} created, ${referenced.length} referenced`);
