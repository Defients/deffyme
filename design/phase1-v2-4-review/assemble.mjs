// Offline static plates. Reuses V2.3 canonical display bytes and frame markup.
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';
const here=path.dirname(fileURLToPath(import.meta.url)),prior=path.join(here,'../phase1-v2-3-handoff');
for(const state of ['idle','ack']){
 const src=path.join(here,'assets',`loom-${state}-source.png`);
 try{await fs.access(src);}catch{continue;}
 // Normalize generated environment dimensions to the original scene coordinates.
 const normalized=await sharp(src).resize(1672,941,{fit:'fill'}).png().toBuffer();
 await sharp(normalized).webp({quality:88}).toFile(path.join(here,'assets',`loom-${state}-desktop.webp`));
 await sharp(normalized).extract({left:900,top:0,width:772,height:830}).webp({quality:88}).toFile(path.join(here,'assets',`loom-${state}-mobile.webp`));
}
const originalCss=(await fs.readFile(path.join(prior,'style.css'),'utf8')).replaceAll('(max-width:700px)','(max-width:900px)');
const css=originalCss+`\n/* V2.4 review-only overrides */
.stage{min-height:clamp(690px,45.8333vw,880px)}
.character{left:72.35%;bottom:28.5%}
.input-layer{position:absolute;inset:0;z-index:3;pointer-events:none;clip-path:polygon(76.85% 62.9%,80.8% 62.9%,80.8% 71.1%,76.85% 71.1%)}
.header-aside{display:flex;align-items:center;gap:26px}.header-status{font-size:12px;color:#c0b5ce;letter-spacing:.03em}.header-aside a{display:flex;align-items:center;min-height:44px;color:#ffe0a6}
@media(max-width:900px){.stage{min-height:0}.art{max-width:600px;margin:0 auto}.character{left:40.3762%;bottom:18.974%}.input-layer{clip-path:polygon(49.87% 71.31%,58.5% 71.31%,58.5% 80.61%,49.87% 80.61%)}header{position:relative}header strong{display:block;padding-right:108px}.header-aside{position:absolute;right:20px;top:12px}.header-status{display:none}.header-aside a{min-height:44px;padding:6px 0}.copy>.intro{margin-bottom:16px}}
`;
await fs.writeFile(path.join(here,'style.css'),css);
for(const state of ['idle','inspection','ack-pointing','ack-smug','settled']){
 let html=await fs.readFile(path.join(prior,state+'.html'),'utf8');
 html=html.replaceAll('V2.3','V2.4').replaceAll('Phase 1 V2.3','Phase 1 V2.4')
 .replace(/src="assets\/(canonical-defdef|Defdef-pointing|Defdef-smug)-study.png"/g,'src="../phase1-v2-3-handoff/assets/$1-study.png"')
 .replace('<span>Still &amp; complete</span>','<div class="header-aside"><span class="header-status">Static experience</span><a href="/connect/">Connect ↗</a></div>')
 .replace('One operating point. One contained interruption.','A world beyond the screen. A creature at the controls.')
 .replace('<span class="foreground" aria-hidden="true"></span>','');
 html=html.replaceAll('(max-width:700px)','(max-width:900px)');
 const env=state==='idle'?'idle':'ack';
 // Actual source hardware is foreground; no invented line or altered character pixel.
 const receiver=`<picture class="input-layer" aria-hidden="true"><source media="(max-width:900px)" srcset="assets/loom-${env}-mobile.webp"><img class="environment" src="assets/loom-${env}-desktop.webp" alt="" width="1672" height="941"></picture>`;
 html=html.replace('</div><div class="copy">',receiver+'</div><div class="copy">');
 // Pointing is provisional for the settled response; smug remains a comparison.
 if(state==='settled')html=html.replace('character smug','character pointing').replaceAll('Defdef-smug-study.png','Defdef-pointing-study.png').replace('width="1065" height="1402"','width="1101" height="1402"').replace('acknowledging the transmission with folded arms','pointing toward the mechanism');
 await fs.writeFile(path.join(here,state+'.html'),html);
}
