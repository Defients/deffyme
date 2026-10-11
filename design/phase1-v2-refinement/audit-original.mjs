import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {chromium} from 'playwright';
import sharp from 'sharp';
import AxeBuilder from '@axe-core/playwright';
const here=path.dirname(fileURLToPath(import.meta.url));
const original=path.resolve(here,'../phase1-v2-review');
await fs.mkdir(path.join(here,'evidence'),{recursive:true});
const browser=await chromium.launch(),results=[],occlusions=[],axeIncomplete=[];
const lum=rgb=>rgb.map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0);
for(const name of ['arrival','alternative','domain-idle','domain-settled','transition','human']){
 for(const width of [1440,390,320]){
  const context=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:'reduce'});
  const page=await context.newPage();await page.goto(pathToFileURL(path.join(original,name+'.html')).href);await page.evaluate(()=>document.fonts.ready);
  if(name==='arrival'&&width===1440){const axe=await new AxeBuilder({page}).withTags(['wcag2aa']).analyze();axeIncomplete.push(...axe.incomplete.map(i=>({id:i.id,description:i.description,nodes:i.nodes.map(n=>({target:n.target,html:n.html,summary:n.failureSummary,checks:[...n.any,...n.all,...n.none].map(c=>({id:c.id,message:c.message,data:c.data}))}))})));}
  const height=await page.evaluate(()=>document.documentElement.scrollHeight);
  const scrolls=[...new Set(Array.from({length:Math.ceil(height/650)},(_,i)=>Math.min(i*650,Math.max(0,height-900))).concat([Math.max(0,height-900)]))],seen=new Set();
  for(const y of scrolls){await page.evaluate(y=>scrollTo(0,y),y);
   const rows=await page.evaluate(()=>{
    const rows=[],walk=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    while(walk.nextNode()){
     const node=walk.currentNode,el=node.parentElement;if(!node.textContent.trim()||el.closest('script,style,[aria-hidden="true"],svg')||!el.checkVisibility({checkOpacity:true,checkVisibilityCSS:true}))continue;
     const style=getComputedStyle(el),range=document.createRange();range.selectNodeContents(node);
     const rects=[...range.getClientRects()].filter(r=>r.width>0&&r.height>0&&r.x>=0&&r.right<=innerWidth&&r.y>=0&&r.bottom<=innerHeight).map(r=>({x:r.x,y:r.y,width:r.width,height:r.height}));
     if(!rects.length)continue;
     const covered=rects.map(r=>{const x=r.x+r.width/2,y=r.y+r.height/2,stack=document.elementsFromPoint(x,y).filter(e=>getComputedStyle(e).pointerEvents!=='none');const top=stack[0];return top&&!top.contains(el)&&!el.contains(top)?{by:top.className||top.tagName,text:top.textContent?.trim().slice(0,100)}:null;}).filter(Boolean);
     rows.push({text:node.textContent.trim(),tag:el.tagName,class:el.className,color:style.color,size:parseFloat(style.fontSize),weight:parseFloat(style.fontWeight),rects,covered});
    }return rows;
   });
   const hide=await page.addStyleTag({content:'body *{-webkit-text-fill-color:transparent!important;text-shadow:none!important}'});
   const png=await page.screenshot();await hide.evaluate(e=>e.remove());
   const {data,info}=await sharp(png).removeAlpha().raw().toBuffer({resolveWithObject:true});
   for(const row of rows){const key=row.text+'|'+row.class;if(seen.has(key))continue;seen.add(key);
    if(row.covered.length){occlusions.push({page:name,width,scrollY:y,text:row.text,covered:row.covered});continue;}
    const fgValues=row.color.match(/[\d.]+/g)?.map(Number);if(!fgValues)continue;let lowest=Infinity;
    for(const r of row.rects)for(let py=Math.ceil(r.y);py<Math.min(info.height,Math.floor(r.y+r.height));py++)for(let px=Math.ceil(r.x);px<Math.min(info.width,Math.floor(r.x+r.width));px++){
     const at=(py*info.width+px)*info.channels,bg=[data[at],data[at+1],data[at+2]],a=fgValues[3]??1;
     const f=lum(bg.map((v,i)=>fgValues[i]*a+v*(1-a))),b=lum(bg),ratio=(Math.max(f,b)+.05)/(Math.min(f,b)+.05);lowest=Math.min(lowest,ratio);
    }
    const required=row.size>=24||(row.size>=18.667&&row.weight>=700)?3:4.5;
    if(Number.isFinite(lowest))results.push({page:name,width,text:row.text,tag:row.tag,class:row.class,minimumContrast:Number(lowest.toFixed(2)),required,pass:lowest>=required});
   }
  }
  await context.close();
 }
}
await browser.close();
const report={scope:'Fresh supplementary pixel-backed text contrast and center-point occlusion checks of frozen original plates; not WCAG or complete visibility certification. Original files and historical evidence are unchanged.',method:'DPR1 viewport pixels, fonts loaded, matching scrolled text rectangles with text paint suppressed. Conservative minimum background contrast under full text rectangles. Center-point DOM hit stacks flag possible overlapping foreground elements for visual review.',results,failures:results.filter(x=>!x.pass),possibleOcclusions:occlusions,axeIncomplete};
await fs.writeFile(path.join(here,'evidence/original-audit.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({sampleCount:results.length,failures:report.failures,possibleOcclusions:occlusions,axeIncomplete:axeIncomplete.map(i=>({id:i.id,firstReason:i.nodes[0]?.checks}))},null,2));
