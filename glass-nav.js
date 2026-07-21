(function () {
  /* ── Glassmorphism nav pill ── */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';

  var css = document.createElement('style');
  css.textContent = [
    '#glass-nav{position:fixed;top:20px;right:24px;z-index:9990;display:flex;align-items:center;gap:4px;background:rgba(255,255,255,0.08);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.12);border-radius:999px;padding:4px}',
    '.glass-nav-link{color:rgba(255,255,255,0.65);text-decoration:none;font-family:Inter,system-ui,sans-serif;font-size:13px;font-weight:400;padding:8px 18px;border-radius:999px;white-space:nowrap;transition:color .2s,background .2s}',
    '.glass-nav-link:hover,.glass-nav-link.active{color:#fff;background:rgba(255,255,255,0.1)}'
  ].join('\n');
  document.head.appendChild(css);

  var nav = document.createElement('div');
  nav.id = 'glass-nav';

  var links = [
    { text: 'Home', href: 'index.html' },
    { text: 'About', href: 'about.html' }
  ];

  links.forEach(function (link) {
    var a = document.createElement('a');
    a.href = link.href;
    a.className = 'glass-nav-link';
    a.textContent = link.text;
    if (currentPage === link.href) a.classList.add('active');
    nav.appendChild(a);
  });

  document.body.appendChild(nav);
})();
