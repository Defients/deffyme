export type Experience = 'essential' | 'balanced' | 'full';
export type Project = {
  id: string; title: string; eyebrow: string; summary: string;
  lifecycle: string; url: string; category: 'Game' | 'Divination' | 'Software'; number: string;
};
export type PhotoRecord = { src: string; alt: string; caption?: string; date?: string } | null;
export type TrackRecord = {
  title: string; description: string; credits: string; cover: string;
  audio: string; explicit: boolean; approved: boolean;
} | null;

export const site = {
  name: 'Deffy Pyah Urz', persona: 'The Creature of the Internet',
  location: 'New Hampshire', signature: 'PYAH!',
  photo: null as PhotoRecord,
  music: { signature: null as TrackRecord, featured: [null, null] as TrackRecord[] },
  socials: {
    twitch: 'https://twitch.tv/theDeffy',
    kick: 'https://kick.com/deffy',
    github: 'https://github.com/Defients',
  },
};
export const projects: Project[] = [
  { id: 'intrilex', title: 'Intrilex', eyebrow: 'A familiar deck. Unfamiliar possibilities.',
    summary: 'An original competitive playing-card strategy game, with a growing world of simulation and strategy research.',
    lifecycle: 'Pre-alpha · Actively developed', url: 'https://intrilex.cards/', category: 'Game', number: '01' },
  { id: 'astrimancy', title: 'Astrimancy', eyebrow: '213 cards. A different way to wonder.',
    summary: 'An original symbolic divination system, connected to the fictional continuum of Astrizda.',
    lifecycle: 'Experimental · Evolving', url: 'https://astrimancy.quest/', category: 'Divination', number: '02' },
  { id: 'madchatter', title: 'MADchatter', eyebrow: 'A little more personality in the chat.',
    summary: 'An AI-assisted livestream chat co-pilot with configurable personalities and streamer-oriented experiments.',
    lifecycle: 'Experimental · Actively developed', url: 'https://madchatter.fun/', category: 'Software', number: '03' },
];
export const navigation = [
  { label: 'Meet Deffy', href: '/story/' },
  { label: 'Astrizda', href: '/astrizda/' }, { label: 'The Forge', href: '/forge/' },
  { label: 'Now', href: '/now/' },
];

export const gatehouseDestinations: {id:string;number:string;label:string;description:string;href:string;icon:string}[] = [
 {id:'human',number:'01',label:'Meet Deffy',description:'The human behind the peculiar.',href:'/story/',icon:'heart'},
 {id:'projects',number:'02',label:'Projects / The Forge',description:'Games, tools, and ongoing experiments.',href:'/forge/',icon:'pencil'},
 {id:'astrizda',number:'03',label:'Astrizda',description:'A fictional continuum of my own making.',href:'/astrizda/',icon:'globe'},
 {id:'play',number:'04',label:'Play',description:'Explore the games I’m making.',href:'/forge/?category=Game',icon:'game'},
 {id:'listen',number:'05',label:'Listen',description:'A listening space, taking shape.',href:'/music/',icon:'music'},
 {id:'now',number:'06',label:'Now',description:'Streaming links and where to find me.',href:'/now/',icon:'external'},
];

