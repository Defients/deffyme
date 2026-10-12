import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';
const here=path.dirname(fileURLToPath(import.meta.url));
async function field(file,box){
 const {data,info}=await sharp(file).resize(1672,941,{fit:'fill'}).extract(box).removeAlpha().raw().toBuffer({resolveWithObject:true});
 let luminance=0,saturation=0;
 const linear=v=>{const x=v/255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4;};
 for(let i=0;i<data.length;i+=info.channels){const [r,g,b]=[data[i],data[i+1],data[i+2]],max=Math.max(r,g,b),min=Math.min(r,g,b);luminance+=.2126*linear(r)+.7152*linear(g)+.0722*linear(b);saturation+=max?(max-min)/max:0;}
 return {box,meanLinearLuminance:luminance/(info.width*info.height),meanHsvSaturation:saturation/(info.width*info.height)};
}
const before=await field(path.join(here,'../phase1-v2-3-handoff/assets/loom-corrected-idle-source.png'),{left:1078,top:313,width:284,height:210});
const after=await field(path.join(here,'assets/loom-idle-source.png'),{left:1210,top:303,width:284,height:210});
const localField={scope:'Environment pixels behind head/mane bounding region before and after composition placement. Not a foreground/background contrast certification or pure same-location brightness edit.',before,after,luminanceReductionPct:100*(1-after.meanLinearLuminance/before.meanLinearLuminance),saturationReductionPct:100*(1-after.meanHsvSaturation/before.meanHsvSaturation)};
const assets=[];for(const state of ['idle','ack'])for(const size of ['desktop','mobile']){const file=`assets/loom-${state}-${size}.webp`,b=await fs.readFile(path.join(here,file)),m=await sharp(b).metadata();assets.push({file,bytes:b.length,KiB:b.length/1024,width:m.width,height:m.height,decodedMiB:m.width*m.height*4/1048576});}
const poses=JSON.parse(await fs.readFile(path.join(here,'../phase1-v2-3-handoff/evidence/resources.json'),'utf8')).poses;
const pairs=assets.map(a=>({file:a.file,oneEnvironmentAndLargestPoseKiB:a.KiB+Math.max(...poses.map(p=>p.KiB)),limitKiB:a.file.includes('mobile')?300:500}));
await fs.writeFile(path.join(here,'evidence/resources-and-field.json'),JSON.stringify({scope:'Offline derivative sizes and environment field statistics only. Review PNG character sources are not delivery assets. Multiple scene/pose residency must be counted in a future runtime slice.',localField,assets,poses,pairs},null,2));
console.log(JSON.stringify({localField,pairs},null,2));
