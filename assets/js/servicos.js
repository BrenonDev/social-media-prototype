// ============================================================
// Página Serviços — vitrine interativa + carrossel de depoimentos
// ============================================================

(() => {
  /* ---------------- Vitrine de serviços (accordion + imagem) ---------------- */
  const rows = document.querySelectorAll('.service-row');
  const visualImg = document.getElementById('service-visual-img');

  rows.forEach((row) => {
    row.addEventListener('click', () => {
      const isOpen = row.getAttribute('aria-expanded') === 'true';

      rows.forEach((r) => r.setAttribute('aria-expanded', 'false'));
      row.setAttribute('aria-expanded', String(!isOpen));

      if (!isOpen && visualImg) {
        const nextSrc = row.dataset.img;
        if (nextSrc && visualImg.getAttribute('src') !== nextSrc) {
          visualImg.classList.add('is-swapping');
          setTimeout(() => {
            visualImg.setAttribute('src', nextSrc);
            visualImg.setAttribute('alt', row.dataset.alt || '');
            visualImg.classList.remove('is-swapping');
          }, 220);
        }
      }
    });
  });

  /* ---------------- Carrossel de depoimentos ---------------- */
  const track = document.querySelector('.testimonial-track');
  if (track) {
    const slides = Array.from(track.querySelectorAll('.testimonial-slide'));
    const prevBtn = document.querySelector('[data-testimonial="prev"]');
    const nextBtn = document.querySelector('[data-testimonial="next"]');
    const dotsWrap = document.querySelector('.testimonial-dots');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let index = 0;
    let timer = null;

    const dots = slides.map((_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', `Ir para depoimento ${i + 1}`);
      b.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(b);
      return b;
    });

    function goTo(i) {
      slides[index].classList.remove('is-active');
      dots[index].classList.remove('is-active');
      index = (i + slides.length) % slides.length;
      slides[index].classList.add('is-active');
      dots[index].classList.add('is-active');
    }

    function startAuto() {
      if (prefersReducedMotion) return;
      stopAuto();
      timer = setInterval(() => goTo(index + 1), 6000);
    }
    function stopAuto() {
      if (timer) clearInterval(timer);
    }

    prevBtn.addEventListener('click', () => { goTo(index - 1); startAuto(); });
    nextBtn.addEventListener('click', () => { goTo(index + 1); startAuto(); });
    track.addEventListener('mouseenter', stopAuto);
    track.addEventListener('mouseleave', startAuto);
    track.addEventListener('focusin', stopAuto);
    track.addEventListener('focusout', startAuto);

    goTo(0);
    startAuto();
  }
})();
