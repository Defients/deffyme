type Experience = 'essential' | 'balanced' | 'full';
const root=document.documentElement;
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
const choices=Array.from(document.querySelectorAll<HTMLInputElement>('input[name="experience"]'));
let requested:Experience='balanced';
try { const saved=localStorage.getItem('deffy:experience:v1'); if(saved==='essential'||saved==='balanced'||saved==='full')requested=saved; }catch{}
const apply=()=>{
 root.dataset.motion=reduce.matches?'essential':requested;
 choices.forEach(choice=>{choice.checked=choice.value===requested;});
 const status=document.querySelector<HTMLElement>('[data-motion-status]');
 if(status)status.textContent=reduce.matches?'Your system prefers less motion. Essential is active.':'Sound stays off. Your choice is saved on this device when storage is available.';
};
document.querySelector<HTMLElement>('[data-preference-fields]')?.removeAttribute('hidden');
choices.forEach(choice=>choice.addEventListener('change',()=>{
 requested=choice.value as Experience;
 try{localStorage.setItem('deffy:experience:v1',requested);}catch{}
 apply();
}));
reduce.addEventListener('change',apply);apply();
const disclosures=Array.from(document.querySelectorAll<HTMLDetailsElement>('header details[data-dismissable]'));
disclosures.forEach(details=>{
 details.addEventListener('toggle',()=>{
  if(details.open)disclosures.forEach(other=>{if(other!==details)other.open=false;});
 });
 details.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{details.open=false;}));
});
document.addEventListener('keydown',event=>{
 if(event.key==='Escape'){
  const open=disclosures.find(d=>d.open);
  if(open){open.open=false;open.querySelector('summary')?.focus();}
 }
});
document.addEventListener('pointerdown',event=>{
 disclosures.forEach(d=>{if(d.open && !d.contains(event.target as Node))d.open=false;});
});

