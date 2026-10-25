'use strict';
document.querySelectorAll('.flip-card').forEach(card=>{
 const front=card.querySelector('.flip-front');
 const back=card.querySelector('.flip-back');
 const enter=card.querySelector('.flip-enter');
 const finePointer=window.matchMedia('(hover: hover) and (pointer: fine)');
 function flip(show,{focus=false}={}){
  card.classList.toggle('is-flipped',show);
  front.setAttribute('aria-expanded',String(show));
  front.inert=show;front.setAttribute('aria-hidden',String(show));
  back.inert=!show;back.setAttribute('aria-hidden',String(!show));
  if(focus)(show?enter:front).focus({preventScroll:true});
 }
 front.addEventListener('click',()=>flip(true,{focus:true}));
 card.querySelector('.flip-return').addEventListener('click',()=>flip(false,{focus:true}));
 card.addEventListener('pointerenter',event=>{if(finePointer.matches&&event.pointerType==='mouse')flip(true);});
 card.addEventListener('pointerleave',()=>{if(!card.contains(document.activeElement))flip(false);});
 card.addEventListener('focusout',event=>{if(!card.contains(event.relatedTarget))flip(false);});
 card.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();flip(false,{focus:true});}});
});
