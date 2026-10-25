(() => {
 const pages=document.querySelector('.about-pages');
 if(!pages)return;
 const items=[...pages.querySelectorAll('.awards-timeline article')];
 let scheduled=false;
 function update(){
  scheduled=false;
  const anchor=pages.getBoundingClientRect().top+pages.clientHeight*.4;
  let current=items[0];
  items.forEach(item=>{if(item.getBoundingClientRect().top<=anchor)current=item;});
  items.forEach(item=>item.classList.toggle('is-current',item===current));
 }
 function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(update);}}
 pages.addEventListener('scroll',schedule,{passive:true});
 window.addEventListener('resize',schedule);
 new ResizeObserver(schedule).observe(pages);
 update();
})();
