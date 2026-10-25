(() => {
 const pages=document.querySelector('.works-pages');
 if(!pages)return;
 const cards=[...pages.querySelectorAll('.project-card')];
 const buttons=[...document.querySelectorAll('[data-work-page]')];
 const count=document.querySelector('.works-page-count');
 let current=0,queued=false;
 const position=i=>cards[i].offsetTop-cards[0].offsetTop;
 function update(){
  queued=false;
  current=cards.reduce((best,_,i)=>Math.abs(pages.scrollTop-position(i))<Math.abs(pages.scrollTop-position(best))?i:best,0);
  buttons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===current)));
  if(count)count.textContent=String(current+1).padStart(2,'0')+' / '+String(cards.length).padStart(2,'0');
 }
 function schedule(){if(!queued){queued=true;requestAnimationFrame(update);}}
 function go(i){pages.scrollTo({top:position(i),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
 buttons.forEach((button,i)=>button.addEventListener('click',()=>go(i)));
 pages.addEventListener('scroll',schedule,{passive:true});
 pages.addEventListener('keydown',event=>{
  if(event.target!==pages)return;
  if(event.key==='PageDown'||event.key==='PageUp'){
   event.preventDefault();go(Math.max(0,Math.min(cards.length-1,current+(event.key==='PageDown'?1:-1))));
  }
 });
 new ResizeObserver(schedule).observe(pages);
 window.addEventListener('resize',schedule);
 update();
})();
