import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {chromium} from 'playwright';
import sharp from 'sharp';
const here=path.dirname(fileURLToPath(import.meta.url)),root=path.resolve(here,'../..');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const browser=await chromium.launch(),keyboard=[],states=[],failures=[],originalHit=[];
for(const width of [1440,390,320]){
 for(const name of ['arrival','domain-settled','human']){
  const context=await browser.newContext({viewport:{width,height:900},javaScriptEnabled:false,reducedMotion:'reduce'}),page=await context.newPage();
  await page.goto(pathToFileURL(path.join(here,name+'.html')).href);await page.evaluate(()=>document.fonts.ready);
  const expected=await page.locator('a').count(),seen=[];
  for(let i=0;i<expected;i++){
   await page.keyboard.press('Tab');
   const item=await page.evaluate(()=>{const e=document.activeElement,r=e.getBoundingClientRect(),s=getComputedStyle(e);return {tag:e.tagName,text:e.textContent.trim(),href:e.getAttribute('href'),x:r.x,y:r.y,width:r.width,height:r.height,outline:s.outlineStyle,outlineWidth:s.outlineWidth,viewportWidth:innerWidth,viewportHeight:innerHeight};});
   seen.push(item);
   if(item.tag!=='A'||item.outline==='none'||parseFloat(item.outlineWidth)<2||item.width>width||item.x<0||item.y+item.height<=0||item.y>=item.viewportHeight)failures.push({type:'keyboard',page:name,width,item});
   if(i===0&&name==='arrival'&&width===320)await page.screenshot({path:path.join(here,'screenshots/arrival-320-skip-focus.png')});
  }
  keyboard.push({page:name,width,expected,visited:seen});await context.close();
 }
 for(const name of ['idle','action','response','ack','settled']){
  const page=await browser.newPage({viewport:{width,height:900}});await page.goto(pathToFileURL(path.join(here,'domain-'+name+'.html')).href);await page.evaluate(()=>document.fonts.ready);
  const metrics=await page.evaluate(()=>{const names=['.stage','.stage-copy','.art-panel','.character','.route-band','.artifact'];return Object.fromEntries(names.map(s=>{const r=document.querySelector(s).getBoundingClientRect();return [s,{x:r.x,y:r.y,width:r.width,height:r.height}];}));});
  states.push({state:name,width,metrics});await page.close();
 }
 const frozen=await browser.newPage({viewport:{width,height:900}});await frozen.goto(pathToFileURL(path.join(root,'design/phase1-v2-review/alternative.html')).href);await frozen.evaluate(()=>document.fonts.ready);
 const link=frozen.locator('.discover');await link.scrollIntoViewIfNeeded();
 originalHit.push({width,...await link.evaluate(e=>{const r=e.getBoundingClientRect(),t=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);return {text:e.textContent.trim(),centerHit:!!t&&(t===e||e.contains(t)),interceptor:t?.tagName,rect:{x:r.x,y:r.y,width:r.width,height:r.height}};})});await frozen.close();
}
for(const width of [1440,390,320]){
 const group=states.filter(s=>s.width===width),reference=JSON.stringify(group[0].metrics);
 if(group.some(s=>JSON.stringify(s.metrics)!==reference))failures.push({type:'state-layout-drift',width,states:group});
 for(const item of group){const c=item.metrics['.character'],panel=item.metrics['.art-panel'];if(c.x<panel.x||c.x+c.width>panel.x+panel.width||c.y<panel.y||c.y+c.height>panel.y+panel.height)failures.push({type:'canonical-art-clipped',width,state:item.state});}
}
const fallback=await browser.newPage({viewport:{width:390,height:844}});
await fallback.route('**/*',route=>/\.(webp|woff2)$/.test(route.request().url())?route.abort():route.continue());
await fallback.goto(pathToFileURL(path.join(here,'arrival.html')).href);await fallback.evaluate(()=>document.fonts.ready);
await fallback.screenshot({path:path.join(here,'screenshots/arrival-390-art-font-failure.png'),fullPage:true});
const fallbackMetrics=await fallback.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,links:document.querySelectorAll('a').length,visibleHeading:document.querySelector('h1').textContent,brokenImages:[...document.images].filter(i=>!i.naturalWidth).length}));
if(fallbackMetrics.scrollWidth>fallbackMetrics.width)failures.push({type:'asset-failure-overflow'});
await browser.close();
const protectedSets={};
for(const [name,file] of [['frozenOriginal','phase1-v2-frozen-before-refinement.json'],['protectedRuntime','phase1-v2-refinement-runtime-before.json']]){
 const items=JSON.parse(await fs.readFile(path.join(root,'artifacts',file),'utf8')),differences=[];
 for(const entry of items){const actual=hash(await fs.readFile(entry.path));if(actual.toUpperCase()!==entry.sha256.toUpperCase())differences.push({file:entry.path,expected:entry.sha256,actual});}
 protectedSets[name]={count:items.length,differences};if(differences.length)failures.push({type:name,differences});
}
const archiveHash=hash(await fs.readFile(path.join(root,'artifacts/DEFFY-ME-V2.1-PHASE1-OWNER-OPUS-REVIEW.zip')));
if(archiveHash!=='d33632ca81cd56c1ac359c50650bc47d48265e7dbf4136e7f4b4a71dde890f44')failures.push({type:'originalArchiveChanged',archiveHash});
const provenance=[];
for(const name of ['signal-loom-source.png','signal-loom-desktop.webp','signal-loom-medium.webp','signal-loom-mobile.webp','canonical-defdef.png','defdef-resting.webp']){
 const b=await fs.readFile(path.join(here,'assets',name)),m=await sharp(b).metadata();provenance.push({file:'assets/'+name,sha256:hash(b),bytes:b.length,width:m.width,height:m.height,decodedRgbaBytes:m.width*m.height*4});
}
const report={scope:'Static plates only. Keyboard focus traversal, state-frame consistency, full character bounds, art/font failure geometry, byte preservation and asset provenance. No executable artifact interaction or live-host/performance certification.',failures,keyboard,states,originalDiscoveryHitTest:originalHit,fallbackMetrics,protectedSets,originalArchiveSha256:archiveHash,provenance};
await fs.writeFile(path.join(here,'evidence/boundaries.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({failures,keyboardViews:keyboard.length,keyboardLinks:keyboard.reduce((n,k)=>n+k.visited.length,0),originalDiscoveryHitTest:originalHit,fallbackMetrics,protectedSets,provenance},null,2));
if(failures.length)process.exitCode=1;
