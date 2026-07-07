const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = [...document.querySelectorAll('.main-nav a')];
const revealItems = [...document.querySelectorAll('.reveal')];
const whatsappLinks = [...document.querySelectorAll('a[href*="wa.me"]')];

const phoneNumber = '5581996012126';
const message = 'Olá, vi seu portfólio jurídico e gostaria de conversar sobre uma oportunidade de estágio.';
const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

whatsappLinks.forEach(link => {
  link.href = whatsappUrl;
});

const closeMenu = () => {
  navToggle?.classList.remove('active');
  mainNav?.classList.remove('open');
  document.body.classList.remove('menu-open');
  navToggle?.setAttribute('aria-expanded', 'false');
};

navToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.classList.toggle('active', isOpen);
  document.body.classList.toggle('menu-open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach(link => link.addEventListener('click', closeMenu));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealItems.forEach(item => revealObserver.observe(item));

const sections = [...document.querySelectorAll('main section[id], article[id]')];
const linkById = new Map(navLinks.map(link => [link.getAttribute('href')?.replace('#', ''), link]));

const setActiveLink = () => {
  const trigger = window.innerHeight * 0.35;
  let current = 'inicio';

  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top <= trigger) current = section.id;
  });

  navLinks.forEach(link => link.classList.remove('active'));
  linkById.get(current)?.classList.add('active');
};

window.addEventListener('scroll', setActiveLink, { passive: true });
window.addEventListener('load', () => {
  setActiveLink();
  revealItems.slice(0, 10).forEach(item => item.classList.add('visible'));
});
