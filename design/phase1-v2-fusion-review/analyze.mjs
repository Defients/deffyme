import path from 'node:path';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';
const here=path.dirname(fileURLToPath(import.meta.url));
const assets=path.join(here,'..','phase1-v2-refinement','assets');
{
 const {data,info}=await sharp(path.join(assets,'signal-loom-desktop.webp')).raw().toBuffer({resolveWithObject:true});
 const {width,channels}=info;
 const hits=[];
 for(let y=0;y<320;y++)for(let x=1460;x<1620;x++){
  const i=(y*width+x)*channels,r=data[i],g=data[i+1],b=data[i+2];
  if(r>130&&r-g>55&&r-b>55)hits.push([x,y]);
 }
 const xs=hits.map(h=>h[0]),ys=hits.map(h=>h[1]);
 console.log('tight fracture px',hits.length,'bbox',{minX:Math.min(...xs),minY:Math.min(...ys),maxX:Math.max(...xs),maxY:Math.max(...ys)});
 const byRow={};for(const [x,y] of hits)(byRow[y]??=[]).push(x);
 for(let y=Math.min(...ys);y<=Math.max(...ys);y+=4){
  const rows=[];for(let k=y;k<y+4;k++)if(byRow[k])rows.push(...byRow[k]);
  if(rows.length)console.log(`y${y}-${y+3}: x ${Math.min(...rows)}-${Math.max(...rows)} n=${rows.length}`);
 }
}
// floor profile under claw x=1180: luminance down column
{
 const {data,info}=await sharp(path.join(assets,'signal-loom-desktop.webp')).raw().toBuffer({resolveWithObject:true});
 const {width,channels}=info;
 for(let y=620;y<780;y+=4){
  let s='';for(let x=1100;x<=1280;x+=10){const i=(y*width+x)*channels;const l=(data[i]+data[i+1]+data[i+2])/3;s+=l>200?'#':l>140?'+':l>80?'.':',';}
  console.log(`y${y} |${s}|`);
 }
 // column at x1180
 let col='';
 for(let y=640;y<800;y+=2){const i=(y*width+1180)*channels;const l=(data[i]+data[i+1]+data[i+2])/3;col+=`${y}:${Math.round(l)} `;}
 console.log('col1180',col);
}
