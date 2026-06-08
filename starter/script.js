/* ============================================================
   EIGENSU — shared script
   ============================================================ */

/* ---- 1. Navbar background on scroll ---- */
const nav = document.querySelector('.nav');
const onScroll = () => nav && nav.classList.toggle('scrolled', window.scrollY > 20);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---- 2. Mobile menu ---- */
const burger = document.querySelector('.nav__burger');
const mobileMenu = document.querySelector('.mobile-menu');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    })
  );
}

/* ---- 3. Scroll reveal ---- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ---- 4. Card cursor-follow glow ---- */
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
});

/* ---- 5. Carousel ---- */
document.querySelectorAll('.carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel__track');
  const prev  = carousel.querySelector('[data-prev]');
  const next  = carousel.querySelector('[data-next]');
  const dotsC = carousel.querySelector('.carousel__dots');
  if (!track) return;

  const slides = [...track.children];
  const step = () => (slides[0]?.getBoundingClientRect().width || 340) + 20;

  if (dotsC) {
    slides.forEach((_, i) => {
      const d = document.createElement('i');
      if (i === 0) d.classList.add('on');
      d.addEventListener('click', () => track.scrollTo({ left: i * step(), behavior: 'smooth' }));
      dotsC.appendChild(d);
    });
  }
  const syncDots = () => {
    if (!dotsC) return;
    const idx = Math.round(track.scrollLeft / step());
    [...dotsC.children].forEach((d, i) => d.classList.toggle('on', i === idx));
  };
  track.addEventListener('scroll', syncDots, { passive: true });
  prev && prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  next && next.addEventListener('click', () => track.scrollBy({ left:  step(), behavior: 'smooth' }));
});

/* ---- 6. Animated bar heights (dashboard mock) ---- */
document.querySelectorAll('.dash__bars i').forEach((bar, i) => {
  const h = bar.dataset.h || (30 + Math.random() * 60);
  bar.style.height = h + '%';
  bar.style.animationDelay = (i * 0.07) + 's';
});

/* ---- 7. Multi-step form (onboard page) ---- */
(function multiStep() {
  const form = document.querySelector('[data-multistep]');
  if (!form) return;

  const steps   = [...form.querySelectorAll('.step')];
  const segs    = [...document.querySelectorAll('.steps-bar .seg')];
  const success = document.querySelector('.success');
  const bar     = document.querySelector('.steps-bar');
  let current = 0;

  const render = () => {
    steps.forEach((s, i) => s.classList.toggle('active', i === current));
    segs.forEach((s, i) => {
      s.classList.toggle('active', i === current);
      s.classList.toggle('done', i < current);
    });
  };

  form.querySelectorAll('[data-next-step]').forEach(b =>
    b.addEventListener('click', () => { if (current < steps.length - 1) { current++; render(); window.scrollTo({top:0,behavior:'smooth'}); } })
  );
  form.querySelectorAll('[data-prev-step]').forEach(b =>
    b.addEventListener('click', () => { if (current > 0) { current--; render(); } })
  );

  // choice selection
  form.querySelectorAll('.choice-grid').forEach(grid => {
    grid.querySelectorAll('.choice').forEach(c =>
      c.addEventListener('click', () => {
        grid.querySelectorAll('.choice').forEach(x => x.classList.remove('sel'));
        c.classList.add('sel');
      })
    );
  });

  const submit = form.querySelector('[data-submit]');
  submit && submit.addEventListener('click', (e) => {
    e.preventDefault();
    form.style.display = 'none';
    bar && (bar.style.display = 'none');
    success && success.classList.add('show');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  render();
})();

/* ---- 8. Contact form fake submit ---- */
(function contactForm() {
  const cf = document.querySelector('[data-contact-form]');
  if (!cf) return;
  cf.querySelector('[data-send]')?.addEventListener('click', (e) => {
    e.preventDefault();
    const btn = e.currentTarget;
    btn.textContent = 'Message sent ✓';
    btn.style.background = 'var(--accent-2)';
    setTimeout(() => { btn.textContent = 'Send message'; btn.style.background = ''; }, 2600);
  });
})();
