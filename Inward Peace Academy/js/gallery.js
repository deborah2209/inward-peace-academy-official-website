const galleryGrid = document.querySelector('[data-gallery-grid]');
const lightbox = document.querySelector('.lightbox');

if (galleryGrid && lightbox) {
  const lightboxImage = lightbox.querySelector('img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeButton = lightbox.querySelector('.lightbox-close');

  document.querySelectorAll('[data-filter]').forEach((filterButton) => {
    filterButton.addEventListener('click', () => {
      const category = filterButton.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach((button) => {
        button.setAttribute('aria-pressed', String(button === filterButton));
      });
      galleryGrid.querySelectorAll('.gallery-item').forEach((item) => {
        item.hidden = category !== 'all' && item.dataset.category !== category;
      });
    });
  });

  galleryGrid.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => {
      const image = item.querySelector('img');
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightboxCaption.textContent = item.dataset.caption;
      lightbox.showModal();
      closeButton.focus();
    });
  });

  closeButton.addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener('close', () => {
    lightboxImage.removeAttribute('src');
    galleryGrid.querySelector('.gallery-item:not([hidden])')?.focus();
  });
}