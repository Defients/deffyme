import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
const browser=await chromium.launch();
const samples=[];
for(const profile of ['mobile','desktop']){
 for(let run=1;run<=3;run++){
  const context=await browser.newContext({viewport:profile==='mobile'?{width:390,height:844}:{width:1440,height:900},deviceScaleFactor:1});
  const page=await context.newPage();const cdp=await context.newCDPSession(page);
  await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
  if(profile==='mobile'){
   await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
   await cdp.send('Network.emulateNetworkConditions',{offline:false,downloadThroughput:1600000/8,uploadThroughput:750000/8,latency:150});
  }
  await page.addInitScript(()=>{
   window.__metrics={lcp:0,cls:0,longTasks:[],events:[]};
   new PerformanceObserver(l=>{for(const e of l.getEntries())window.__metrics.lcp=e.startTime;}).observe({type:'largest-contentful-paint',buffered:true});
   new PerformanceObserver(l=>{for(const e of l.getEntries())if(!e.hadRecentInput)window.__metrics.cls+=e.value;}).observe({type:'layout-shift',buffered:true});
   new PerformanceObserver(l=>{for(const e of l.getEntries())window.__metrics.longTasks.push({start:e.startTime,duration:e.duration});}).observe({type:'longtask',buffered:true});
   new PerformanceObserver(l=>{for(const e of l.getEntries())if(e.interactionId)window.__metrics.events.push({duration:e.duration,name:e.name});}).observe({type:'event',buffered:true,durationThreshold:16});
  });
  await page.goto('http://127.0.0.1:4321/',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
  // A bounded collection interval is needed for paint and interaction observers to deliver.
  await page.waitForTimeout(400);
  const initial=await page.evaluate(()=>({
   ...window.__metrics,
   resources:performance.getEntriesByType('resource').map(r=>({name:r.name.split('/').pop(),transferSize:r.transferSize,encodedBodySize:r.encodedBodySize,decodedBodySize:r.decodedBodySize,type:r.initiatorType})),
   document:performance.getEntriesByType('navigation').map(r=>({transferSize:r.transferSize,encodedBodySize:r.encodedBodySize,decodedBodySize:r.decodedBodySize}))[0],
   imageMemory:[...document.images].filter(i=>i.complete).reduce((n,i)=>n+i.naturalWidth*i.naturalHeight*4,0),
  }));
  await page.locator('.desk-note>summary').click();await page.locator('.desk-note>summary').click();
  await page.locator('#meet').scrollIntoViewIfNeeded();await page.locator('.interest-disclosure>summary').first().click();await page.waitForTimeout(250);
  const journey=await page.evaluate(()=>({...window.__metrics,heap:performance.memory?.usedJSHeapSize??null,activeAnimations:document.getAnimations().length}));
  const bytes=initial.resources.reduce((n,r)=>n+r.transferSize,0)+(initial.document?.transferSize??0);
  samples.push({profile,run,lcpMs:initial.lcp,cls:initial.cls,initialTransferBytes:bytes,initial,longTasks:journey.longTasks,interactionDurations:journey.events,heapBytes:journey.heap,activeAnimationsAfterJourney:journey.activeAnimations});
  await context.close();
 }
}
const report={date:'2026-10-08',runtime:process.version,browser:browser.version(),profile:'Mobile: 390×844, DPR 1, 4x CPU, 1.6Mbps down / 750Kbps up / 150ms latency. Desktop: 1440×900, unthrottled localhost. Cold browser contexts and cache disabled.',scope:'Local lab observations, not field p75, production hosting performance, or real-device certification. Network entries expose actual encoded transfer and decoded bytes; compare those before inferring compression. performance.memory is a coarse browser estimate, not process working set.',samples};
await mkdir('artifacts',{recursive:true});await writeFile('artifacts/performance.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(samples.map(({profile,run,lcpMs,cls,initialTransferBytes,heapBytes,interactionDurations,longTasks})=>({profile,run,lcpMs,cls,initialTransferKiB:(initialTransferBytes/1024).toFixed(1),heapMiB:(heapBytes/1048576).toFixed(1),maxObservedInteractionMs:Math.max(0,...interactionDurations.map(i=>i.duration)),longTasks:longTasks.length})),null,2));
await browser.close();
