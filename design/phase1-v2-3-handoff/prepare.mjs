// Offline plate assembly only. No scripts or behavior are emitted into plates.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';
const here=path.dirname(fileURLToPath(import.meta.url));
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const poses=['canonical-defdef','Defdef-smug','Defdef-pointing'];
const evidence=[];
for(const name of poses){
 const source=path.join(here,'assets',name+'.png');
 const original=await fs.readFile(source),m=await sharp(original).metadata();
 const {data,info}=await sharp(original).trim({threshold:0}).png().toBuffer({resolveWithObject:true});
 await fs.writeFile(path.join(here,'assets',name+'-study.png'),data);
 evidence.push({file:'assets/'+name+'.png',sha256:hash(original),bytes:original.length,width:m.width,height:m.height,study:'assets/'+name+'-study.png',studyWidth:info.width,studyHeight:info.height,operation:'Lossless transparent-margin trim only; no redraw, recolor, filter, stretch or pose synthesis'});
}
for(const state of ['idle','ack']){
 const source=path.join(here,'assets',`loom-corrected-${state}-source.png`);
 await sharp(source).webp({quality:88}).toFile(path.join(here,'assets',`loom-${state}-desktop.webp`));
 await sharp(source).extract({left:900,top:0,width:772,height:830}).resize({width:772}).webp({quality:88}).toFile(path.join(here,'assets',`loom-${state}-mobile.webp`));
}
let css=await fs.readFile(path.join(here,'style.css'),'utf8');css=css.replace('inter-latin.woff2','inter.woff2');
// Align crown-to-feet height across all poses using source aspect ratios.
const defaultRatio=evidence[0].studyWidth/evidence[0].studyHeight;
for(const [i,selector] of [[1,'smug'],[2,'pointing']]){
 const scale=(evidence[i].studyWidth/evidence[i].studyHeight)/defaultRatio;
 css+=`\n.character.${selector}{width:${17*scale}%}@media(max-width:700px){.character.${selector}{width:${36.82*scale}%}}`;
 evidence[i].relativeDisplayScale=scale;
}
await fs.writeFile(path.join(here,'style.css'),css);
const plates=[['idle','canonical-defdef',''],['inspection','canonical-defdef',''],['ack-smug','Defdef-smug','smug'],['ack-pointing','Defdef-pointing','pointing'],['settled','Defdef-smug','smug']];
for(const [name,pose,poseClass] of plates){
 const open=name!=='idle',env=open?'ack':'idle';
 const note=name==='idle'?'Idle authority study: routing and operator bay precede activation.':name==='inspection'?'Inspection: complete transmission and physical conductor response; acknowledgment follows only in an enhanced mode.':name==='ack-pointing'?'Pointing alternative: directional authority; hand aims toward the controlled mechanism.':name==='ack-smug'?'Smug alternative: authority already established; acknowledgment is confident recognition.':'Settled: proposed immediate static equivalent for no JS, Essential and reduced motion.';
 const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>V2.3 ${name} — review study</title><link rel="stylesheet" href="style.css"></head><body class="${open?'open':''}"><a class="skip" href="#main">Skip to content</a><header><strong>✳ deffy.me</strong><nav aria-label="Provisional primary"><a href="/story/">Human</a><a href="/forge/">Projects</a><a href="/astrizda/">Worlds</a></nav><span>Still &amp; complete</span></header><div class="review">Phase 1 V2.3 · ${name} · static art-direction study · NOT FINAL / NOT IMPLEMENTED</div><main id="main"><section class="stage"><div class="art"><picture><source media="(max-width:700px)" srcset="assets/loom-${env}-mobile.webp"><img class="environment" src="assets/loom-${env}-desktop.webp" alt="" width="1672" height="941"></picture><img class="character ${poseClass}" src="assets/${pose}-study.png" alt="Defdef, crowned operator of the signal loom, ${poseClass==='pointing'?'pointing toward the mechanism':poseClass==='smug'?'acknowledging the transmission with folded arms':'standing at the control station'}." width="${evidence.find(x=>x.study.includes(pose+'-')).studyWidth}" height="${evidence.find(x=>x.study.includes(pose+'-')).studyHeight}"><span class="foreground" aria-hidden="true"></span></div><div class="copy"><p class="eyebrow">✳ Defdef’s territory</p><h1>The Creature<br>of the Internet.</h1><p class="intro">One operating point. One contained interruption.</p><section class="disclosure" aria-label="${open?'Transmission from the Astril Continuum':'Signal inspection control study'}"><div class="control">Inspect the broken signal <span class="mark" aria-hidden="true">${open?'−':'+'}</span></div>${open?'<div class="transmission"><p class="eyebrow">Transmission · Astril Continuum</p><h2>A signal from beyond the screen.</h2><p>Somewhere behind this page, worlds are taking shape. Defdef has the controls.</p><a class="cta" href="/astrizda/">Explore the Worlds →</a></div>':'<p>A broken transmission at the loom’s control seam.</p>'}</section><p class="authority">Defdef operates the signal.</p></div></section><div class="routes"><a href="/story/">Meet the Human<small>Deffy, beyond the username.</small></a><a href="/forge/">Projects / The Forge<small>Games, tools, ongoing experiments.</small></a><a href="/astrizda/">Worlds / Astrizda<small>A fictional continuum of my own making.</small></a></div></main><footer class="plate-note">${note} The inspection row is a frozen storyboard control, not an executable interaction. Route links show proposed destinations.</footer></body></html>`;
 await fs.writeFile(path.join(here,name+'.html'),html);
}
await fs.writeFile(path.join(here,'evidence/canonical-provenance.json'),JSON.stringify(evidence,null,2));
console.log(JSON.stringify(evidence,null,2));
