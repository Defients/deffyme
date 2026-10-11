import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
const here=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(here,'../..');
const browser=await chromium.launch();
const checks=[];
for(const name of ['arrival','alternative','domain-idle','domain-settled','transition','human']) {
 for(const width of [320,1440]){
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
  const page=await context.newPage();
  await page.goto(pathToFileURL(path.join(here,name+'.html')).href);await page.evaluate(()=>document.fonts.ready);
  const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
  checks.push({page:name,width,violations:axe.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),incomplete:axe.incomplete.map(v=>({id:v.id,nodeCount:v.nodes.length})),passRuleCount:axe.passes.length});
  if(name==='arrival'&&width===320){await page.keyboard.press('Tab');await page.screenshot({path:path.join(here,'screenshots/arrival-320-keyboard.png'),fullPage:false});checks.push({page:name,mode:'keyboard first Tab',active:await page.evaluate(()=>({text:document.activeElement.textContent,href:document.activeElement.getAttribute('href')}))});}
  await context.close();
 }
}
// Complete identity and ordinary navigation when design images fail.
const page=await browser.newPage({viewport:{width:390,height:844},javaScriptEnabled:false});
await page.route('**/*.{webp,png,woff2}',r=>r.abort());
await page.goto(pathToFileURL(path.join(here,'arrival.html')).href);
await page.screenshot({path:path.join(here,'screenshots/arrival-390-art-font-failure.png'),fullPage:true});
checks.push({page:'arrival',mode:'art and fonts blocked; no JS',...(await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,width:innerWidth,identity:document.querySelector('.identity-line').textContent,ordinaryLinks:[...document.querySelectorAll('header nav a')].map(a=>a.textContent)})))});
await browser.close();
const preservation=JSON.parse(await fs.readFile(path.join(root,'artifacts/phase1-v2-preservation-before.json'),'utf8'));
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const differences=[],protectedFiles=[];
for(const item of preservation){const current=hash(await fs.readFile(item.path)).toUpperCase();if(current!==item.sha256)differences.push(item.path);protectedFiles.push({file:path.relative(root,item.path).replaceAll('\\','/'),before:item.sha256.toLowerCase(),after:current.toLowerCase()});}
await fs.writeFile(path.join(here,'evidence/protected-files.json'),JSON.stringify(protectedFiles,null,2));
const preserved={files:preservation.length,differences,scope:'Source, scripts, tests, public assets, ignored canonical masters, package/configuration, original asset provenance and legacy baseline. Ignored caches/generated build files are outside this comparison.'};
await fs.writeFile(path.join(here,'evidence/preservation.json'),JSON.stringify(preserved,null,2));
const resourceFiles=['arrival.html','plates.css','assets/inter.woff2','assets/space-grotesk.woff2','assets/defdef-resting.webp'];
const resources=[];
for(const name of resourceFiles){const b=await fs.readFile(path.join(here,name));resources.push({file:name,bytes:b.length,gzipBytes:zlib.gzipSync(b).length,sha256:hash(b)});}
await fs.writeFile(path.join(here,'evidence/design-checks.json'),JSON.stringify({scope:'Offline static design candidates only; not runtime or WCAG certification',checks,resources,preservation:preserved},null,2));
console.log(JSON.stringify({axeRuns:checks.filter(x=>x.violations).length,violations:checks.flatMap(x=>x.violations||[]),preservation:preserved,resources},null,2));
