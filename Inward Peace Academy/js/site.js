const root = document.body.dataset.root || './';
const currentPage = document.body.dataset.page || 'home';
const pages = [
  ['home', 'Home', 'index.html'],
  ['about', 'About', 'pages/about.html'],
  ['academics', 'Academics', 'pages/academics.html'],
  ['admissions', 'Admissions', 'pages/admissions.html'],
  ['school-life', 'School Life', 'pages/school-life.html'],
  ['gallery', 'Gallery', 'pages/gallery.html'],
  ['contact', 'Contact', 'pages/contact.html']
];

function pageLink(page) {
  const [key, label, path] = page;
  const active = key === currentPage ? ' aria-current="page"' : '';
  return `<a href="${root}${path}"${active}>${label}</a>`;
}

const header = document.querySelector('[data-site-header]');
if (header) {
  header.innerHTML = `
    <a class="skip-link" href="#main-content">Skip to content</a>
    <div class="site-header">
      <div class="container header-inner">
        <a class="brand" href="${root}index.html" aria-label="Inward Peace Academy home">
          <img class="brand-mark" src="${root}assets/logo/inward-peace-academy.png" alt="" aria-hidden="true" width="147" height="160"><span class="brand-name">Inward Peace Academy</span>
        </a>
        <nav class="desktop-nav" aria-label="Main navigation">
          ${pages.map((page) => pageLink(page)).join('')}
        </nav>
        <button class="menu-toggle" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobile-navigation">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>
      </div>
    </div>
    <nav class="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation" inert>
      ${pages.map((page) => pageLink(page)).join('')}
    </nav>`;
}

const footer = document.querySelector('[data-site-footer]');
if (footer) {
  footer.innerHTML = `
    <div class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <a class="brand footer-brand" href="${root}index.html"><img class="brand-mark" src="${root}assets/logo/inward-peace-academy.png" alt="" aria-hidden="true" width="147" height="160"><span class="brand-name">Inward Peace Academy</span></a>
          </div>
          <div><h2 class="footer-title">Explore</h2><nav class="footer-links" aria-label="Footer navigation">${pages.slice(0, 4).map((page) => pageLink(page)).join('')}</nav></div>
          <div><h2 class="footer-title">Discover</h2><nav class="footer-links" aria-label="More links">${pages.slice(4).map((page) => pageLink(page)).join('')}</nav></div>
          <div class="footer-contact"><h2 class="footer-title">Get in touch</h2><p>5, Bisi Adeniyi Street,<br>Osukoti Layout, Akure</p><p><a href="tel:+2347068838101">07068838101</a><br><a href="tel:+2348033916839">08033916839</a></p><p><a href="mailto:inwardpeaceacademy2011@gmail.com">inwardpeaceacademy2011@gmail.com</a></p></div>
        </div>
        <div class="footer-bottom"><p>© <span data-current-year></span> Inward Peace Academy. All rights reserved.</p></div>
      </div>
    </div>`;
  footer.querySelector('[data-current-year]').textContent = new Date().getFullYear();
}

const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-nav');
const mainContent = document.querySelector('main');
const siteFooter = document.querySelector('footer');
const menuIcons = {
  open: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>'
};
function closeMenu(restoreFocus = false) {
  if (!menuButton || !mobileMenu) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation menu');
  menuButton.innerHTML = menuIcons.open;
  mobileMenu.classList.remove('is-open');
  mobileMenu.setAttribute('inert', '');
  if (mainContent) mainContent.inert = false;
  if (siteFooter) siteFooter.inert = false;
  document.body.classList.remove('menu-open');
  if (restoreFocus) menuButton.focus();
}
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  if (!open) {
    closeMenu(true);
    return;
  }
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', 'Close navigation menu');
  menuButton.innerHTML = menuIcons.close;
  mobileMenu.classList.add('is-open');
  mobileMenu.removeAttribute('inert');
  if (mainContent) mainContent.inert = true;
  if (siteFooter) siteFooter.inert = true;
  document.body.classList.add('menu-open');
  if (getComputedStyle(mobileMenu).visibility === 'visible') {
    mobileMenu.querySelector('a')?.focus();
  }
});
mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(true); });
window.addEventListener('resize', () => {
  if (window.innerWidth > 900 && menuButton?.getAttribute('aria-expanded') === 'true') closeMenu();
});

const revealItems = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else revealItems.forEach((item) => item.classList.add('is-visible'));