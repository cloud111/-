'use strict';
const projectData = {
  cim: {title:'基于 CIM 平台的交通实时监测与预警预测研究',sections:[['项目背景','湖北省自然科学基金项目。利用 CIM 平台的数据融合与三维信息能力，沿“资源体系构建—状态实时研判—智能风险预测—风险预警反馈”的路径，研究城市交通监测与预警。'],['我的工作','参与项目，负责使用深度学习算法进行交通流预测相关实验。'],['已有产出','根据原简历：已产出 CIM 城市模型、交通流预测及交通风险预警相关调研报告一篇，城市时空大数据交通流预测相关专利和论文各一篇。原简历未注明论文发表及专利授权状态。'],['与产品工作的连接','该经历可用于展示复杂场景理解、资料调研和数据方法应用能力。当前展示为研究经历，不代表已上线的产品。']]},
  fatigue:{title:'面向融合多源数据的高速公路疲劳驾驶敏感区判定方法研究',sections:[['项目背景','湖北省自然科学基金项目。通过疲劳驾驶行为的“识别—关联—判定—优化”，研究潜在风险路段的判定，目标是改善高速公路安全性与通行效率。'],['我的工作','参与项目，负责处理高速公路车辆驾驶数据，使用深度学习算法（Transformer 模型）进行轨迹重建，检测异常驾驶车辆。'],['与产品工作的连接','该经历可用于展示数据处理、算法理解，以及从场景问题到分析任务的转化能力。'],['当前展示范围','原简历未提供模型指标、系统上线状态或事故率改善数据，因此本页仅展示研究目标和已描述的工作内容。']]}
};
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-filter]').forEach(item=>{const selected=item===button;item.classList.toggle('selected',selected);item.setAttribute('aria-pressed',String(selected));});
 document.querySelectorAll('.experience').forEach(item=>{item.hidden=button.dataset.filter!=='all'&&!item.dataset.tags.split(' ').includes(button.dataset.filter);});
}));
const dialog=document.getElementById('project-dialog');let trigger;
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{trigger=button;const data=projectData[button.dataset.project];document.getElementById('dialog-title').textContent=data.title;const content=document.getElementById('dialog-content');content.replaceChildren();data.sections.forEach(([heading,text])=>{const h=document.createElement('h3');h.textContent=heading;const p=document.createElement('p');p.textContent=text;content.append(h,p);});dialog.showModal();}));
document.querySelectorAll('.close,.close-bottom').forEach(button=>button.addEventListener('click',()=>dialog.close()));
dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();}});
dialog.addEventListener('close',()=>trigger?.focus());
document.getElementById('copy-email')?.addEventListener('click',async()=>{const status=document.getElementById('copy-status');try{await navigator.clipboard.writeText('326557@whut.edu.cn');status.textContent='邮箱已复制';}catch{status.textContent='请手动复制：326557@whut.edu.cn';}});
document.getElementById('print')?.addEventListener('click',()=>window.print());

let copyToastTimer;
async function copyContactValue(value){
 try { if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(value);return true;} } catch {}
 const field=document.createElement('textarea');field.value=value;field.setAttribute('readonly','');field.style.cssText='position:fixed;left:-9999px;top:0;';document.body.append(field);field.select();let success=false;try{success=document.execCommand('copy');}catch{}field.remove();return success;
}
document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{
 const copied=await copyContactValue(button.dataset.copy);const toast=document.querySelector('.copy-toast');clearTimeout(copyToastTimer);toast.textContent=copied?button.dataset.copyLabel+'已复制':'暂时无法自动复制，请手动复制：'+button.dataset.copy;toast.classList.add('is-visible');copyToastTimer=setTimeout(()=>{toast.classList.remove('is-visible');},copied?2200:6000);button.focus({preventScroll:true});
}));
