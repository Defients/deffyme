import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
const browser=await chromium.launch(),results=[];
const baseURL=process.env.GATEHOUSE_URL??'http://127.0.0.1:4321/';
const luminance=rgb=>rgb.map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;}).reduce((n,v,i)=>n+v*[.2126,.7152,.0722][i],0);
try{
 for(const width of [1440,390])for(const state of ['default','creature-expanded','card-hover','card-focus','settings']){
  const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:'reduce'});
  await page.goto(baseURL,{waitUntil:'networkidle'});await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});
  if(state==='creature-expanded')await page.locator('.creature-seam>summary').click();
  if(state==='card-hover')await page.locator('#directory a').first().hover();
  if(state==='card-focus')await page.locator('#directory a').first().focus();
  if(state==='settings')await page.locator('.preferences>summary').click();
  // Viewport screenshots match viewport rectangles even after a click scrolls.
  // Full-page screenshots require separate treatment for fixed headers.
  const height=await page.evaluate(()=>document.documentElement.scrollHeight),checked=new Set();
  const scrolls=[...new Set([0,...Array.from({length:Math.ceil(height/600)},(_,i)=>Math.min(i*600,Math.max(0,height-900))),Math.max(0,height-900)])];
  for(const scrollY of scrolls){
   await page.evaluate(y=>window.scrollTo(0,y),scrollY);await page.waitForTimeout(40);
   if(state==='card-hover'){
    const card=await page.locator('#directory a').first().boundingBox();
    if(card&&card.y>=0&&card.y+card.height<=900)await page.mouse.move(card.x+card.width/2,card.y+card.height/2);
   }
   const rows=await page.evaluate(()=>{
    const rows=[];
    for(const root of document.querySelectorAll('main, header')){
     const walk=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
     while(walk.nextNode()){
      const node=walk.currentNode,el=node.parentElement;
      if(!node.textContent.trim()||el.closest('[aria-hidden="true"]')||!el.checkVisibility({checkVisibilityCSS:true,checkOpacity:true}))continue;
      const range=document.createRange();range.selectNodeContents(node);const style=getComputedStyle(el);
      const rects=[...range.getClientRects()].filter(r=>r.width&&r.height&&r.y>=0&&r.y+r.height<=innerHeight&&r.x>=0&&r.x+r.width<=innerWidth).map(r=>({x:r.x,y:r.y,width:r.width,height:r.height}));
      const occluders=root.tagName==='MAIN'?[...document.querySelectorAll('details[open] .preference-panel, details[open].mobile-nav nav')].map(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,right:r.right,bottom:r.bottom};}):[];
      if(rects.length)rows.push({text:node.textContent.trim(),color:style.color,size:parseFloat(style.fontSize),weight:parseFloat(style.fontWeight),rects,occluders,region:root.tagName.toLowerCase()});
     }
    }return rows;
   });
   const suppression=await page.addStyleTag({content:'main, main *, header, header * {-webkit-text-fill-color:transparent !important;text-shadow:none !important;}'});
   const screenshot=await page.screenshot();await suppression.evaluate(el=>el.remove());
   const {data,info}=await sharp(screenshot).removeAlpha().raw().toBuffer({resolveWithObject:true});
   for(const row of rows){
    const key=JSON.stringify([row.text,row.color,row.region,row.rects.map(r=>[Math.round(r.width),Math.round(r.height)])]);if(checked.has(key))continue;checked.add(key);
    const values=row.color.match(/[\d.]+/g).map(Number),fg=luminance(values.slice(0,3));let minimum=Infinity;
    for(const rect of row.rects)for(let y=Math.ceil(rect.y);y<Math.min(info.height,Math.floor(rect.y+rect.height));y++)for(let x=Math.ceil(rect.x);x<Math.min(info.width,Math.floor(rect.x+rect.width));x++){
     if(row.occluders.some(r=>x>=r.x&&x<r.right&&y>=r.y&&y<r.bottom))continue;
     const at=(y*info.width+x)*info.channels,bgRGB=[data[at],data[at+1],data[at+2]],alpha=values[3]??1;
     const composite=alpha===1?fg:luminance(bgRGB.map((v,i)=>values[i]*alpha+v*(1-alpha))),bg=luminance(bgRGB);
     minimum=Math.min(minimum,(Math.max(composite,bg)+.05)/(Math.min(composite,bg)+.05));
    }
    if(!Number.isFinite(minimum))continue; // Fully covered text is not painted.
    const required=row.size>=24||(row.size>=18.667&&row.weight>=700)?3:4.5;
    results.push({width,state,scrollY,region:row.region,text:row.text,minimumContrast:Number(minimum.toFixed(2)),required,pass:minimum>=required});
   }
  }
  await page.close();
 }
 const report={date:'2026-10-10',timezone:'America/New_York',scope:'Rendered homepage main and header text at 1440px/390px, default, Creature expanded, first card hover/focus and settings. Viewport pixels with text paint suppressed and matched scroll coordinates; worst pixel under text rectangles. Pixels covered by open opaque settings/navigation panels are excluded. Conservative supplementary text check, not full WCAG/non-text audit. No application error UI in this slice.',results,failures:results.filter(r=>!r.pass)};
 await mkdir('artifacts',{recursive:true});await writeFile('artifacts/gatehouse-contrast.json',JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({checked:results.length,failures:report.failures},null,2));if(report.failures.length)process.exitCode=1;
}finally{await browser.close();}
