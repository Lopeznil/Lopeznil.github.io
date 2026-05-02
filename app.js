/* Theme toggle */
(function () {
  const r = document.documentElement;
  const t = document.querySelector('[data-theme-toggle]');
  let d = r.getAttribute('data-theme') ||
          (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  r.setAttribute('data-theme', d);

  const sun  = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  const moon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  const render = () => {
    if (!t) return;
    t.innerHTML = d === 'dark' ? sun : moon;
    t.setAttribute('aria-label', 'Switch to ' + (d === 'dark' ? 'light' : 'dark') + ' mode');
  };
  render();
  if (t) {
    t.addEventListener('click', () => {
      d = d === 'dark' ? 'light' : 'dark';
      r.setAttribute('data-theme', d);
      render();
    });
  }
})();

/* Sticky header shadow */
(function () {
  const header = document.querySelector('.header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* Hide hero video placeholder once a real video source is playing. */
(function () {
  const v = document.querySelector('.hero-video');
  const p = document.querySelector('.video-placeholder');
  if (!v || !p) return;
  const hide = () => { p.style.display = 'none'; };
  v.addEventListener('playing', hide);
  v.addEventListener('loadeddata', () => { if (v.readyState >= 2) hide(); });
})();

/* How-it-works image: hide the <img> if its src is broken/missing, hide the
   placeholder once a real image has loaded. */
(function () {
  const img = document.querySelector('.workflow-demo__img');
  const ph  = document.querySelector('.workflow-demo__placeholder');
  if (!img) return;
  img.addEventListener('load', () => {
    // Only treat as a real load if the image actually has pixels.
    if (img.naturalWidth > 1 && ph) ph.style.display = 'none';
  });
  img.addEventListener('error', () => { img.style.display = 'none'; });
  // If src is empty or missing on first paint, hide the broken-icon early.
  if (!img.getAttribute('src')) img.style.display = 'none';
})();
