import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve,relative,extname } from 'node:path';
import { createHash } from 'node:crypto';
import { gzipSync } from 'node:zlib';
const root=resolve('dist');
const routes=JSON.parse(await readFile('src/content/routes.json','utf8'));
const walk=async p=>(await Promise.all((await readdir(p,{withFileTypes:true})).map(e=>e.isDirectory()?walk(resolve(p,e.name)):[resolve(p,e.name)]))).flat();
const files=await walk(root),errors=[],html=[];
const assets=JSON.parse(await readFile('design/asset-provenance.json','utf8')).runtime;
const allowedAssets=new Map(assets.map(a=>['rebirth-assets/'+a.file,a.sha256]));
for(const p of files){
 const rel=relative(root,p).replaceAll('\\','/'), data=await readFile(p);
 if(extname(p)==='.html'){html.push(rel);if(!routes.ownedHtml.includes(rel))errors.push('Unowned HTML: '+rel);}
 else if(!routes.ownedSupport.includes(rel)&&!routes.ownedAssetDirectories.some(d=>rel.startsWith(d)))errors.push('Unowned output: '+rel);
 if(rel.startsWith('rebirth-assets/')&&(!allowedAssets.has(rel)||createHash('sha256').update(data).digest('hex')!==allowedAssets.get(rel)))errors.push('Unapproved runtime asset: '+rel);
 if(/\.(?:html|js|css|json|xml|txt|svg)$/.test(rel)){
  const text=data.toString('utf8');
  for(const pattern of [/PRIVATE_CANARY_NEVER_PUBLIC/i,/Priscilla/i,/Sodapoppin/i,/a1deffy@gmail\.com/i,/[CH]:[\\/](?:Users|myProjects)/i,/Pasted text\.txt/i,/approvedRevisionHash/]){
   if(pattern.test(text))errors.push('Private/authoring data in '+rel+': '+pattern);
  }
  if(rel.endsWith('.html')&&!text.includes('noindex, nofollow'))errors.push('Preview indexing protection missing: '+rel);
 }
 if(/\.(?:map|png|mp3|wav|mp4|env)$/.test(rel))errors.push('Forbidden master/media/source output: '+rel);
}
for(const p of routes.ownedHtml)if(!html.includes(p))errors.push('Expected HTML missing: '+p);
const rows=await Promise.all(files.map(async p=>{const data=await readFile(p);return {file:relative(root,p).replaceAll('\\','/'),bytes:data.length,gzipBytes:gzipSync(data).length};}));
const htmlSize=rows.find(r=>r.file==='index.html')?.gzipBytes??Infinity;
const cssSize=rows.filter(r=>r.file.endsWith('.css')).reduce((n,r)=>n+r.gzipBytes,0);
const homepage=await readFile(resolve(root,'index.html'),'utf8');
const homepageScripts=[...homepage.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]).join('\n');
const homepageJsGzip=gzipSync(homepageScripts).length;
const forgeJsGzip=rows.filter(r=>r.file.endsWith('.js')).reduce((n,r)=>n+r.gzipBytes,0);
const fonts=rows.filter(r=>r.file.endsWith('.woff2'));
if(htmlSize>35*1024)errors.push('Homepage HTML budget exceeded');
if(cssSize>25*1024)errors.push('CSS budget exceeded');
if(homepageJsGzip>45*1024)errors.push('Homepage JS budget exceeded');
if(/<astro-island\b/.test(homepage)||/<script\b[^>]*\bsrc=/.test(homepage))errors.push('Homepage must not acquire external scripts or framework hydration');
if(forgeJsGzip>150*1024)errors.push('Forge total JavaScript budget exceeded');
if(fonts.length>2||fonts.reduce((n,r)=>n+r.bytes,0)>100*1024)errors.push('Font budget exceeded');
for(const asset of assets){if(asset.file.includes('defdef')&&(asset.bytes>140*1024||asset.width*asset.height*4>4*1024*1024))errors.push('Defdef runtime budget exceeded');}
const manifest={phase:'G1 static Gatehouse local preview; M0–M2 archive-publication boundary retained',deploymentAuthorized:false,htmlRoutes:html.sort(),budgets:{homepageHtmlGzip:htmlSize,homepageJsGzip,cssGzip:cssSize,forgeJsGzip,fontBytes:fonts.reduce((n,r)=>n+r.bytes,0)},files:rows,errors,pass:errors.length===0};
await mkdir('artifacts',{recursive:true});await writeFile('artifacts/output-audit.json',JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify({pass:manifest.pass,htmlRoutes:html.length,files:files.length,homepageGzipBytes:htmlSize,cssGzipBytes:cssSize,errors},null,2));
if(errors.length)process.exitCode=1;
