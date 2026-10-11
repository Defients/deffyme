import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url)),root=path.resolve(here,'../..');
const manifest=JSON.parse(await fs.readFile(path.join(here,'evidence/github-handoff-manifest.json'),'utf8'));
const git=args=>execFileSync('git',args,{cwd:root,encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();
const errors=[];
for(const item of manifest.reviewFiles){
 try{const bytes=await fs.readFile(path.join(root,item.file)),actual=crypto.createHash('sha256').update(bytes).digest('hex');if(actual!==item.sha256||bytes.length!==item.bytes)errors.push({kind:'review-file',file:item.file,expected:item.sha256,actual});}
 catch(error){errors.push({kind:'missing-review-file',file:item.file,message:error.code});}
}
for(const item of manifest.protectedGitBlobs){
 try{const actual=git(['hash-object','--',item.file]);if(actual!==item.oid)errors.push({kind:'protected-runtime',file:item.file,expected:item.oid,actual});}
 catch{errors.push({kind:'missing-protected-runtime',file:item.file});}
}
const changed=git(['diff','--name-only',manifest.baselineCommit,'--']).split(/\r?\n/).filter(Boolean);
const outsideScope=changed.filter(file=>!manifest.allowedExactFiles.includes(file)&&!manifest.allowedDirectories.some(dir=>file.startsWith(dir+'/')));
if(outsideScope.length)errors.push({kind:'publication-scope',files:outsideScope});
const result={status:errors.length?'FAIL':'PASS',scope:'GitHub clone handoff verification only; not accessibility/performance/deployment certification',baselineCommit:manifest.baselineCommit,checkoutHead:git(['rev-parse','HEAD']),reviewFilesVerified:manifest.reviewFiles.length,originalFrozenFiles:manifest.reviewFiles.filter(f=>f.file.startsWith('design/phase1-v2-review/')).length,protectedGitBlobsVerified:manifest.protectedGitBlobs.length,localOnlyHistoricalInputsNotRequired:manifest.localOnlyHistoricalInputs,changedFiles:changed.length,errors};
console.log(JSON.stringify(result,null,2));
if(errors.length)process.exitCode=1;
