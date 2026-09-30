// ============================================================
// DAYARA GIOVANNA — comportamento global (nav, reveal, cursor)
// ============================================================

(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- Menu overlay ---------------- */
  const toggle = document.querySelector('.nav-toggle');
  const overlay = document.querySelector('.nav-overlay');

  if (toggle && overlay) {
    const focusableSelector = 'a[href], button:not([disabled])';
    const label = toggle.querySelector('.nav-toggle__label');
    const srLabel = toggle.querySelector('.visually-hidden');
    let lastFocused = null;

    const openNav = () => {
      lastFocused = document.activeElement;
      overlay.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      if (label) label.textContent = 'Fechar';
      if (srLabel) srLabel.textContent = 'Fechar menu de navegação';
      document.body.classList.add('nav-open');
      const firstLink = overlay.querySelector(focusableSelector);
      if (firstLink) firstLink.focus({ preventScroll: true });
      document.addEventListener('keydown', onKeydown);
    };

    const closeNav = () => {
      overlay.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      if (label) label.textContent = 'Menu';
      if (srLabel) srLabel.textContent = 'Abrir menu de navegação';
      document.body.classList.remove('nav-open');
      document.removeEventListener('keydown', onKeydown);
      if (lastFocused) lastFocused.focus({ preventScroll: true });
    };

    const onKeydown = (e) => {
      if (e.key === 'Escape') {
        closeNav();
        return;
      }
      if (e.key === 'Tab') {
        const focusables = Array.from(overlay.querySelectorAll(focusableSelector));
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeNav() : openNav();
    });

    overlay.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => closeNav());
    });
  }

  /* ---------------- Estado ativo na navegação ---------------- */
  const currentPage = document.body.dataset.page;
  if (currentPage) {
    document.querySelectorAll(`[data-nav-link="${currentPage}"]`).forEach((el) => {
      el.setAttribute('aria-current', 'page');
    });
  }

  /* ---------------- Scroll reveal ---------------- */
  const revealTargets = document.querySelectorAll('.reveal, .reveal-stagger');
  if (revealTargets.length) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealTargets.forEach((el) => el.classList.add('is-visible'));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.18, rootMargin: '0px 0px -60px 0px' }
      );
      revealTargets.forEach((el) => io.observe(el));
    }
  }

  /* ---------------- Cursor de destaque ---------------- */
  if (!prefersReducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);

    let x = 0, y = 0, tx = 0, ty = 0;
    const speed = 0.18;

    window.addEventListener('mousemove', (e) => {
      tx = e.clientX;
      ty = e.clientY;
      dot.classList.add('is-active');
    });

    const animate = () => {
      x += (tx - x) * speed;
      y += (ty - y) * speed;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      requestAnimationFrame(animate);
    };
    animate();

    document.querySelectorAll('a, button, .cursor-grow').forEach((el) => {
      el.addEventListener('mouseenter', () => dot.classList.add('is-big'));
      el.addEventListener('mouseleave', () => dot.classList.remove('is-big'));
    });
  }
})();
