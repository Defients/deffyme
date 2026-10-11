// Budget recipe + red overlay area; writes evidence/resources.json.
import fs from 'node:fs/promises';
import path from 'node:path';
import zlib from 'node:zlib';
import {fileURLToPath} from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url));
const R=p=>path.resolve(here,p);
async function entry(rel){
 const buf=await fs.readFile(R(rel));
 const gz=zlib.gzipSync(buf);
 return {file:rel,bytes:buf.length,gzipBytes:gz.length,kiB:+(buf.length/1024).toFixed(2),gzipKiB:+(gz.length/1024).toFixed(2)};
}
const files=[
 'arrival.html','domain-settled.html','style.css',
 '../phase1-v2-refinement/arrival.html','../phase1-v2-refinement/domain-settled.html','../phase1-v2-refinement/style.css',
 '../phase1-v2-review/arrival.html','../phase1-v2-review/plates.css',
];
const assets=[
 '../phase1-v2-refinement/assets/signal-loom-desktop.webp',
 '../phase1-v2-refinement/assets/signal-loom-mobile.webp',
 '../phase1-v2-refinement/assets/defdef-resting.webp',
];
const budget=[];for(const f of files)budget.push(await entry(f));
const assetBytes=[];for(const f of assets){const buf=await fs.readFile(R(f));assetBytes.push({file:f,bytes:buf.length,kiB:+(buf.length/1024).toFixed(2)});}
// red overlay area: rects + polyline length x stroke width (idle/action =
// displaced variant, the largest)
const STEPPED='M1558 90L1558 96L1542 96L1542 120L1524 120L1524 132L1517 132L1517 148L1547 148L1547 160L1512 160L1512 172L1543 172L1543 184L1517 184L1517 196L1483 196L1483 208L1539 208L1539 220L1515 220L1515 232L1542 232L1542 256';
const pts=[...STEPPED.matchAll(/[ML]([\d.]+) ([\d.]+)/g)].map(m=>[+m[1],+m[2]]);
let len=0;for(let i=1;i<pts.length;i++)len+=Math.abs(pts[i][0]-pts[i-1][0])+Math.abs(pts[i][1]-pts[i-1][1]);
const tornArea=[[9,3],[8,3],[10,3],[7,4],[11,3],[8,2],[10,3],[6,4]].reduce((s,r)=>s+r[0]*r[1],0);
const colArea=[[38,28,22],[44,30,26],[34,26],[40,24,18]].flat().reduce((s,h)=>s+h*2.5,0);
const total=len*2.5+tornArea+colArea;
const overlay={steppedLengthUnits:len,strokeWidth:2.5,polylineArea:len*2.5,tornRectArea:tornArea,dropoutColumnArea:colArea,totalAreaUnits2:total,budgetUnits2:9440,withinBudget:total<=9440,viewportPct:+(100*total/(1672*941)).toFixed(3)};
await fs.writeFile(path.join(here,'evidence','resources.json'),JSON.stringify({budget,assetBytes,overlay},null,2));
console.log(JSON.stringify({budget:budget.map(b=>`${b.file}: ${b.kiB}KiB/${b.gzipKiB}KiB`),assets:assetBytes,overlay},null,2));
