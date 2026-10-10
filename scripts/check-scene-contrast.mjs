import { chromium } from 'playwright';
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

// Inspect rendered scene backgrounds, including the illustration, with only text
// paint suppressed. This supplements axe's incomplete image-background checks.
const browser=await chromium.launch();
const results=[];
const luminance=rgb=>rgb.map(v=>{v/=255;return v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4;}).reduce((n,v,i)=>n+v*[.2126,.7152,.0722][i],0);
for(const width of [1440,390]){
 const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
 await page.goto('http://127.0.0.1:4321/',{waitUntil:'networkidle'});
 await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});
 const text=await page.evaluate(()=>{
  const rows=[];const walk=document.createTreeWalker(document.querySelector('main'),NodeFilter.SHOW_TEXT);
  while(walk.nextNode()){
   const node=walk.currentNode,el=node.parentElement;if(!node.textContent.trim()||el.closest('[aria-hidden="true"]')||!el.checkVisibility({checkVisibilityCSS:true,checkOpacity:true}))continue;
   const range=document.createRange();range.selectNodeContents(node);const style=getComputedStyle(el);
   rows.push({text:node.textContent.trim(),color:style.color,size:parseFloat(style.fontSize),weight:parseFloat(style.fontWeight),rects:[...range.getClientRects()].filter(r=>r.width&&r.height).map(r=>({x:r.x,y:r.y,width:r.width,height:r.height}))});
  }return rows;
 });
 await page.addStyleTag({content:'main, main * {-webkit-text-fill-color:transparent !important;text-shadow:none !important;}'});
 const screenshot=await page.screenshot({fullPage:true});const {data,info}=await sharp(screenshot).removeAlpha().raw().toBuffer({resolveWithObject:true});
 for(const row of text){
  if(!row.rects.length)continue;
  const rgb=row.color.match(/[\d.]+/g).slice(0,3).map(Number),fg=luminance(rgb);let minimum=Infinity;
  for(const rect of row.rects)for(let y=Math.max(0,Math.ceil(rect.y));y<Math.min(info.height,Math.floor(rect.y+rect.height));y++)for(let x=Math.max(0,Math.ceil(rect.x));x<Math.min(info.width,Math.floor(rect.x+rect.width));x++){
   const at=(y*info.width+x)*3,bg=luminance([data[at],data[at+1],data[at+2]]);minimum=Math.min(minimum,(Math.max(fg,bg)+.05)/(Math.min(fg,bg)+.05));
  }
  const required=row.size>=24||(row.size>=18.667&&row.weight>=700)?3:4.5;
  results.push({width,text:row.text,minimumContrast:Number(minimum.toFixed(2)),required,pass:minimum>=required});
 }
 await page.close();
}
await browser.close();
const report={scope:'Rendered closed-state homepage scene text at 1440px and 390px. Worst pixel under each text bounding rectangle with text paint suppressed; conservative supplementary check, not a full WCAG audit.',results,failures:results.filter(r=>!r.pass)};
await writeFile('artifacts/scene-contrast.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({checked:results.length,failures:report.failures},null,2));
if(report.failures.length)process.exitCode=1;
