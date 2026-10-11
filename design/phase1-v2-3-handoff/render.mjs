// Offline capture and review-layout checks, not a production test suite.
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {chromium} from 'playwright';
import sharp from 'sharp';
const here=path.dirname(fileURLToPath(import.meta.url));
const browser=await chromium.launch(),checks=[];
try{
 for(const plate of ['idle','inspection','ack-smug','ack-pointing','settled'])for(const [width,height] of [[1440,900],[390,844],[320,800]]){
  const context=await browser.newContext({viewport:{width,height},javaScriptEnabled:false,reducedMotion:'reduce'}),page=await context.newPage();
  await page.goto(pathToFileURL(path.join(here,plate+'.html')).href);await page.evaluate(()=>document.fonts.ready);
  const metrics=await page.evaluate(()=>{const c=document.querySelector('.character').getBoundingClientRect(),a=document.querySelector('.art').getBoundingClientRect();return {scrollWidth:document.documentElement.scrollWidth,scripts:document.scripts.length,animations:document.getAnimations().length,loaded:[...document.images].every(x=>x.complete&&x.naturalWidth),characterWithinArt:c.left>=a.left&&c.right<=a.right&&c.top>=a.top&&c.bottom<=a.bottom,characterHeight:c.height,characterBottom:c.bottom,sceneWidth:a.width,sceneHeight:a.height}});
  checks.push({plate,width,height,mode:'JS disabled + reduced motion',...metrics});
  await page.screenshot({path:path.join(here,'screenshots',`${plate}-${width}.png`)});
  if(width<700)await page.screenshot({path:path.join(here,'screenshots',`${plate}-${width}-full.png`),fullPage:true});
  await context.close();
 }
 // True originals remain in frozen packages; these are labeled comparison boards.
 for(const width of [1440,390,320]){
  const before=path.join(here,'..','phase1-v2-fusion-review','screenshots',`domain-idle-${width}.png`),after=path.join(here,'screenshots',`idle-${width}.png`);
  const b=await sharp(before).metadata(),a=await sharp(after).metadata(),h=Math.max(b.height,a.height);
  const label=Buffer.from(`<svg width="${width*2}" height="52"><rect width="100%" height="100%" fill="#171320"/><g fill="#f5f1ed" font-family="Arial" font-size="${width<700?14:22}"><text x="18" y="32">BEFORE · V2.2 fusion</text><text x="${width+18}" y="32">AFTER · V2.3 study (not final)</text></g></svg>`);
  await sharp({create:{width:width*2,height:h+52,channels:3,background:'#100e18'}}).composite([{input:label,left:0,top:0},{input:before,left:0,top:52},{input:after,left:width,top:52}]).png().toFile(path.join(here,'screenshots',`before-after-${width}.png`));
 }
 const thumbs=[];for(const p of ['idle','inspection','ack-smug','ack-pointing'])thumbs.push(await sharp(path.join(here,'screenshots',p+'-1440.png')).resize(720,450).toBuffer());
 await sharp({create:{width:1440,height:900,channels:3,background:'#100e18'}}).composite(thumbs.map((input,i)=>({input,left:(i%2)*720,top:Math.floor(i/2)*450}))).png().toFile(path.join(here,'screenshots','state-board.png'));
}finally{await browser.close();}
const failures=checks.filter(x=>x.scrollWidth>x.width||x.scripts||x.animations||!x.loaded||!x.characterWithinArt);
await fs.writeFile(path.join(here,'evidence/render-checks.json'),JSON.stringify({scope:'Frozen review plates only; no interactive, contrast, axe, live performance or usability certification',checks,failures},null,2));
console.log(JSON.stringify({views:checks.length,failures},null,2));if(failures.length)process.exitCode=1;
