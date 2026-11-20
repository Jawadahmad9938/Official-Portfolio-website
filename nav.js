/* Shared navbar behaviour (UI refresh, Nov 2026). Used by every page.
   - theme toggle (#sn-theme): toggles body.light-mode and saves to both keys the
     older page scripts read ("site-theme" and "theme"), so pages stay in sync
   - glass background on scroll, accessible mobile drawer, scroll-spy on the homepage */
(function () {
  var nav = document.getElementById('site-nav');
  if (!nav) return;
  var body = document.body;

  // Pages without their own theme script (privacy, disclaimer) opt in with data-theme-init
  if (nav.hasAttribute('data-theme-init')) {
    try {
      var saved = localStorage.getItem('site-theme') || localStorage.getItem('theme');
      if (saved === 'light') body.classList.add('light-mode');
      else if (saved === 'dark') body.classList.remove('light-mode');
    } catch (e) {}
  }

  var themeBtn = document.getElementById('sn-theme');
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var light = body.classList.toggle('light-mode');
    try { localStorage.setItem('site-theme', light ? 'light' : 'dark'); localStorage.setItem('theme', light ? 'light' : 'dark'); } catch (e) {}
    var legacyIcon = document.getElementById('theme-icon');
    if (legacyIcon) { legacyIcon.classList.toggle('fa-sun', light); legacyIcon.classList.toggle('fa-moon', !light); }
  });

  function onScroll() { nav.classList.toggle('is-scrolled', window.scrollY > 12); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var toggle = document.getElementById('nav-toggle');
  var drawer = document.getElementById('nav-drawer');
  var scrim = document.getElementById('nav-scrim');
  if (toggle && drawer && scrim) {
    var mq = window.matchMedia('(max-width: 1139px)');
    var focusables = function () { return [toggle].concat(Array.prototype.slice.call(drawer.querySelectorAll('a[href], button'))); };
    var setOpen = function (open, returnFocus) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      scrim.hidden = !open;
      document.documentElement.style.overflow = open ? 'hidden' : '';
      if (open) { var first = drawer.querySelector('a[href]'); if (first) setTimeout(function () { first.focus({ preventScroll: true }); }, 60); }
      else if (returnFocus) toggle.focus({ preventScroll: true });
    };
    toggle.addEventListener('click', function () { setOpen(!nav.classList.contains('is-open'), true); });
    scrim.addEventListener('click', function () { setOpen(false, true); });
    drawer.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false, false); });
    document.addEventListener('keydown', function (e) {
      if (!nav.classList.contains('is-open')) return;
      if (e.key === 'Escape') { setOpen(false, true); return; }
      if (e.key === 'Tab') {
        var f = focusables(), i = f.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    });
    var onMq = function (e) { if (!e.matches) setOpen(false, false); };
    if (mq.addEventListener) mq.addEventListener('change', onMq); else mq.addListener(onMq);
  }

  // Scroll-spy (homepage only: <header data-spy>)
  if (nav.hasAttribute('data-spy')) {
    var init = function () {
      var links = Array.prototype.slice.call(nav.querySelectorAll('[data-spy]'));
      var sections = ['Home', 'About', 'Services', 'Projects', 'Skills'].map(function (id) { return document.getElementById(id); }).filter(Boolean);
      if (!sections.length) return;
      var spy = function () {
        var y = window.scrollY + window.innerHeight * 0.35, current = sections[0].id;
        sections.forEach(function (s) { if (s.getBoundingClientRect().top + window.scrollY <= y) current = s.id; });
        links.forEach(function (a) {
          if (a.getAttribute('data-spy') === current) a.setAttribute('aria-current', current === 'Home' ? 'page' : 'location');
          else a.removeAttribute('aria-current');
        });
      };
      var ticking = false;
      window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(function () { spy(); ticking = false; }); } }, { passive: true });
      spy();
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  }
})();
