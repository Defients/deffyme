import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import crypto from 'node:crypto';
import sharp from 'sharp';
const here=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(here,'../..');
const digest=b=>crypto.createHash('sha256').update(b).digest('hex');
const ref={date:'2026-10-10',timezone:'America/New_York',canonical:{status:'AVAILABLE / VISUALLY INSPECTED',original:'design/masters/default-defdef_final.png',copy:'assets/canonical-defdef.png',sha256:digest(await fs.readFile(path.join(here,'assets/canonical-defdef.png'))),transformation:'Byte-identical copy; no recolor, redraw, mirror or pose generation'},runtimeDerivative:{original:'public/rebirth-assets/defdef-resting.webp',copy:'assets/defdef-resting.webp',sha256:digest(await fs.readFile(path.join(here,'assets/defdef-resting.webp'))),transformation:'Byte-identical copy of approved derivative'},selectedConcept3:{status:'UNAVAILABLE IN INSPECTED INPUTS',searched:['Work-project design/masters and tracked design/doc assets','Legacy docs/rebirth/reference-assets and filename search of legacy docs/assets/images'],claim:'No visual match asserted; absence is bounded to inspected inputs'},environment:{source:'Authored static SVG/CSS in generate.mjs',role:'Experimental review geometry; no runtime approval',generatedRasterArt:false},publication:'Review package only. No asset promotion, public route, release output or publication authorization.'};
await fs.writeFile(path.join(here,'evidence/reference-status.json'),JSON.stringify(ref,null,2));
const documents=['README.md','docs/PHASE1_DESIGN_REVIEW.md','docs/OPUS_REVIEW_HANDOFF.md','docs/CREATIVE_DIRECTION_V2.md','docs/V2_IMPLEMENTATION_ROADMAP.md','docs/V2_RECONCILIATION.md','docs/GATEHOUSE_SPEC.md','docs/GATEHOUSE_VALIDATION.md','docs/DEPLOYMENT_GATES.md'];
// Portable layout preserves gallery-to-doc relative links; never copied into public/.
const bundle=path.join(root,'artifacts/phase1-v2-review-bundle');
await fs.mkdir(bundle,{recursive:true});
for(const name of documents){await fs.mkdir(path.dirname(path.join(bundle,name)),{recursive:true});await fs.copyFile(path.join(root,name),path.join(bundle,name));}
const walk=async dir=>{let list=[];for(const entry of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);if(entry.isDirectory())list.push(...await walk(p));else list.push(p);}return list;};
const files=await walk(here),entries=[];
for(const file of files){if(file.endsWith('package-manifest.json'))continue;const data=await fs.readFile(file);const item={file:path.relative(root,file).replaceAll('\\','/'),bytes:data.length,sha256:digest(data)};if(file.endsWith('.png')){const m=await sharp(data).metadata();item.width=m.width;item.height=m.height;}entries.push(item);}
for(const name of documents){const data=await fs.readFile(path.join(root,name));entries.push({file:name,bytes:data.length,sha256:digest(data)});}
entries.sort((a,b)=>a.file.localeCompare(b.file));
const manifest={date:'2026-10-10',timezone:'America/New_York',status:'REVIEW CANDIDATES / STOP FOR OWNER AND INDEPENDENT REVIEW',baseline:{branch:'docs/defdef-gatehouse',head:'c0daffd1e21eb856d1f2a7273293ae2671ab6818',githubMain:'23607891d543f8a495ac1b20c965be5ecc0ab0c3',tree:'045631d22925ed5566cb563c4f4b26ce235c8a7c'},entries};
await fs.writeFile(path.join(here,'evidence/package-manifest.json'),JSON.stringify(manifest,null,2));
await fs.cp(here,path.join(bundle,'design/phase1-v2-review'),{recursive:true});
const badLinks=[];
for(const name of documents){const content=await fs.readFile(path.join(root,name),'utf8');for(const m of content.matchAll(/\]\(([^\s)]+)\)/g)){const link=m[1];if(/^(https?:|#)/.test(link))continue;const target=path.resolve(path.dirname(path.join(root,name)),decodeURIComponent(link.split('#')[0]));try{await fs.access(target);}catch{badLinks.push({file:name,link});}}}
console.log(JSON.stringify({files:entries.length,pngs:entries.filter(e=>e.file.endsWith('.png')).length,screenshotPNGs:entries.filter(e=>e.file.includes('/screenshots/')&&e.file.endsWith('.png')).length,badLinks,bundle},null,2));
if(badLinks.length)process.exitCode=1;
