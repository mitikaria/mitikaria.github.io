(function () {
  var routes = {
    home: 'index.html',
    about: 'about.html',
    work: 'work.html',
    contact: 'index.html#contact'
  };

  function pageUrl(file) {
    return new URL(file, window.location.href).href;
  }

  document.querySelectorAll('[data-site-nav]').forEach(function (el) {
    var key = el.getAttribute('data-site-nav');
    if (routes[key]) {
      el.setAttribute('href', pageUrl(routes[key]));
    }
  });

  var page = window.location.pathname.split('/').pop() || 'index.html';
  if (page === '') {
    page = 'index.html';
  }

  document.querySelectorAll('[data-site-nav].nav-link-item').forEach(function (el) {
    var key = el.getAttribute('data-site-nav');
    var active =
      (key === 'home' && (page === 'index.html' || page === '')) ||
      (key === 'about' && page === 'about.html') ||
      (key === 'work' && page === 'work.html');
    el.classList.toggle('active', active);
  });
})();
