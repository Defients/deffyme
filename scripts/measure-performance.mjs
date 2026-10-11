import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
const browser=await chromium.launch(),samples=[];
const baseURL=process.env.GATEHOUSE_URL??'http://127.0.0.1:4321/';
await mkdir('artifacts',{recursive:true});
async function stopTrace(cdp){
 const done=new Promise(resolve=>cdp.once('Tracing.tracingComplete',resolve));await cdp.send('Tracing.end');
 const {stream}=await done;let raw='';
 for(;;){const part=await cdp.send('IO.read',{handle:stream});raw+=part.base64Encoded?Buffer.from(part.data,'base64').toString():part.data;if(part.eof)break;}
 await cdp.send('IO.close',{handle:stream});return JSON.parse(raw);
}
function summarizeTrace(trace){
 const rendererThreads=new Set(trace.traceEvents.filter(e=>e.name==='thread_name'&&e.args?.name==='CrRendererMain').map(e=>`${e.pid}:${e.tid}`));
 return trace.traceEvents.filter(e=>e.ph==='X'&&e.name==='RunTask'&&e.dur>50000&&rendererThreads.has(`${e.pid}:${e.tid}`)).map(task=>({durationMs:task.dur/1000,thread:task.tid,
  overlappingWork:trace.traceEvents.filter(e=>e.ph==='X'&&e.pid===task.pid&&e.tid===task.tid&&e.ts>=task.ts&&e.ts<task.ts+task.dur&&/FunctionCall|EvaluateScript|Layout|Paint|Decode|ParseHTML|UpdateLayoutTree|Commit/.test(e.name)).sort((a,b)=>(b.dur??0)-(a.dur??0)).slice(0,12).map(e=>({name:e.name,durationMs:(e.dur??0)/1000,url:e.args?.data?.url??e.args?.data?.scriptName??null,functionName:e.args?.data?.functionName??null}))}));
}
function layoutEvidence(trace){
 const events=trace.traceEvents;
 return events.filter(e=>e.name==='Layout'&&e.dur>40000).map(e=>({durationMs:e.dur/1000,dirtyObjects:e.args?.beginData?.dirtyObjects,totalObjects:e.args?.beginData?.totalObjects,
  precedingFontCompletions:events.filter(f=>f.name==='ResourceFinish'&&f.ts<=e.ts&&e.ts-f.ts<30000).flatMap(f=>{
   const request=events.find(x=>x.name==='ResourceSendRequest'&&x.args?.data?.requestId===f.args?.data?.requestId);
   return request?.args?.data?.resourceType==='Font'?[{url:request.args.data.url,msBeforeLayout:(e.ts-f.ts)/1000}]:[];
  })}));
}
try{
 for(const profile of ['mobile','desktop'])for(let run=1;run<=3;run++){
  const context=await browser.newContext({viewport:profile==='mobile'?{width:390,height:844}:{width:1440,height:900},deviceScaleFactor:1});
  const page=await context.newPage(),cdp=await context.newCDPSession(page);
  await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
  if(profile==='mobile'){
   await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
   await cdp.send('Network.emulateNetworkConditions',{offline:false,downloadThroughput:1600000/8,uploadThroughput:750000/8,latency:150});
  }
  await page.addInitScript(()=>{
   window.__metrics={lcp:0,cls:0,longTasks:[],events:[]};
   new PerformanceObserver(l=>{for(const e of l.getEntries())window.__metrics.lcp=e.startTime;}).observe({type:'largest-contentful-paint',buffered:true});
   new PerformanceObserver(l=>{for(const e of l.getEntries())if(!e.hadRecentInput)window.__metrics.cls+=e.value;}).observe({type:'layout-shift',buffered:true});
   new PerformanceObserver(l=>{for(const e of l.getEntries())window.__metrics.longTasks.push({start:e.startTime,duration:e.duration,attribution:e.attribution.map(a=>({name:a.name,containerType:a.containerType,containerSrc:a.containerSrc}))});}).observe({type:'longtask',buffered:true});
   new PerformanceObserver(l=>{for(const e of l.getEntries())if(e.interactionId)window.__metrics.events.push({duration:e.duration,name:e.name,interactionId:e.interactionId});}).observe({type:'event',buffered:true,durationThreshold:16});
  });
  await cdp.send('Tracing.start',{categories:'devtools.timeline,disabled-by-default-devtools.timeline,toplevel',transferMode:'ReturnAsStream'});
  await page.goto(baseURL,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(400);
  const initial=await page.evaluate(()=>({...window.__metrics,
   resources:performance.getEntriesByType('resource').map(r=>({name:r.name,type:r.initiatorType,transferSize:r.transferSize,encodedBodySize:r.encodedBodySize,decodedBodySize:r.decodedBodySize})),
   document:performance.getEntriesByType('navigation').map(r=>({transferSize:r.transferSize,encodedBodySize:r.encodedBodySize,decodedBodySize:r.decodedBodySize}))[0],
   images:[...document.images].filter(i=>i.complete&&i.naturalWidth).map(i=>({src:i.currentSrc,width:i.naturalWidth,height:i.naturalHeight,decodedBytes:i.naturalWidth*i.naturalHeight*4})),
   homepageIslands:document.querySelectorAll('astro-island').length}));
  await page.locator('a[href="#directory"]').first().click();
  await page.locator('.creature-seam>summary').click();await page.locator('.creature-seam>summary').click();
  await page.locator('#directory a').first().hover();await page.locator('#directory a').first().focus();
  await page.locator('.preferences>summary').click();
  await page.locator('input[value="essential"]').check();await page.locator('input[value="balanced"]').check();await page.keyboard.press('Escape');await page.waitForTimeout(250);
  const journey=await page.evaluate(()=>({...window.__metrics,heap:performance.memory?.usedJSHeapSize??null,activeAnimations:document.getAnimations().length}));
  const trace=await stopTrace(cdp),tracePath=`artifacts/gatehouse-trace-${profile}-${run}.json`;await writeFile(tracePath,JSON.stringify(trace));
  const imageURLs=new Set(initial.images.map(i=>i.src));
  const art=initial.resources.filter(r=>imageURLs.has(r.name)||r.type==='img');
  const artBytes=art.reduce((n,r)=>n+r.encodedBodySize,0),decodedArtBytes=initial.images.reduce((n,i)=>n+i.decodedBytes,0),maxObservedInteractionMs=Math.max(0,...journey.events.map(e=>e.duration));
  const checks={lcp:initial.lcp>0&&initial.lcp<=2500,cls:journey.cls<=.1,interactions:maxObservedInteractionMs<=200,art:artBytes<=(profile==='mobile'?300:500)*1024,decodedArt:decodedArtBytes<=40*1048576,defdefDecoded:initial.images.filter(i=>i.src.includes('defdef')).every(i=>i.decodedBytes<=4*1048576),defdefEncoded:art.filter(r=>r.name.includes('defdef')).every(r=>r.encodedBodySize<=140*1024),noHomepageIslands:initial.homepageIslands===0};
  samples.push({profile,run,lcpMs:initial.lcp,cls:journey.cls,initialTransferBytes:initial.resources.reduce((n,r)=>n+r.transferSize,0)+(initial.document?.transferSize??0),artBytes,decodedArtBytes,maxObservedInteractionMs,initial,longTasks:journey.longTasks,interactionDurations:journey.events,heapBytes:journey.heap,activeAnimationsAfterJourney:journey.activeAnimations,tracePath,traceLongTasks:summarizeTrace(trace),rendererLayoutEvidence:layoutEvidence(trace),checks});
  await context.close();
 }
 const report={date:'2026-10-10',timezone:'America/New_York',runtime:process.version,browser:browser.version(),baseURL,profile:'Three cold contexts per profile, cache disabled. Mobile: 390x844 DPR1, 4x CPU, 1.6Mbps down / 750Kbps up / 150ms latency. Desktop: 1440x900 DPR1, unthrottled localhost.',scope:'Local lab observations, not field p75, field INP, production hosting or real-device certification. Event Timing threshold is 16ms: empty events mean below threshold, not a measured zero. Image memory is dimensions x 4. Traces show overlapping work, not proof of one causal function. Historical mobile long tasks cannot be retroactively attributed from old observer data.',journey:'Request Access anchor, Creature disclosure open/close, first directory link hover/focus, settings Essential/Balanced, Escape.',samples,pass:samples.every(s=>Object.values(s.checks).every(Boolean))};
 report.longTaskInvestigation={status:samples.some(s=>s.longTasks.length||s.traceLongTasks.length)?'OPEN':'NO_LONG_TASK_OBSERVED',historicalEvidence:'October 8 observer-only evidence has no renderer trace; exact historical cause cannot be established.',currentEvidence:samples.filter(s=>s.profile==='mobile').map(s=>({run:s.run,observer:s.longTasks,rendererLayouts:s.rendererLayoutEvidence})),interpretation:'Document Layout and nearby font completion provide correlation evidence, not proof of one causal function. Initial renderer work can appear in the trace before observer reporting. Target metrics passing does not clear the decorative-task budget when long tasks remain.'};
 await writeFile('artifacts/gatehouse-performance.json',JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({pass:report.pass,samples:samples.map(({profile,run,lcpMs,cls,artBytes,decodedArtBytes,maxObservedInteractionMs,longTasks,checks,traceLongTasks})=>({profile,run,lcpMs,cls,artKiB:artBytes/1024,decodedArtMiB:decodedArtBytes/1048576,maxObservedInteractionMs,longTaskCount:longTasks.length,traceLongTasks,checks}))},null,2));
 if(!report.pass)process.exitCode=1;
}finally{await browser.close();}
