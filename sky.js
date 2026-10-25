'use strict';
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const cards=[...document.querySelectorAll('.deck-card')];
let slide=0;
function renderDeck(){cards.forEach((card,index)=>{let offset=(index-slide+cards.length)%cards.length;if(offset>2)offset-=cards.length;card.style.setProperty('--offset',offset);card.style.setProperty('--distance',Math.abs(offset));card.style.setProperty('--order',5-Math.abs(offset));card.classList.toggle('active',offset===0);card.setAttribute('aria-pressed',String(offset===0));});document.getElementById('deck-counter').textContent=String(slide+1).padStart(2,'0')+' / 05';}
function moveDeck(step){slide=(slide+step+cards.length)%cards.length;renderDeck();}
cards.forEach((card,index)=>card.addEventListener('click',()=>{slide=index;renderDeck();}));
document.getElementById('deck-prev').addEventListener('click',()=>moveDeck(-1));
document.getElementById('deck-next').addEventListener('click',()=>moveDeck(1));
const deck=document.getElementById('journey-deck');
deck.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();moveDeck(event.key==='ArrowLeft'?-1:1);}});
let startX=null;
deck.addEventListener('pointerdown',event=>{if(event.pointerType==='touch')startX=event.clientX;});
deck.addEventListener('pointerup',event=>{if(startX!==null&&Math.abs(event.clientX-startX)>45)moveDeck(event.clientX<startX?1:-1);startX=null;});
deck.addEventListener('pointercancel',()=>{startX=null;});
document.getElementById('deck-explore').addEventListener('click',()=>{if(slide===2||slide===3){document.querySelector('[data-project="'+(slide===2?'cim':'fatigue')+'"]').click();return;}if(slide<2){document.querySelector('[data-filter="all"]').click();const entries=document.querySelectorAll('.experience');entries[slide===0?1:0].scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth',block:'center'});}else{document.getElementById('about').scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth'});}});
renderDeck();
const photoDialog=document.getElementById('photo-dialog');const photoTrigger=document.getElementById('open-photo');
photoTrigger.addEventListener('click',()=>photoDialog.showModal());
document.querySelector('.photo-close').addEventListener('click',()=>photoDialog.close());
photoDialog.addEventListener('click',event=>{if(event.target===photoDialog){const b=photoDialog.getBoundingClientRect();if(event.clientX<b.left||event.clientX>b.right||event.clientY<b.top||event.clientY>b.bottom)photoDialog.close();}});
photoDialog.addEventListener('close',()=>photoTrigger.focus());
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.section-head,.experience,.project-grid,.about-grid,.contact').forEach(element=>{element.classList.add('reveal-ready');observer.observe(element);});}
let ticking=false;
function progress(){const max=document.documentElement.scrollHeight-window.innerHeight;document.querySelector('.scroll-progress').style.width=(max>0?window.scrollY/max*100:0)+'%';ticking=false;}
window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(progress);ticking=true;}},{passive:true});progress();
if(window.matchMedia('(hover: hover) and (pointer: fine)').matches){document.querySelectorAll('.project-card').forEach(card=>{card.addEventListener('pointermove',event=>{if(reducedMotion.matches)return;const rect=card.getBoundingClientRect();const x=(event.clientX-rect.left)/rect.width-.5;const y=(event.clientY-rect.top)/rect.height-.5;card.style.transform=`perspective(1100px) rotateX(${-y*4}deg) rotateY(${x*5}deg) translateY(-4px)`;});card.addEventListener('pointerleave',()=>{card.style.transform='';});});}
