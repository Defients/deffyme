// Offline layout, pose and anchor evidence; not a runtime interaction prototype.
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {chromium} from 'playwright';
import sharp from 'sharp';
const here=path.dirname(fileURLToPath(import.meta.url)),checks=[];
const browser=await chromium.launch();
try{
 for(const [width,height] of [[1920,1080],[1440,900],[768,1024],[390,844],[320,800]])for(const state of ['idle','inspection','ack-pointing','ack-smug','settled']){
  const c=await browser.newContext({viewport:{width,height},javaScriptEnabled:false,reducedMotion:'reduce'}),page=await c.newPage();
  await page.goto(pathToFileURL(path.join(here,state+'.html')).href);await page.evaluate(()=>document.fonts.ready);
  const metrics=await page.evaluate(()=>{
   const rect=el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom};};
   const art=rect(document.querySelector('.art')),character=rect(document.querySelector('.character')),stage=rect(document.querySelector('.stage')),routes=rect(document.querySelector('.routes'));
   // Authored anchors in normalized source pixels. These are geometry bounds,
   // not independent semantic recognition or pixel segmentation.
   const mobile=innerWidth<=900,origin=mobile?900:0,sw=mobile?772:1672,sh=mobile?830:941;
   const anchor=(x,y,w,h)=>({x:art.x+(x-origin)*art.width/sw,y:art.y+y*art.height/sh,width:w*art.width/sw,height:h*art.height/sh});
   const anomaly=anchor(1445,65,195,235),receiver=anchor(1285,592,67,77);
   const within=a=>a.x>=art.x&&a.x+a.width<=art.right&&a.y>=art.y&&a.y+a.height<=art.bottom;
   const links=[...document.querySelectorAll('header a,.cta,.routes a')].map(el=>({text:el.textContent.trim(),...rect(el)}));
   return {scrollWidth:document.documentElement.scrollWidth,imagesLoaded:[...document.images].every(i=>i.complete&&i.naturalWidth),scripts:document.scripts.length,animations:document.getAnimations().length,art,character,stage,routes,anomaly,receiver,characterWithinArt:character.x>=art.x&&character.right<=art.right&&character.y>=art.y&&character.bottom<=art.bottom,anomalyWithinArt:within(anomaly),receiverWithinArt:within(receiver),smallTargets:links.filter(x=>x.width<44||x.height<44)};
  });
  checks.push({state,width,height,mode:'JS disabled + OS reduced motion',...metrics});
  await page.screenshot({path:path.join(here,'screenshots',`${state}-${width}.png`)});
  if(width<=768)await page.screenshot({path:path.join(here,'screenshots',`${state}-${width}-full.png`),fullPage:true});
  await c.close();
 }
}finally{await browser.close();}
const comparisons=[];
for(const width of [1920,1440,768,390,320]){
 const group=checks.filter(x=>x.width===width),span=key=>Math.max(...group.map(x=>x[key]))-Math.min(...group.map(x=>x[key]));
 const heights=group.map(x=>x.character.height),bottoms=group.map(x=>x.character.bottom),routeTops=group.map(x=>x.routes.y);
 comparisons.push({width,poseHeightSpreadPx:Math.max(...heights)-Math.min(...heights),poseBottomSpreadPx:Math.max(...bottoms)-Math.min(...bottoms),routeTopSpreadPx:Math.max(...routeTops)-Math.min(...routeTops),note:width<=900?'Open transmission deliberately expands normal text flow below fixed art.':'Reserved stage height prevents disclosure-induced route movement.'});
}
const failures=checks.filter(x=>x.scrollWidth>x.width||!x.imagesLoaded||x.scripts||x.animations||!x.characterWithinArt||!x.anomalyWithinArt||!x.receiverWithinArt||x.smallTargets.length);
for(const width of [1440,390,320])for(const state of ['idle','ack-pointing']){
 const before=path.join(here,'../phase1-v2-3-handoff/screenshots',`${state}-${width}.png`),after=path.join(here,'screenshots',`${state}-${width}.png`),a=await sharp(after).metadata(),b=await sharp(before).metadata();
 const label=Buffer.from(`<svg width="${width*2}" height="48"><rect width="100%" height="100%" fill="#171320"/><g fill="#f5f1ed" font-family="Arial" font-size="${width<700?14:22}"><text x="16" y="30">V2.3 · ${state}</text><text x="${width+16}" y="30">V2.4 · ${state} / REVIEW ONLY</text></g></svg>`);
 await sharp({create:{width:width*2,height:Math.max(a.height,b.height)+48,channels:3,background:'#100e18'}}).composite([{input:label,left:0,top:0},{input:before,left:0,top:48},{input:after,left:width,top:48}]).png().toFile(path.join(here,'screenshots',`comparison-${state}-${width}.png`));
}
const thumbs=[];for(const state of ['idle','inspection','ack-pointing','ack-smug'])thumbs.push(await sharp(path.join(here,'screenshots',state+'-1440.png')).resize(720,450).toBuffer());
await sharp({create:{width:1440,height:900,channels:3,background:'#100e18'}}).composite(thumbs.map((input,i)=>({input,left:i%2*720,top:Math.floor(i/2)*450}))).png().toFile(path.join(here,'screenshots','state-board.png'));
await fs.writeFile(path.join(here,'evidence/render-checks.json'),JSON.stringify({scope:'Frozen review plates: layout/load, authored anchor bounds and pose dimensions. Not contrast, runtime interaction, usability or production certification.',checks,comparisons,failures},null,2));
console.log(JSON.stringify({views:checks.length,comparisons,failures:failures.map(x=>({state:x.state,width:x.width,smallTargets:x.smallTargets}))},null,2));if(failures.length)process.exitCode=1;
