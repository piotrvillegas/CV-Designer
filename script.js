/* ═══════════════════════════════════════════════
   Pedro Villegas CV — script.js
   Animations & interactions
   ═══════════════════════════════════════════════ */

// ── Nav scroll effect ─────────────────────────────
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Reveal on scroll (IntersectionObserver) ────────
const revealEls = document.querySelectorAll(
  '.skill-card, .tool-pill, .timeline-card, .timeline-meta, .edu-card, .lang-card, .section-label, .section-title'
);

revealEls.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach(el => io.observe(el));

// ── Skill bar animation ────────────────────────────
const skillBars = document.querySelectorAll('.skill-fill');
const barObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

skillBars.forEach(bar => barObserver.observe(bar));

// ── Stagger delay for grid items ────────────────────
document.querySelectorAll('.skills-grid .skill-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 80}ms`;
});

document.querySelectorAll('.tool-pill').forEach((pill, i) => {
  pill.style.transitionDelay = `${i * 40}ms`;
});

// ── Smooth scroll for nav links ─────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ── Active nav link on scroll ───────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${entry.target.id}`
            ? 'var(--text)'
            : '';
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(sec => sectionObserver.observe(sec));

// ── Counter animation for hero stats ────────────────
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const step = Math.ceil(target / 40);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + suffix;
    if (current >= target) clearInterval(timer);
  }, 40);
}

const statsObserver = new IntersectionObserver(
  entries => {
    if (entries[0].isIntersecting) {
      animateCounter(document.querySelector('#stat-years .stat-num'), 6, '+');
      animateCounter(document.querySelector('#stat-companies .stat-num'), 4, '');
      animateCounter(document.querySelector('#stat-tools .stat-num'), 15, '+');
      statsObserver.disconnect();
    }
  },
  { threshold: 0.5 }
);

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);
