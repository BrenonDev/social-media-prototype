// ============================================================
// Página Contato — envio simulado do formulário (protótipo, sem backend)
// ============================================================

(() => {
  const form = document.getElementById('contact-form');
  const successPanel = document.querySelector('.form-success');
  const resetBtn = document.querySelector('[data-form-reset]');
  const select = form ? form.querySelector('select') : null;

  if (select) {
    select.addEventListener('change', () => {
      select.classList.toggle('has-value', select.value !== '');
    });
  }

  if (form && successPanel) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      successPanel.classList.add('is-visible');
      const firstFocusable = successPanel.querySelector('button, a');
      if (firstFocusable) firstFocusable.focus({ preventScroll: true });
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      successPanel.classList.remove('is-visible');
      form.reset();
      if (select) select.classList.remove('has-value');
      const firstField = form.querySelector('input, textarea, select');
      if (firstField) firstField.focus({ preventScroll: true });
    });
  }

  /* ---------------- FAQ (accordion com animação) ---------------- */
  document.querySelectorAll('.faq-summary').forEach((btn) => {
    const panel = btn.nextElementSibling;
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
      if (panel) panel.style.maxHeight = isOpen ? '0px' : `${panel.scrollHeight}px`;
    });
  });

  window.addEventListener('resize', () => {
    document.querySelectorAll('.faq-summary[aria-expanded="true"]').forEach((btn) => {
      const panel = btn.nextElementSibling;
      if (panel) panel.style.maxHeight = `${panel.scrollHeight}px`;
    });
  });
})();
