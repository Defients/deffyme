import type { APIRoute } from 'astro';
export const GET:APIRoute=()=>new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+['','story/','forge/','astrizda/','now/','music/','connect/','site-privacy/'].map(p=>'<url><loc>https://deffy.me/'+p+'</loc></url>').join('')+'</urlset>',{headers:{'Content-Type':'application/xml'}});

