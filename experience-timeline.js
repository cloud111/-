(() => {
  const timeline = document.querySelector('.experience-timeline');
  if (!timeline) return;
  const rail = timeline.querySelector('.timeline-rail');
  const entries = [...timeline.querySelectorAll('.timeline-entry')];
  let scheduled = false;
  function update() {
    scheduled = false;
    const visible = entries.filter(entry => !entry.hidden);
    if (!visible.length) return;
    const anchor = window.innerHeight * .45;
    let current = visible[0];
    visible.forEach(entry => { if (entry.getBoundingClientRect().top <= anchor) current = entry; });
    entries.forEach(entry => entry.classList.toggle('is-current', entry === current));
    const nodeY = current.getBoundingClientRect().top + 12 - rail.getBoundingClientRect().top;
    rail.style.setProperty('--timeline-progress', `${Math.max(0, nodeY)}px`);
  }
  function schedule() { if (!scheduled) { scheduled = true; requestAnimationFrame(update); } }
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    entries.forEach(entry => { entry.hidden = entry.querySelector('.experience').hidden; });
    schedule();
  }));
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  new ResizeObserver(schedule).observe(timeline);
  update();
})();
