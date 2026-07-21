(function () {
  /* ── Glassmorphism nav pill ── */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';

  var css = document.createElement('style');
  css.textContent = [
    '#glass-nav{position:fixed;top:1.5rem;right:90px;z-index:9990;display:flex;align-items:center;gap:4px;background:rgba(255,255,255,0.08);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.12);border-radius:999px;padding:4px;overflow:hidden}',
    '@media(max-width:991px){#glass-nav{right:40px}}',
    '@media(max-width:479px){#glass-nav{right:20px}}',
    '#glass-nav-pill{position:absolute;top:4px;left:4px;height:calc(100% - 8px);border-radius:999px;background:rgba(255,255,255,0.1);transition:transform 300ms cubic-bezier(0.16,1,0.3,1),width 300ms cubic-bezier(0.16,1,0.3,1);pointer-events:none;z-index:0}',
    '.glass-nav-link{position:relative;z-index:1;color:rgba(255,255,255,0.65);text-decoration:none;font-family:Inter,system-ui,sans-serif;font-size:13px;font-weight:400;padding:8px 18px;border-radius:999px;white-space:nowrap;transition:color 300ms cubic-bezier(0.16,1,0.3,1),opacity 300ms cubic-bezier(0.16,1,0.3,1)}',
    '.glass-nav-link.active{color:#fff}',
    '.glass-nav-link:not(.active){opacity:0.65}',
    '.glass-nav-link:hover{color:#fff;opacity:1}'
  ].join('\n');
  document.head.appendChild(css);

  var nav = document.createElement('div');
  nav.id = 'glass-nav';
  nav.style.position = 'fixed';

  /* Sliding pill element */
  var pill = document.createElement('div');
  pill.id = 'glass-nav-pill';
  nav.appendChild(pill);

  var links = [
    { text: 'Home', href: 'index.html' },
    { text: 'About', href: 'about.html' }
  ];

  var activeIndex = -1;

  links.forEach(function (link, i) {
    var a = document.createElement('a');
    a.href = link.href;
    a.className = 'glass-nav-link';
    a.textContent = link.text;
    if (currentPage === link.href) {
      a.classList.add('active');
      activeIndex = i;
    }
    nav.appendChild(a);
  });

  document.body.appendChild(nav);

  /* Position the pill over the active link */
  function positionPill() {
    if (activeIndex < 0) { pill.style.opacity = '0'; return; }
    var navLinks = nav.querySelectorAll('.glass-nav-link');
    var target = navLinks[activeIndex];
    if (!target) return;
    pill.style.width = target.offsetWidth + 'px';
    pill.style.transform = 'translateX(' + (target.offsetLeft - 4) + 'px)';
  }

  /* Initial position (no transition) */
  pill.style.transition = 'none';
  positionPill();
  /* Force reflow then re-enable transition */
  pill.offsetHeight;
  pill.style.transition = '';

  window.addEventListener('resize', positionPill);
})();
