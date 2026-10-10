import sharp from 'sharp';
import { mkdir, copyFile, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
const blueprint=resolve('../mySite-deffyme/docs/rebirth/reference-assets');
const source=JSON.parse(await readFile(resolve(blueprint,'ASSET_MANIFEST.json'),'utf8'));
await mkdir('design/masters',{recursive:true});await mkdir('public/rebirth-assets',{recursive:true});
const records=[];
for(const a of source.assets){
 const bytes=await readFile(resolve(blueprint,a.referencePath));
 if(createHash('sha256').update(bytes).digest('hex')!==a.sha256)throw new Error('Reference changed: '+a.filename);
 await copyFile(resolve(blueprint,a.referencePath),resolve('design/masters',a.filename));
}
const room=resolve('design/masters/headquarters.png');
for(const width of [1280,1920]){
 const file='room-'+width+'.webp';await sharp(room).resize(width).webp({quality:80,effort:6}).toFile('public/rebirth-assets/'+file);
 records.push({file,role:'Illustrated invented environment',...(await sharp('public/rebirth-assets/'+file).metadata())});
}
const meta=await sharp(room).metadata();const left=Math.round(meta.width*.45);
await sharp(room).extract({left,top:0,width:meta.width-left,height:meta.height}).resize(768,768,{fit:'cover',position:'right'}).webp({quality:79,effort:6}).toFile('public/rebirth-assets/room-mobile.webp');
records.push({file:'room-mobile.webp',role:'Mobile composition of invented environment',...(await sharp('public/rebirth-assets/room-mobile.webp').metadata())});
const body=await sharp('design/masters/Defdef-resting.png').resize(352,440,{fit:'contain',background:{r:0,g:0,b:0,alpha:0}}).toBuffer();
await sharp({create:{width:384,height:480,channels:4,background:{r:0,g:0,b:0,alpha:0}}}).composite([{input:body,left:16,top:12}]).webp({quality:86,alphaQuality:100,effort:6}).toFile('public/rebirth-assets/defdef-resting.webp');
records.push({file:'defdef-resting.webp',role:'Supplied canonical resting pose; encoding/scale/padding only',...(await sharp('public/rebirth-assets/defdef-resting.webp').metadata())});
const out=[];
for(const r of records){const b=await readFile('public/rebirth-assets/'+r.file);out.push({file:r.file,role:r.role,width:r.width,height:r.height,bytes:b.length,sha256:createHash('sha256').update(b).digest('hex'),hasAlpha:r.hasAlpha});}
await writeFile('design/asset-provenance.json',JSON.stringify({date:'2026-10-08',generator:'Built-in image_gen for room only; sharp for deterministic encoding/resizing',references:source.assets.map(a=>({filename:a.filename,sha256:a.sha256})),runtime:out},null,2)+'\n');
console.log(JSON.stringify(out,null,2));

