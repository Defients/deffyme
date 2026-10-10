import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { exportApproved } from './publication.mjs';
const folder = resolve('authoring/stories');
const names = await readdir(folder).catch(e => { if(e.code==='ENOENT') return []; throw e; });
const records = await Promise.all(names.filter(n=>n.endsWith('.json')).map(async n=>JSON.parse(await readFile(resolve(folder,n),'utf8'))));
const stories = exportApproved(records);
if (stories.length) throw new Error('M0–M2 scope: archive-story publication is not enabled. Keep entries in review until M3.');
await mkdir('src/generated',{recursive:true});
await writeFile('src/generated/stories.json',JSON.stringify(stories,null,2)+'\n');
console.log('Public content export: '+stories.length+' archive entries; private drafts excluded.');

