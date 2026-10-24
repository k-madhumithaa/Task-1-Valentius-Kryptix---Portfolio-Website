(function () {
  var root = document.documentElement;
  var menuBtn = document.getElementById('menuBtn');
  var navList = document.getElementById('navList');
  var themeBtn = document.getElementById('themeBtn');

  // Mobile nav toggle
  menuBtn.addEventListener('click', function () {
    var open = navList.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  navList.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      navList.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Dark mode toggle (remembers choice)
  function setTheme(t) {
    root.setAttribute('data-theme', t);
    themeBtn.textContent = t === 'dark' ? 'Light' : 'Dark';
    themeBtn.setAttribute('aria-label', 'Switch to ' + (t === 'dark' ? 'light' : 'dark') + ' mode');
  }
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  setTheme(saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  themeBtn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // Project filter
  var filters = document.querySelectorAll('.filter');
  var projects = document.querySelectorAll('.project');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.getAttribute('data-filter');
      filters.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('active', on);
        b.setAttribute('aria-pressed', String(on));
      });
      projects.forEach(function (p) {
        p.hidden = !(f === 'all' || p.getAttribute('data-category') === f);
      });
    });
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
