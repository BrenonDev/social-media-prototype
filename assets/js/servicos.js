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

      rows.forEach((r) => {
        r.setAttribute('aria-expanded', 'false');
        const p = r.nextElementSibling;
        if (p) p.style.maxHeight = '0px';
      });

      if (!isOpen) {
        row.setAttribute('aria-expanded', 'true');
        const panel = row.nextElementSibling;
        if (panel) panel.style.maxHeight = `${panel.scrollHeight}px`;
      }

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

  window.addEventListener('resize', () => {
    const openRow = document.querySelector('.service-row[aria-expanded="true"]');
    if (openRow) {
      const panel = openRow.nextElementSibling;
      if (panel) panel.style.maxHeight = `${panel.scrollHeight}px`;
    }
  });

  /* ---------------- Carrossel de depoimentos (sem autoplay, só interação) ---------------- */
  const track = document.querySelector('.testimonial-track');
  if (track) {
    const slides = Array.from(track.querySelectorAll('.testimonial-slide'));
    const prevBtn = document.querySelector('[data-testimonial="prev"]');
    const nextBtn = document.querySelector('[data-testimonial="next"]');
    const dotsWrap = document.querySelector('.testimonial-dots');
    let index = 0;

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

    prevBtn.addEventListener('click', () => goTo(index - 1));
    nextBtn.addEventListener('click', () => goTo(index + 1));

    goTo(0);
  }
})();
