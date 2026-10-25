'use strict';
const modules=['about','projects','experience','contact'];
const labels={about:'关于我',projects:'作品展示',experience:'实习经历',contact:'联系方式'};
const toolbar=document.querySelector('.module-toolbar');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
function openModule(id,{scroll=true,history=true}={}){if(!modules.includes(id))return;modules.forEach(key=>document.getElementById(key).hidden=key!==id);toolbar.hidden=false;document.getElementById('current-module-name').textContent=labels[id];document.querySelectorAll('[data-module]').forEach(button=>{const active=button.dataset.module===id;if(button.hasAttribute('aria-expanded'))button.setAttribute('aria-expanded',String(active));if(active)button.setAttribute('aria-current','true');else button.removeAttribute('aria-current');});if(history)window.history.pushState(null,'','#'+id);if(scroll){toolbar.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});document.getElementById(id).focus({preventScroll:true});}}
function home({history=true}={}){modules.forEach(id=>document.getElementById(id).hidden=true);toolbar.hidden=true;document.querySelectorAll('[data-module]').forEach(button=>{if(button.hasAttribute('aria-expanded'))button.setAttribute('aria-expanded','false');button.removeAttribute('aria-current');});if(history)window.history.pushState(null,'','#home');document.getElementById('home').scrollIntoView({behavior:reduced.matches?'instant':'smooth'});}
document.querySelectorAll('[data-module]').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();openModule(button.dataset.module);}));
document.querySelectorAll('[data-home]').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();home();}));
document.getElementById('back-home').addEventListener('click',()=>home());
window.addEventListener('popstate',()=>{const id=location.hash.slice(1);modules.includes(id)?openModule(id,{history:false}):home({history:false});});
const initial=location.hash.slice(1);if(modules.includes(initial))openModule(initial,{scroll:false,history:false});
