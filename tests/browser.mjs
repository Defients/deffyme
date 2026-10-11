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
const destinations=['/story/','/forge/','/astrizda/','/forge/?category=Game','/music/','/now/'];
const checkDirectory=async p=>{
 assert.deepEqual(await p.locator('.destination-link').evaluateAll(links=>links.map(a=>a.getAttribute('href'))),destinations);
 assert.match(await p.locator('.gatehouse').innerText(),/Defdef/);assert.match(await p.locator('.gatehouse').innerText(),/Deffy/);
 assert.ok(await p.locator('.gatehouse-defdef').getAttribute('alt'),'meaningful character alt');
};
const axe=async(p,name)=>{
 const report=await new AxeBuilder({page:p}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
 await writeFile('artifacts/gatehouse-axe-'+name+'.json',JSON.stringify({violations:report.violations,incomplete:report.incomplete.map(v=>v.id)},null,2));
 assert.deepEqual(report.violations.map(v=>v.id),[]);return {violations:report.violations.length,incomplete:report.incomplete.map(v=>v.id)};
};
const readyForScreenshot=async()=>{
 await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});
 await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
};
page.on('request',r=>{if(!r.url().startsWith(base)&&!r.url().startsWith('data:'))externalRequests.add(r.url());});
await run('desktop renders Gatehouse identity and six direct destinations',async()=>{
 const response=await page.goto(base);assert.equal(response.status(),200);await page.evaluate(()=>document.fonts.ready);
 await checkDirectory(page);assert.equal(await page.locator('.gatehouse').count(),1);
 await readyForScreenshot();
 await page.screenshot({path:'artifacts/screenshots/gatehouse-home-desktop-1440.png'});
 await page.screenshot({path:'artifacts/screenshots/gatehouse-home-desktop-full.png',fullPage:true});
});
await run('native Creature disclosure opens and Escape restores summary focus',async()=>{
 const seam=page.locator('.creature-seam');const summary=seam.locator('summary');
 await summary.focus();await page.keyboard.press('Enter');assert.equal(await seam.getAttribute('open'),'');
 assert.match(await seam.innerText(),/THE CREATURE OF THE INTERNET/);assert.equal(await seam.locator('a[href="/story/"]').count(),1);
 await page.screenshot({path:'artifacts/screenshots/gatehouse-home-creature-expanded.png',fullPage:true});await axe(page,'creature-expanded');
 await page.keyboard.press('Escape');assert.equal(await seam.getAttribute('open'),null);assert.equal(await summary.evaluate(el=>el===document.activeElement),true);
});
await run('both invitations focus directory and legacy meet reaches human gateway',async()=>{
 for(const name of [/Request Access/,/Just Looking Around/]){
  await page.goto(base);const invitation=page.getByRole('link',{name});assert.equal(await invitation.getAttribute('href'),'#directory');
  await invitation.focus();await page.keyboard.press('Enter');assert.equal(await page.locator(':focus').getAttribute('id'),'directory');
 }
 await page.goto(base+'/#meet');assert.equal(await page.locator('#meet').count(),1);
 const human=page.locator('#meet');assert.equal(await human.getAttribute('href'),'/story/');await human.click();assert.equal(new URL(page.url()).pathname,'/story/');
 assert.match(await page.locator('main').innerText(),/Deffy/);assert.equal(await page.locator('.creature-seam,.gatehouse').count(),0);
 await page.screenshot({path:'artifacts/screenshots/gatehouse-story-desktop.png',fullPage:true});await axe(page,'story');
});
await run('six destinations navigate directly, including native modified click',async()=>{
 for(let i=0;i<destinations.length;i++){
  await page.goto(base);const responsePromise=page.waitForResponse(r=>r.request().isNavigationRequest());await page.locator('.destination-link').nth(i).click();const response=await responsePromise;
  assert.equal(response.status(),200);assert.equal(new URL(page.url()).pathname+new URL(page.url()).search,destinations[i]);
  if(destinations[i].includes('category=Game')){await page.waitForFunction(()=>document.querySelectorAll('.project-row').length===1);assert.match(await page.locator('.project-row').innerText(),/Intrilex/);}
  await axe(page,'destination-'+i);
 }
 await page.goto(base);const popupPromise=context.waitForEvent('page');await page.locator('.destination-link').first().click({modifiers:['ControlOrMeta']});const popup=await popupPromise;
 await popup.waitForLoadState();assert.equal(new URL(popup.url()).pathname,'/story/');assert.equal(new URL(page.url()).pathname,'/');await popup.close();
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
 const animations=await page.locator('.gatehouse').evaluate(el=>el.getAnimations({subtree:true}).filter(a=>a.playState==='running').length);assert.equal(animations,0);
 await page.screenshot({path:'artifacts/screenshots/gatehouse-home-reduced-motion.png'});
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.locator('.preferences>summary').click();await page.getByRole('radio',{name:/Balanced/}).check();await page.keyboard.press('Escape');
});
await run('desktop accessibility scan',async()=>{
 await page.goto(base);return axe(page,'desktop');
});
await run('settings and keyboard destination focus remain readable',async()=>{
 await page.goto(base);await page.locator('.preferences>summary').click();await axe(page,'settings-expanded');await page.keyboard.press('Escape');
 const first=page.locator('.destination-link').first();await first.focus();assert.equal(await first.evaluate(el=>el===document.activeElement),true);
 const focus=await first.evaluate(el=>({outline:getComputedStyle(el).outlineStyle,width:parseFloat(getComputedStyle(el).outlineWidth)}));assert.notEqual(focus.outline,'none');assert.ok(focus.width>=2);
 await page.screenshot({path:'artifacts/screenshots/gatehouse-home-keyboard-focus.png',fullPage:true});
});
for(const width of [1920,1440,768,390,320]){
 await run('layout and accessible navigation at '+width+'px',async()=>{
  await page.setViewportSize({width,height:width>1000?1080:844});await page.goto(base);await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,'horizontal overflow');
  await checkDirectory(page);
  for(const link of await page.locator('.destination-link').all()){const box=await link.boundingBox();assert.ok(box.width>=44&&box.height>=44,'destination target below 44px');}
  if(width<=950){
   const summary=page.locator('.mobile-nav>summary');await summary.focus();await page.keyboard.press('Enter');assert.equal(await page.locator('.mobile-nav').getAttribute('open'),'');
   await page.keyboard.press('Escape');assert.equal(await page.locator('.mobile-nav').getAttribute('open'),null);assert.equal(await summary.evaluate(el=>el===document.activeElement),true);
  }
  // Capture the resting composition; focused navigation has separate evidence.
  await page.evaluate(()=>document.activeElement?.blur());
  await readyForScreenshot();
  await page.screenshot({path:'artifacts/screenshots/gatehouse-home-'+width+'.png',fullPage:true});
  if(width===390){await page.screenshot({path:'artifacts/screenshots/gatehouse-home-mobile-390.png'});await axe(page,'mobile');await page.locator('.mobile-nav>summary').click();await axe(page,'mobile-navigation');await page.keyboard.press('Escape');await page.locator('.creature-seam>summary').click();await axe(page,'mobile-creature-expanded');await page.screenshot({path:'artifacts/screenshots/gatehouse-home-mobile-creature-expanded.png',fullPage:true});}
 });
}
await run('Story remains a calm readable page on mobile',async()=>{
 await page.setViewportSize({width:390,height:844});await page.goto(base+'/story/');
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
 assert.equal(await page.locator('.gatehouse,.creature-seam').count(),0);assert.match(await page.locator('main').innerText(),/Defdef is a character/);
 await readyForScreenshot();await page.screenshot({path:'artifacts/screenshots/gatehouse-story-mobile-390.png',fullPage:true});await axe(page,'story-mobile');
});
await run('200 percent text reflow at 390px',async()=>{
 await page.setViewportSize({width:390,height:844});await page.goto(base);
 // Double each computed baseline once, avoiding inherited exponential scaling.
 await page.evaluate(()=>{
  const nodes=[...document.querySelectorAll('body *')].map(el=>[el,parseFloat(getComputedStyle(el).fontSize)]);
  for(const [el,size] of nodes)if(!el.closest('[aria-hidden="true"]'))el.style.fontSize=size*2+'px';
 });
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
 await checkDirectory(page);
 const targets=await page.locator('.destination-link').evaluateAll(links=>links.map(a=>({text:a.innerText,height:a.getBoundingClientRect().height,scroll:a.scrollHeight})));
 assert.ok(targets.every(t=>t.height+1>=t.scroll),'destination text clipped');await axe(page,'text-200');
 const boxes=await page.evaluate(()=>Object.fromEntries(['.site-header','.gatehouse-arrival','.gatehouse-station','.station-heading','.station-counter','.gatehouse-directory'].map(selector=>{const r=document.querySelector(selector).getBoundingClientRect();return [selector,{top:r.top,bottom:r.bottom}];})));
 assert.ok(boxes['.site-header'].bottom<=boxes['.gatehouse-arrival'].top,'header overlaps arrival');
 assert.ok(boxes['.gatehouse-arrival'].bottom<=boxes['.gatehouse-station'].top,'arrival overlaps station');
 assert.ok(boxes['.station-heading'].bottom<=boxes['.station-counter'].top,'station title overlaps counter');
 assert.ok(boxes['.gatehouse-station'].bottom<=boxes['.gatehouse-directory'].top,'station overlaps directory');
 await page.screenshot({path:'artifacts/screenshots/gatehouse-home-text-200.png',fullPage:true});
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
 await page.screenshot({path:'artifacts/screenshots/gatehouse-forge-desktop.png',fullPage:true});
});
for(const width of [320,390])await run('Forge reflows at '+width+'px',async()=>{
 await page.setViewportSize({width,height:844});await page.goto(base+'/forge/?category=Game');await page.waitForFunction(()=>document.querySelectorAll('.project-row').length===1);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,'Forge horizontal overflow');await axe(page,'forge-'+width);
 await readyForScreenshot();await page.screenshot({path:'artifacts/screenshots/gatehouse-forge-'+width+'.png',fullPage:true});
});
await run('no JavaScript reading, menu, disclosure and project fallback',async()=>{
 const ctx=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const p=await ctx.newPage();await p.goto(base);
 await checkDirectory(p);await p.locator('.mobile-nav>summary').click();assert.equal(await p.locator('.mobile-nav').getAttribute('open'),'');await p.locator('.mobile-nav>summary').click();
 // axe injects scripts and cannot initialize in a JavaScript-disabled context.
 // Equivalent static DOM/disclosure states receive axe scans in enabled contexts above.
 await p.locator('.creature-seam>summary').click();assert.equal(await p.locator('.creature-seam').getAttribute('open'),'');
 for(let i=0;i<destinations.length;i++){await p.goto(base);await p.locator('.destination-link').nth(i).click();assert.equal(new URL(p.url()).pathname+new URL(p.url()).search,destinations[i]);assert.ok((await p.locator('h1').innerText()).length);}
 await p.goto(base+'/forge/');assert.equal(await p.locator('.project-row').count(),3);await ctx.close();
});
await run('blocked storage and image failures keep navigation usable',async()=>{
 const ctx=await browser.newContext({viewport:{width:390,height:844}});await ctx.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('Denied');}});});
 await ctx.route('**/rebirth-assets/**',r=>r.abort());const p=await ctx.newPage();const failures=[];p.on('pageerror',e=>failures.push(e.message));await p.goto(base);
 await checkDirectory(p);await p.locator('.preferences>summary').click();await p.getByRole('radio',{name:/Essential/}).check();assert.equal(await p.locator('html').getAttribute('data-motion'),'essential');await p.keyboard.press('Escape');await p.locator('.destination-link').first().click();assert.equal(new URL(p.url()).pathname,'/story/');assert.deepEqual(failures,[]);await ctx.close();
});
await run('font failure preserves readable mobile layout',async()=>{
 const ctx=await browser.newContext({viewport:{width:390,height:844}});await ctx.route('**/*.woff2',r=>r.abort());const p=await ctx.newPage();await p.goto(base);
 assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
 await checkDirectory(p);await p.locator('.mobile-nav>summary').click();assert.equal(await p.getByRole('navigation',{name:'Mobile navigation'}).isVisible(),true);
 await p.screenshot({path:'artifacts/screenshots/gatehouse-font-fallback.png',fullPage:true});await ctx.close();
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
 await page.screenshot({path:'artifacts/screenshots/gatehouse-identity-glyphs.png'});await page.locator('#glyph-check').evaluate(e=>e.remove());await session.detach();return {fonts};
});
await run('zero external homepage requests and runtime errors',async()=>{assert.deepEqual([...externalRequests],[]);assert.deepEqual(errors,[]);});
await browser.close();
const report={date:'2026-10-10',browser:'Chromium '+browser.version(),results,passed:results.filter(r=>r.pass).length,failed:results.filter(r=>!r.pass).length,limitations:['Emulation is not physical iOS/Android testing.','Automated accessibility and scripted keyboard checks are not screen-reader certification.','No production hosting or live service delivery was tested.','Owner visual acceptance and unfamiliar-visitor comprehension require human review.']};
await writeFile('artifacts/gatehouse-browser-validation.json',JSON.stringify(report,null,2));console.log(JSON.stringify({passed:report.passed,failed:report.failed}));if(report.failed)process.exitCode=1;
