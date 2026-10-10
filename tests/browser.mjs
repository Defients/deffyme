import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { mkdir,writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const base='http://127.0.0.1:4321';
await mkdir('artifacts/screenshots',{recursive:true});
const browser=await chromium.launch({headless:true});
const results=[],errors=[],externalRequests=new Set();
const run=async(name,fn)=>{try{const detail=await fn();results.push({name,pass:true,detail});console.log('PASS '+name);}catch(e){results.push({name,pass:false,error:String(e)});console.error('FAIL '+name+' '+e.message);}};
const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
const readyForScreenshot=async()=>{
 await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});
 await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
};
page.on('request',r=>{if(!r.url().startsWith(base)&&!r.url().startsWith('data:'))externalRequests.add(r.url());});
await run('desktop renders static identity and two scenes',async()=>{
 const response=await page.goto(base);assert.equal(response.status(),200);await page.evaluate(()=>document.fonts.ready);
 assert.match(await page.locator('h1').innerText(),/Welcome/);assert.equal(await page.locator('main>section').count(),2);
 await readyForScreenshot();
 await page.screenshot({path:'artifacts/screenshots/home-desktop-1440.png'});
 await page.screenshot({path:'artifacts/screenshots/home-desktop-full.png',fullPage:true});
});
await run('native note opens and all interest disclosures work',async()=>{
 const note=page.locator('.desk-note');await note.locator('summary').click();assert.equal(await note.getAttribute('open'),'');assert.match(await note.innerText(),/Complications: ideas/);await note.locator('summary').click();
 for(const disclosure of await page.locator('.interest-disclosure').all()){await disclosure.locator('summary').click();assert.equal(await disclosure.getAttribute('open'),'');await disclosure.locator('summary').click();}
});
await run('keyboard skip link and settings Escape restoration',async()=>{
 await page.goto(base);await page.keyboard.press('Tab');assert.equal(await page.locator(':focus').innerText(),'Skip to content');await page.keyboard.press('Enter');assert.equal(await page.locator(':focus').getAttribute('id'),'main');
 await page.locator('.preferences>summary').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('.preferences').getAttribute('open'),'');
 await page.keyboard.press('Escape');assert.equal(await page.locator('.preferences').getAttribute('open'),null);assert.equal(await page.locator(':focus').getAttribute('aria-label'),'Experience settings');
});
await run('motion preferences persist and system reduction wins at runtime',async()=>{
 await page.locator('.preferences>summary').click();await page.getByRole('radio',{name:/Full/}).check();assert.equal(await page.locator('html').getAttribute('data-motion'),'full');
 await page.reload();assert.equal(await page.locator('html').getAttribute('data-motion'),'full');
 await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>document.documentElement.dataset.motion==='essential');
 const animation=await page.locator('.interest-disclosure svg').first().evaluate(el=>getComputedStyle(el).transitionDuration);assert.equal(animation,'0s');
 await page.screenshot({path:'artifacts/screenshots/home-reduced-motion.png'});
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.locator('.preferences>summary').click();await page.getByRole('radio',{name:/Balanced/}).check();await page.keyboard.press('Escape');
});
await run('desktop accessibility scan',async()=>{
 await page.goto(base);const report=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
 await writeFile('artifacts/axe-desktop.json',JSON.stringify(report.violations,null,2));assert.deepEqual(report.violations.map(v=>v.id),[]);return {violations:report.violations.length,incomplete:report.incomplete.map(v=>v.id)};
});
for(const width of [1920,768,390,320]){
 await run('layout and accessible navigation at '+width+'px',async()=>{
  await page.setViewportSize({width,height:width>1000?1080:844});await page.goto(base);await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,'horizontal overflow');
  if(width<=950){
   const summary=page.locator('.mobile-nav>summary');await summary.focus();await page.keyboard.press('Enter');assert.equal(await page.locator('.mobile-nav').getAttribute('open'),'');
   await page.keyboard.press('Escape');assert.equal(await page.locator('.mobile-nav').getAttribute('open'),null);assert.equal(await summary.evaluate(el=>el===document.activeElement),true);
  }
  await readyForScreenshot();
  await page.screenshot({path:'artifacts/screenshots/home-'+width+'.png',fullPage:true});
  if(width===390){await page.screenshot({path:'artifacts/screenshots/home-mobile-390.png'});const report=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();await writeFile('artifacts/axe-mobile.json',JSON.stringify(report.violations,null,2));assert.deepEqual(report.violations.map(v=>v.id),[]);}
 });
}
await run('200 percent text reflow at 390px',async()=>{
 await page.setViewportSize({width:390,height:844});await page.goto(base);
 // Double each computed baseline once, avoiding inherited exponential scaling.
 await page.evaluate(()=>{
  const nodes=[...document.querySelectorAll('body *')].map(el=>[el,parseFloat(getComputedStyle(el).fontSize)]);
  for(const [el,size] of nodes)if(!el.closest('[aria-hidden="true"]'))el.style.fontSize=size*2+'px';
 });
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
 assert.equal(await page.evaluate(()=>document.querySelector('.desk-note').getBoundingClientRect().bottom<=document.querySelector('.hero-bottom').getBoundingClientRect().top),true,'note overlaps the scene navigation at enlarged text size');
 await page.screenshot({path:'artifacts/screenshots/home-text-200.png',fullPage:true});
});
await run('static routes, internal links and output exclusions',async()=>{
 const routes=['/','/story/','/forge/','/astrizda/','/now/','/music/','/connect/','/site-privacy/'];
 for(const route of routes){
  const response=await page.goto(base+route);assert.equal(response.status(),200,route);
  const html=await response.text();assert.doesNotMatch(html,/PRIVATE_CANARY_NEVER_PUBLIC|Priscilla|Sodapoppin|approvedRevisionHash|C:\\Users/);
  for(const href of await page.locator('a[href]').evaluateAll(links=>links.map(a=>a.getAttribute('href')))){
   if(href.startsWith('/')&&!href.startsWith('//')){const target=new URL(href,base);assert.equal((await page.request.get(base+target.pathname)).status(),200,target.pathname);}
  }
 }
 for(const path of ['/docs/legacy-baseline.json','/authoring/stories/canary.json','/design/masters/headquarters.png','/projects/story/','/dm/','/story/archives/canary/'])assert.equal((await page.request.get(base+path)).status(),404,path);
 await page.goto(base+'/music/');assert.equal(await page.locator('audio,video').count(),0);
});
await run('selective React project filter and browser history',async()=>{
 await page.goto(base+'/forge/?category=Game');await page.getByRole('button',{name:'All projects',exact:true}).waitFor();await page.waitForFunction(()=>document.querySelectorAll('.project-row').length===1);
 assert.match(await page.locator('.project-row').innerText(),/Intrilex/);
 await page.getByRole('button',{name:'Software',exact:true}).click();assert.match(await page.locator('.project-row').innerText(),/MADchatter/);assert.match(page.url(),/category=Software/);
 await page.goBack();assert.match(await page.locator('.project-row').innerText(),/Intrilex/);
 await page.getByRole('button',{name:'All projects',exact:true}).click();assert.equal(await page.locator('.project-row').count(),3);
 const report=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(report.violations.map(v=>v.id),[]);
 await page.screenshot({path:'artifacts/screenshots/forge-desktop.png',fullPage:true});
});
await run('no JavaScript reading, menu, disclosure and project fallback',async()=>{
 const ctx=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const p=await ctx.newPage();await p.goto(base);
 assert.match(await p.locator('h1').innerText(),/Welcome/);await p.locator('.mobile-nav>summary').click();assert.equal(await p.locator('.mobile-nav').getAttribute('open'),'');await p.locator('.mobile-nav>summary').click();
 await p.locator('.desk-note>summary').click();assert.match(await p.locator('.desk-note').innerText(),/Finish one thing/);
 await p.goto(base+'/forge/');assert.equal(await p.locator('.project-row').count(),3);await ctx.close();
});
await run('blocked storage and image failures keep navigation usable',async()=>{
 const ctx=await browser.newContext({viewport:{width:390,height:844}});await ctx.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('Denied');}});});
 await ctx.route('**/rebirth-assets/**',r=>r.abort());const p=await ctx.newPage();const failures=[];p.on('pageerror',e=>failures.push(e.message));await p.goto(base);
 assert.match(await p.locator('h1').innerText(),/Welcome/);await p.locator('.preferences>summary').click();await p.getByRole('radio',{name:/Essential/}).check();assert.equal(await p.locator('html').getAttribute('data-motion'),'essential');assert.deepEqual(failures,[]);await ctx.close();
});
await run('font failure preserves readable mobile layout',async()=>{
 const ctx=await browser.newContext({viewport:{width:390,height:844}});await ctx.route('**/*.woff2',r=>r.abort());const p=await ctx.newPage();await p.goto(base);
 assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
 assert.match(await p.locator('h1').innerText(),/Welcome/);await p.locator('.mobile-nav>summary').click();assert.equal(await p.getByRole('navigation',{name:'Mobile navigation'}).isVisible(),true);
 await p.screenshot({path:'artifacts/screenshots/font-fallback.png',fullPage:true});await ctx.close();
});
await run('identity glyphs use the supplied local fonts',async()=>{
 await page.setViewportSize({width:1440,height:900});await page.goto(base);await readyForScreenshot();
 await page.evaluate(()=>{
  const host=document.createElement('div');host.id='glyph-check';host.style.cssText='position:fixed;inset:100px 40px auto;background:#19151f;padding:30px;z-index:100;font-size:30px';
  for(const font of ['Inter','Space Grotesk']){const p=document.createElement('p');p.style.fontFamily='"'+font+'"';p.textContent='Deffy · Ðeffy · Klÿz · Klÿ(+) · Vælix · Astrizda —';host.append(p);}document.body.append(host);
 });
 await page.evaluate(()=>document.fonts.ready);
 const session=await context.newCDPSession(page);await session.send('DOM.enable');await session.send('CSS.enable');
 const {root}=await session.send('DOM.getDocument');const {nodeIds}=await session.send('DOM.querySelectorAll',{nodeId:root.nodeId,selector:'#glyph-check p'});
 const fonts=[];for(const nodeId of nodeIds){const result=await session.send('CSS.getPlatformFontsForNode',{nodeId});assert.ok(result.fonts.every(f=>f.isCustomFont),'unexpected identity glyph fallback');fonts.push(result.fonts);}
 await page.screenshot({path:'artifacts/screenshots/identity-glyphs.png'});await page.locator('#glyph-check').evaluate(e=>e.remove());await session.detach();return {fonts};
});
await run('zero external homepage requests and runtime errors',async()=>{assert.deepEqual([...externalRequests],[]);assert.deepEqual(errors,[]);});
await browser.close();
const report={date:'2026-10-08',browser:'Chromium '+browser.version(),results,passed:results.filter(r=>r.pass).length,failed:results.filter(r=>!r.pass).length,limitations:['Emulation is not physical iOS/Android testing.','Automated accessibility and scripted keyboard checks are not screen-reader certification.','No production hosting or live service delivery was tested.']};
await writeFile('artifacts/browser-validation.json',JSON.stringify(report,null,2));console.log(JSON.stringify({passed:report.passed,failed:report.failed}));if(report.failed)process.exitCode=1;
