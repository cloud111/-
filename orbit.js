'use strict';
const orbit=document.querySelector('.orbit-deck');
const cards=[...orbit.querySelectorAll('.depth-card')];
const pauseButton=document.getElementById('orbit-pause');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
let selected=1,paused=true,hovered=false,focused=false,busy=false,gesture=null,ignoreClickUntil=0,lastWheel=0;
function paint(){const narrow=orbit.clientWidth<620;const width=narrow?Math.min(148,(orbit.clientWidth-60)/4.05):Math.min(210,(orbit.clientWidth-110)/4.55);orbit.style.setProperty('--arc-card-width',width+'px');const gap=narrow?12:30;cards.forEach((card,index)=>{const slot=(index-selected+1+4)%4;const active=index===selected;const offset=slot-1.5;const z=active?28:(slot===2?0:-60);const y=(slot===0||slot===3)?23:0;const x=offset*(width+gap);const transform=`translate3d(${x}px,${y}px,${z}px) rotateY(${-offset*21}deg) rotateZ(${offset*2}deg)`;card.style.transform=transform;card.style.setProperty('--card-transform',transform);card.style.zIndex=active?'5':String(3-Math.floor(Math.abs(offset)));card.classList.toggle('is-front',active);card.querySelector('.module-select').setAttribute('aria-pressed',String(active));card.dataset.depthSlot=String(slot);});}
function update(){pauseButton.textContent=paused?'自动轮播 ▷':'暂停轮播 Ⅱ';pauseButton.setAttribute('aria-pressed',String(!paused));}
function select(index,manual=true){if(busy||index===selected)return;if(manual){paused=true;update();}selected=(index+4)%4;paint();busy=true;setTimeout(()=>{busy=false;},reduced.matches?0:700);}
function step(dir,manual=true){select((selected+dir+4)%4,manual);}
function manualPause(){paused=true;update();}
cards.forEach((card,index)=>{card.querySelector('.module-select').addEventListener('click',()=>{if(performance.now()>ignoreClickUntil){manualPause();select(index);}});card.addEventListener('dragstart',event=>event.preventDefault());});
orbit.addEventListener('pointerdown',event=>{if(event.button!==0||event.target.closest('.module-enter'))return;gesture={id:event.pointerId,x:event.clientX,y:event.clientY,dragging:false};});
orbit.addEventListener('pointermove',event=>{if(!gesture||gesture.id!==event.pointerId)return;const dx=event.clientX-gesture.x,dy=event.clientY-gesture.y;if(!gesture.dragging&&Math.abs(dx)>10&&Math.abs(dx)>Math.abs(dy)){gesture.dragging=true;orbit.setPointerCapture(event.pointerId);orbit.classList.add('is-dragging');manualPause();}if(gesture.dragging)event.preventDefault();});
function endGesture(event){if(!gesture||gesture.id!==event.pointerId)return;const dx=event.clientX-gesture.x;if(gesture.dragging){ignoreClickUntil=performance.now()+500;if(Math.abs(dx)>35)step(dx<0?1:-1);if(orbit.hasPointerCapture(event.pointerId))orbit.releasePointerCapture(event.pointerId);}gesture=null;orbit.classList.remove('is-dragging');}
orbit.addEventListener('pointerup',endGesture);
orbit.addEventListener('pointercancel',()=>{gesture=null;orbit.classList.remove('is-dragging');});
orbit.addEventListener('wheel',event=>{if(Math.abs(event.deltaX)<8)return;event.preventDefault();const now=performance.now();if(now-lastWheel>750){lastWheel=now;manualPause();step(event.deltaX>0?1:-1);}},{passive:false});
orbit.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();manualPause();step(event.key==='ArrowRight'?1:-1);}});
document.getElementById('orbit-prev').addEventListener('click',()=>{manualPause();step(-1);});
document.getElementById('orbit-next').addEventListener('click',()=>{manualPause();step(1);});
pauseButton.addEventListener('click',()=>{paused=!paused;update();});
orbit.addEventListener('mouseenter',()=>{hovered=true;});orbit.addEventListener('mouseleave',()=>{hovered=false;});
orbit.addEventListener('focusin',()=>{focused=true;});orbit.addEventListener('focusout',event=>{focused=orbit.contains(event.relatedTarget);});
const timer=setInterval(()=>{if(!paused&&!hovered&&!focused&&!document.hidden&&!reduced.matches)step(1,false);},4200);
window.addEventListener('pagehide',()=>clearInterval(timer),{once:true});window.addEventListener('resize',paint);
paint();update();
