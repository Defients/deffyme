// Offline authoring only. Generated plates contain no scripts, handlers or
// animation. Derives the fusion plates from the frozen Signal Loom plates by
// string transforms; canonical art is referenced, never copied.
//
// Measured anchors (see analyze.mjs output / evidence/fracture-crop.png):
//  - Painted red fracture in signal-loom-desktop.webp: bbox x1481-1565, y88-256.
//  - Signature claw tip in defdef-resting.webp: (137,426) image px -> scene
//    viewBox (1180,636) given .character{left:64.5%;bottom:28.2%;width:17%}.
//  - Platform floor under the claw goes dark at viewBox y~690.
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url));
const loom=path.join(here,'..','phase1-v2-refinement');
const A='../phase1-v2-refinement/assets/';
const STRIP='Phase 1 V2.2 fusion review · Signal Loom fusion correction · static review study · October 11, 2026';
const LOOM_STRIP='Phase 1 refinement · Signal Loom · static review candidate · October 10, 2026';
const ALT='Defdef, the crowned violet-edged creature, standing at his signal station.';

// ---- shared overlay fragments (viewBox 0 0 1672 941) ----
const CLAW_X=1180,CLAW_TIP_Y=636,NODE_Y=700;
const shadow=`<svg class="shadow" viewBox="0 0 1672 941" aria-hidden="true"><defs><radialGradient id="foot-shade"><stop offset="0" stop-color="#000" stop-opacity=".55"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs><ellipse cx="1220" cy="688" rx="100" ry="13" fill="url(#foot-shade)"/></svg>`;
const STEPPED='M1558 90L1558 96L1542 96L1542 120L1524 120L1524 132L1517 132L1517 148L1547 148L1547 160L1512 160L1512 172L1543 172L1543 184L1517 184L1517 196L1483 196L1483 208L1539 208L1539 220L1515 220L1515 232L1542 232L1542 256';
// torn scanline rects: [x,y,w,h] idle = displaced 6-18 off the stepped line;
// aligned = the same fragments snapped onto the line (offset 0).
const TORNS=[
 [[1530,101,9,3],[1542,100,9,3]],
 [[1563,137,8,3],[1548,136,8,3]],
 [[1496,165,10,3],[1512,165,10,3]],
 [[1561,179,7,4],[1546,179,7,4]],
 [[1467,200,11,3],[1483,201,11,3]],
 [[1554,215,8,2],[1539,215,8,2]],
 [[1501,243,10,3],[1517,244,10,3]],
 [[1559,252,6,4],[1542,252,6,4]],
];
// dropout columns below the fracture: [x, [y,h,opacity]...] idle=3 segments,
// response ~1/3 of total descent, ack/settled removed.
const COLS=[
 [1495,[[262,38,.9],[306,28,.6],[340,22,.35]]],
 [1528,[[264,44,.9],[314,30,.6],[350,26,.35]]],
 [1551,[[260,34,.9],[300,26,.6]]],
 [1520,[[266,40,.9],[312,24,.6],[342,18,.35]]],
];
function anomaly(mode){ // mode: displaced | snapped | aligned
 const rects=TORNS.map(t=>{const p=mode==='displaced'?t[0]:t[1];return `<rect x="${p[0]}" y="${p[1]}" width="${p[2]}" height="${p[3]}" fill="#ff3b4e"/>`;}).join('');
 let cols='';
 if(mode!=='aligned'){
  cols=COLS.map(([x,segs])=>{
   const use=mode==='displaced'?segs:segs.slice(0,1).map(s=>[s[0],Math.round(s[1]/3),s[2]]);
   return use.map(s=>`<rect x="${x}" y="${s[0]}" width="2.5" height="${s[1]}" fill="#ff3b4e" fill-opacity="${s[2]}"/>`).join('');
  }).join('');
 }
 return `<svg class="anomaly" viewBox="0 0 1672 941" aria-hidden="true"><path class="crack" d="${STEPPED}" fill="none" stroke="#ff3b4e" stroke-width="2.5" stroke-linejoin="miter"/>${rects}${cols}</svg>`;
}
// junction node (ellipse 26x9) + stub to 8 units below claw tip
function junction(lit){
 const stroke=lit?'#ffe2a6':'#5e4d6e';
 const stub=lit?`<path d="M${CLAW_X} ${CLAW_TIP_Y+8}V${NODE_Y-4}" stroke="#ffe2a6" stroke-width="2.5"/>`:'';
 // crown beside the node, below the floor trace so the trace never touches it
 const crown=lit?`<path d="M16 26l10-16 14 13 10-17 10 17 14-13 10 16v7H16z" transform="translate(1205 712) scale(1.04 .7)" fill="none" stroke="#ffe2a6" stroke-width="2.5"/>`:'';
 return `<svg class="junction" viewBox="0 0 1672 941" aria-hidden="true">${stub}<ellipse cx="${CLAW_X}" cy="${NODE_Y}" rx="13" ry="4.5" fill="#17131e" stroke="${stroke}" stroke-width="2"/>${crown}</svg>`;
}
// acknowledgment trace: painted-brass-disambiguated gold trace, below character
const TRACE_FULL='M1507 200C1519 309 1421 370 1365 478S1275 556 1198 636C1240 668 1300 678 1318 692L1194 700';
const TRACE_HALF='M1507 200C1519 309 1421 370 1365 478S1300 542 1240 600';
function trace(mode){ // mode: none | half | full | settled
 if(mode==='none')return '';
 const d=mode==='half'?TRACE_HALF:TRACE_FULL;
 const op=mode==='settled'?' opacity=".45"':'';
 return `<svg class="trace" viewBox="0 0 1672 941" aria-hidden="true"><g${op}><path d="${d}" fill="none" stroke="#ffe2a6" stroke-width="7" opacity=".25"/><path d="${d}" fill="none" stroke="#ffe2a6" stroke-width="2.5" stroke-dasharray="14 6"/></g></svg>`;
}
function frag(state){
 const c=(state==='ack'||state==='settled')?'#ffe2a6':'#ff3b4e';
 return `<svg class="frag" viewBox="0 0 40 30" aria-hidden="true"><path d="M34 3v5h-9v6h-6v6h8v4h-13" fill="none" stroke="${c}" stroke-width="3"/></svg>`;
}
const sceneOverlays={
 arrival:{anomaly:'displaced',junction:false,trace:'none'},
 idle:{anomaly:'displaced',junction:false,trace:'none'},
 action:{anomaly:'displaced',junction:false,trace:'none'},
 response:{anomaly:'snapped',junction:false,trace:'half'},
 ack:{anomaly:'aligned',junction:true,trace:'full'},
 settled:{anomaly:'aligned',junction:true,trace:'settled'},
};
const notes={
 arrival:'ARRIVAL: the anomaly and the dim floor junction are already present at his signal station; no trace. Static frozen state; no animation, timer or pointer tracking. Character agency is authored fiction; no autonomous intelligence is implied.',
 idle:'IDLE: stable indefinitely. The painted fracture carries a displaced digital anomaly; the claw junction is dim. No animation, sound, timer or pointer tracking. Character agency is authored fiction; no autonomous intelligence is implied.',
 action:'ACTION: one deliberate activation. The anomaly stays displaced; the junction is still dim. Frozen storyboard frame; no executable disclosure. Character agency is authored fiction; no autonomous intelligence is implied.',
 response:'RESPONSE: torn scanline fragments snap onto the stepped crack, dropout columns collapse, and the first half of the gold acknowledgment trace lights along the brass conductor. Proposed full motion lasts \u2264300 ms once; no JS / Essential / OS reduce jump straight to settled. Character agency is authored fiction; no autonomous intelligence is implied.',
 ack:'ACKNOWLEDGMENT: aligned anomaly, full gold trace returning to the lit claw junction, and a crown stamp inlaid on the floor beside the node. No art redraw or pose swap. Character agency is authored fiction; no autonomous intelligence is implied.',
 settled:'SETTLED: immediate complete static equivalent for no JS / Essential / OS reduced motion; trace rests at reduced opacity, junction and crown stay lit. Content and navigation never depend on the sequence. Character agency is authored fiction; no autonomous intelligence is implied.',
};
const fileToState={'arrival.html':'arrival','domain-idle.html':'idle','domain-action.html':'action','domain-response.html':'response','domain-ack.html':'ack','domain-settled.html':'settled'};

function transform(html,state){
 const o=sceneOverlays[state];
 html=html.split('assets/').join(A).split(LOOM_STRIP).join(STRIP);
 html=html.replace('static review','static fusion review');
 // remove loom reaction + signature svgs, insert fusion overlays after picture
 html=html.replace(/<svg class="reaction"[\s\S]*?<\/svg>/,'');
 html=html.replace(/<svg class="signature"[\s\S]*?<\/svg>/,'');
 const overlays=shadow+trace(o.trace)+anomaly(o.anomaly)+junction(o.junction);
 html=html.replace(/<img class="character"[^>]*>/,m=>m.replace(/alt="[^"]*"/,`alt="${ALT}"`)+overlays);
 // frame note
 html=html.replace(/<aside class="frame-note"[^>]*>[^<]*<\/aside>/,`<aside class="frame-note" aria-label="Storyboard annotation">${notes[state]}</aside>`);
 // summary marker + label
 html=html.split('<span aria-hidden="true">⌁</span>').join(frag(state));
 html=html.replace('Inspect the signal +','Inspect the broken signal +');
 return html;
}
for(const [file,state] of Object.entries(fileToState)){
 const src=await fs.readFile(path.join(loom,file),'utf8');
 await fs.writeFile(path.join(here,file),transform(src,state));
}

// ---- human plate: restructure for mobile order + new approved section ----
{
 let html=await fs.readFile(path.join(loom,'human.html'),'utf8');
 html=html.split('assets/').join(A).split(LOOM_STRIP).join(STRIP).replace('static review','static fusion review');
 // pull the nav out of the intro column; split first prose paragraph out
 const nav=html.match(/<nav class="human-links"[\s\S]*?<\/nav>/)[0];
 const prose=html.match(/<div class="human-prose">([\s\S]*?)<\/div><\/article>/)[1];
 const firstP=prose.match(/<p>[\s\S]*?<\/p>/)[0];
 const restP=prose.slice(prose.indexOf(firstP)+firstP.length);
 html=html.replace(nav,'').replace(/<div class="human-prose">[\s\S]*?<\/div><\/article>/,
  `${nav}<div class="human-prose human-first">${firstP}</div><div class="human-prose">${restP}<h2>The person and the worlds.</h2><p>\u201cThe Creature of the Internet\u201d is a persona. Defdef is a character. <a href="https://deffy.me/astrizda/">Astrizda</a> is a fictional universe I created. I\u2019m the person behind them, with a life that extends beyond what I make.</p></div></article>`);
 // tag the intro column so CSS can order it
 html=html.replace(/<article class="human-grid">\s*<div>/,'<article class="human-grid"><div class="human-intro">');
 await fs.writeFile(path.join(here,'human.html'),html);
}
console.log('wrote fusion plates');
