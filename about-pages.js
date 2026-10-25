'use strict';
const pages=document.querySelector('.about-pages');
const sheets=[...pages.querySelectorAll('.about-sheet')];
const tabs=[...document.querySelectorAll('[data-about-page]')];
const prev=document.getElementById('about-prev'),next=document.getElementById('about-next');
let page=0;
function update(){page=pages.scrollTop>=sheets[1].offsetTop-pages.clientHeight*.35?1:0;tabs.forEach((tab,i)=>{tab.classList.toggle('active',i===page);tab.setAttribute('aria-pressed',String(i===page));});prev.disabled=page===0;next.disabled=page===1;document.getElementById('about-page-count').textContent=String(page+1).padStart(2,'0')+' / 02';}
function go(index){pages.scrollTo({top:sheets[index].offsetTop,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
tabs.forEach((tab,i)=>tab.addEventListener('click',()=>go(i)));prev.addEventListener('click',()=>go(0));next.addEventListener('click',()=>go(1));pages.addEventListener('scroll',update,{passive:true});pages.addEventListener('keydown',event=>{if(event.key==='PageDown'||event.key==='PageUp'){event.preventDefault();go(event.key==='PageDown'?1:0);}});update();
