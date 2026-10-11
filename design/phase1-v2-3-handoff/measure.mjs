import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';
const here=path.dirname(fileURLToPath(import.meta.url));
const poses=[];
for(const name of ['canonical-defdef','Defdef-smug','Defdef-pointing']){
 const source=path.join(here,'assets',name+'-study.png'),out=path.join(here,'assets',name+'-delivery-trial.webp');
 await sharp(source).resize({height:480}).webp({quality:86}).toFile(out);
 const b=await fs.readFile(out),m=await sharp(b).metadata();poses.push({file:path.relative(here,out).replaceAll('\\','/'),bytes:b.length,KiB:+(b.length/1024).toFixed(2),width:m.width,height:m.height,decodedMiB:+(m.width*m.height*4/1048576).toFixed(2),sha256:crypto.createHash('sha256').update(b).digest('hex')});
}
const environments=[];
for(const state of ['idle','ack'])for(const size of ['desktop','mobile']){const file=`assets/loom-${state}-${size}.webp`,b=await fs.readFile(path.join(here,file)),m=await sharp(b).metadata();environments.push({file,bytes:b.length,KiB:+(b.length/1024).toFixed(2),width:m.width,height:m.height,decodedMiB:+(m.width*m.height*4/1048576).toFixed(2)});}
const pairs=environments.map(e=>({environment:e.file,maxPoseKiB:Math.max(...poses.map(p=>p.KiB)),combinedKiB:+(e.KiB+Math.max(...poses.map(p=>p.KiB))).toFixed(2),limitKiB:e.file.includes('mobile')?300:500}));
await fs.writeFile(path.join(here,'evidence/resources.json'),JSON.stringify({scope:'Offline derivative feasibility only. PNG masters used in plates are not delivery assets; generated second environment is a study, not a proposed mandatory second runtime download. No production transfer or timing measurement.',poses,environments,pairs},null,2));console.log(JSON.stringify({poses,pairs},null,2));
