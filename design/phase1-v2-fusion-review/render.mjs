// Offline capture harness; never included in the HTML plates.
// Renders every plate across the review viewports with JS disabled and OS
// reduced motion, writes screenshots/ and evidence/render-checks.json, then
// runs @axe-core/playwright in a separate JS-enabled context.
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {chromium} from 'playwright';
import {AxeBuilder} from '@axe-core/playwright';
const here=path.dirname(fileURLToPath(import.meta.url));
await fs.mkdir(path.join(here,'screenshots'),{recursive:true});
await fs.mkdir(path.join(here,'evidence'),{recursive:true});
const plates=['arrival','domain-idle','domain-action','domain-response','domain-ack','domain-settled','human','index'];
const views=[[1920,1080],[1440,900],[390,844],[320,800]];
const browser=await chromium.launch(),checks=[],axeResults=[];
const plateArg=process.argv[2]?process.argv[2].split(','):plates;
const viewArg=process.argv[3]?JSON.parse(process.argv[3]):views;
try{
 for(const plate of plateArg)for(const [width,height] of viewArg){
  const context=await browser.newContext({viewport:{width,height},javaScriptEnabled:false,reducedMotion:'reduce'});
  const page=await context.newPage();
  await page.goto(pathToFileURL(path.join(here,`${plate}.html`)).href);
  await page.evaluate(()=>document.fonts.ready);
  const metrics=await page.evaluate(()=>{
   const vw=innerWidth,vh=innerHeight;
   const smallTargets=[...document.querySelectorAll('a,summary')].map(el=>{
    const r=el.getBoundingClientRect();
    return (r.width<44||r.height<44)?{text:el.textContent.trim().slice(0,60),w:+r.width.toFixed(1),h:+r.height.toFixed(1)}:null;
   }).filter(Boolean);
   const red=[...document.querySelectorAll('svg.anomaly *,.frozen-summary .frag *')].reduce((sum,el)=>{
    const r=el.getBoundingClientRect();
    const w=Math.max(0,Math.min(r.right,vw)-Math.max(r.left,0));
    const h=Math.max(0,Math.min(r.bottom,vh)-Math.max(r.top,0));
    return sum+w*h;
   },0);
   return {innerWidth:vw,scrollWidth:document.documentElement.scrollWidth,scripts:document.scripts.length,animations:document.getAnimations().length,imagesLoaded:[...document.images].every(i=>i.complete&&i.naturalWidth>0),smallTargets,redCoveragePct:+(100*red/(vw*vh)).toFixed(4)};
  });
  await page.screenshot({path:path.join(here,'screenshots',`${plate}-${width}.png`)});
  if(width<=390)await page.screenshot({path:path.join(here,'screenshots',`${plate}-${width}-full.png`),fullPage:true});
  checks.push({plate,viewport:`${width}x${height}`,mode:'No JS; OS reduced motion',...metrics});
  await context.close();
 }
 // axe: JS-enabled separate context
 for(const plate of ['arrival','domain-idle','domain-settled','human'])for(const [width,height] of [[1440,900],[320,800]]){
  const context=await browser.newContext({viewport:{width,height},javaScriptEnabled:true,reducedMotion:'reduce'});
  const page=await context.newPage();
  await page.goto(pathToFileURL(path.join(here,`${plate}.html`)).href);
  const res=await new AxeBuilder({page}).analyze();
  axeResults.push({plate,viewport:`${width}x${height}`,violations:res.violations.length,incomplete:res.incomplete.length,violationIds:res.violations.map(v=>v.id),incompleteIds:res.incomplete.map(v=>v.id)});
  await context.close();
 }
}finally{await browser.close();}
const failed=checks.filter(c=>c.innerWidth<c.scrollWidth||c.scripts||c.animations||!c.imagesLoaded);
await fs.writeFile(path.join(here,'evidence/render-checks.json'),JSON.stringify({scope:'Static review study only; not a runtime prototype or accessibility certification',notes:['Small-target flags "Play ↗" (42px) and "Review gallery" (inline) are inherited unchanged from the frozen Signal Loom plates.','The Astrizda inline link inside the verbatim approved paragraph is <44px tall; left as-is under the WCAG 2.5.8 inline exception, and underlined for link-in-text-block.'],checks,axe:axeResults,failed},null,2));
console.log(JSON.stringify({views:checks.length,failed:failed.map(f=>`${f.plate}@${f.viewport}`),small:[...new Set(checks.flatMap(c=>c.smallTargets.map(t=>`${c.plate}@${c.viewport}:${t.text}(${t.w}x${t.h})`)))],axe:axeResults},null,2));
if(failed.length)process.exitCode=1;
