// Additive current-baseline verifier. The historical verifier and manifest stay frozen.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url)),root=path.resolve(here,'../..');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const git=args=>execFileSync('git',args,{cwd:root,encoding:'utf8'}).trim();
const baseline=JSON.parse(await fs.readFile(path.join(here,'evidence/baseline-v2-4.json'),'utf8'));
const errors=[];
for(const entry of baseline.files){
 try{const b=await fs.readFile(path.join(root,entry.file));if(b.length!==entry.bytes||hash(b)!==entry.sha256)errors.push({kind:'baseline-change',file:entry.file});}
 catch{errors.push({kind:'missing-baseline-file',file:entry.file});}
}
const current=[...git(['ls-files','--cached','--others','--exclude-standard','-z']).split('\0').filter(Boolean)];
const old=new Set(baseline.files.map(x=>x.file));
for(const file of current)if(!old.has(file)&&!baseline.allowedNewFiles.includes(file)&&!baseline.allowedNewDirectories.some(d=>file.startsWith(d)))errors.push({kind:'outside-authorized-scope',file});
const manifestPath=path.join(here,'evidence/handoff-manifest-v2-4.json');
let packageFilesVerified=0;
try{const manifest=JSON.parse(await fs.readFile(manifestPath,'utf8'));for(const entry of manifest.files){const b=await fs.readFile(path.join(root,entry.file));if(hash(b)!==entry.sha256||b.length!==entry.bytes)errors.push({kind:'handoff-change',file:entry.file});packageFilesVerified++;}}
catch(e){errors.push({kind:'handoff-manifest-unavailable',message:e.message});}
console.log(JSON.stringify({version:'2.4',status:errors.length?'FAIL':'PASS',baselineCommit:baseline.baselineCommit,checkoutHead:git(['rev-parse','HEAD']),baselineFilesVerified:baseline.files.length,packageFilesVerified,scope:'Byte preservation and additive handoff scope only; not runtime, accessibility, performance or visual acceptance',errors},null,2));
if(errors.length)process.exitCode=1;
