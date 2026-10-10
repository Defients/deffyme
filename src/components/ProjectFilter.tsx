import { useEffect, useState } from 'react';
import type { Project } from '../content/site';
const categories=['All','Game','Divination','Software'] as const;
type Category=typeof categories[number];
export default function ProjectFilter({projects}:{projects:Project[]}){
 const [category,setCategory]=useState<Category>('All');
 const [ready,setReady]=useState(false);
 useEffect(()=>{
  const read=()=>{const q=new URLSearchParams(location.search).get('category');setCategory(categories.includes(q as Category)?q as Category:'All');};
  read();setReady(true);addEventListener('popstate',read);return()=>removeEventListener('popstate',read);
 },[]);
 const choose=(next:Category)=>{setCategory(next);const url=new URL(location.href);if(next==='All')url.searchParams.delete('category');else url.searchParams.set('category',next);history.pushState(null,'',url);};
 const visible=projects.filter(p=>category==='All'||p.category===category);
 return <><div className="filters" role="group" aria-label="Filter projects" hidden={!ready}>{categories.map(c=><button key={c} aria-pressed={category===c} onClick={()=>choose(c)}>{c==='All'?'All projects':c}</button>)}</div>
 <div className="project-list">{visible.map(p=><article className="project-row" key={p.id}><span className="project-number">{p.number}</span><div><h2>{p.title}</h2><p>{p.summary}</p><p className="project-status">{p.lifecycle}</p></div><a href={p.url}>Explore {p.title}<span aria-hidden="true">↗</span></a></article>)}</div>
 <p className="project-count" role="status">{visible.length} {visible.length===1?'project':'projects'} to explore</p></>;
}

