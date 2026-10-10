import { test } from 'node:test';
import assert from 'node:assert/strict';
import { exportApproved, publicPayload, revisionHash } from '../scripts/publication.mjs';
const record = () => ({
  slug:'synthetic-test',title:'Synthetic test fixture',layer:3,
  eventDate:{precision:'month',value:'2001-09'},writtenAt:{precision:'day',value:'2026-10-08'},
  segments:[{kind:'memory',text:'A synthetic recollection.'},{kind:'attributed-claim',text:'A conflicting synthetic account.',attribution:'Example source'}],
  attachments:[],tags:['fixture'],privateNotes:'PRIVATE_CANARY_NEVER_PUBLIC',sourcePath:'C:/private/original.txt',
});
const approve = r => ({...r,publicationState:'approved',approvedBy:'test-owner',approvedAt:'2026-10-08',approvedRevisionHash:revisionHash(publicPayload(r))});
test('draft and withdrawn originals are absent even when malformed',()=>{
 assert.deepEqual(exportApproved([{publicationState:'draft',secret:'PRIVATE_CANARY_NEVER_PUBLIC'},{publicationState:'withdrawn'}]),[]);
});
test('approval covers exact public revision and keeps evidence distinctions',()=>{
 const r=approve(record()); const out=exportApproved([r]);
 assert.equal(out[0].segments[1].kind,'attributed-claim');
 assert.equal(out[0].eventDate.value,'2001-09');
 assert.doesNotMatch(JSON.stringify(out),/PRIVATE_CANARY|sourcePath|approvedBy|C:\//);
 r.segments[0].text='Meaningfully changed.';
 assert.throws(()=>exportApproved([r]),/Approval does not match/);
});
test('private metadata changes do not change approved public payload',()=>{
 const r=approve(record());r.privateNotes='Different private note';
 assert.equal(exportApproved([r]).length,1);
});
test('private and unapproved attachment paths fail closed',()=>{
 for(const url of ['C:/private/file.pdf','/authoring/source.pdf','/rebirth-assets/records/../../secret.txt']){
  const r=record();r.attachments=[{url,sha256:'a'.repeat(64),label:'Record',publicationState:'approved'}];
  assert.throws(()=>publicPayload(r),/approved public attachment/);
 }
});
test('imprecise dates cannot masquerade as exact days',()=>{
 const r=record();r.eventDate={precision:'day',value:'2001'};
 assert.throws(()=>publicPayload(r),/Date and precision/);
 r.eventDate={precision:'day',value:'2001-02-31'};assert.throws(()=>publicPayload(r),/calendar date/);
});
test('duplicates and unapproved edits to attachments are rejected',()=>{
 const r=approve(record());assert.throws(()=>exportApproved([r,r]),/Duplicate/);
 r.attachments=[{url:'/rebirth-assets/records/test.pdf',sha256:'b'.repeat(64),label:'Changed',publicationState:'approved'}];
 assert.throws(()=>exportApproved([r]),/Approval does not match/);
});

