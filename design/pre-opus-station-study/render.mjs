// Offline capture harness; never included in the HTML plates.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {chromium} from 'playwright';
const here=path.dirname(fileURLToPath(import.meta.url));
await fs.mkdir(path.join(here,'screenshots'),{recursive:true});
await fs.mkdir(path.join(here,'evidence'),{recursive:true});
const browser=await chromium.launch(),checks=[];
try{
 for(const file of ['index.html','ack.html'])for(const [width,height] of [[1440,900],[390,844],[320,844]]){
  const context=await browser.newContext({viewport:{width,height},javaScriptEnabled:false,reducedMotion:'reduce'});
  const page=await context.newPage();
  await page.goto(pathToFileURL(path.join(here,file)).href);
  await page.evaluate(()=>document.fonts.ready);
  const metrics=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,scripts:document.scripts.length,animations:document.getAnimations().length,imagesLoaded:[...document.images].every(i=>i.complete&&i.naturalWidth>0),scenes:[...document.querySelectorAll('.scene')].map(s=>{const r=s.getBoundingClientRect();return {width:r.width,height:r.height};})}));
  await page.screenshot({path:path.join(here,'screenshots',`${file==='index.html'?'idle':'ack'}-${width}-full.png`),fullPage:true});
  const visible=await page.locator('.scene').all();
  for(let i=0;i<visible.length;i++)if(await visible[i].isVisible())await visible[i].screenshot({path:path.join(here,'screenshots',`${file==='index.html'?'idle':'ack'}-${width}-${String.fromCharCode(65+i)}.png`)});
  checks.push({file,mode:'No JS; OS reduced motion',...metrics});
  await context.close();
 }
}finally{await browser.close();}
const sources=[];
for(const name of ['signal-loom-desktop.webp','defdef-resting.webp','inter.woff2','space-grotesk.woff2']){
 const relative=`../phase1-v2-refinement/assets/${name}`,bytes=await fs.readFile(path.join(here,relative));
 sources.push({path:relative,sha256:crypto.createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length,handling:'Referenced unchanged; no copy or derivative generated'});
}
const failed=checks.filter(c=>c.width<c.scrollWidth||c.scripts||c.animations||!c.imagesLoaded);
await fs.writeFile(path.join(here,'evidence/render-checks.json'),JSON.stringify({scope:'Supplemental static study only; no production, visitor or causal validation',checks,sources,failed},null,2));
console.log(JSON.stringify({views:checks.length,failed},null,2));
if(failed.length)process.exitCode=1;
