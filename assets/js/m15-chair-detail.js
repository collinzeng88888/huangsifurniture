(() => {
  const gallery = document.querySelector('[data-m15-gallery]');
  if (!gallery) return;

  const track = gallery.querySelector('[data-gallery-track]');
  const slides = Array.from(gallery.querySelectorAll('[data-gallery-slide]'));
  const previous = gallery.querySelector('[data-gallery-prev]');
  const next = gallery.querySelector('[data-gallery-next]');
  const current = gallery.querySelector('[data-gallery-current]');
  const dots = Array.from(gallery.querySelectorAll('[data-gallery-dot]'));
  const thumbnails = Array.from(gallery.querySelectorAll('[data-gallery-thumb]'));
  let activeIndex = 0;
  let scrollTimer;

  const update = (index) => {
    activeIndex = Math.max(0, Math.min(slides.length - 1, index));
    current.textContent = String(activeIndex + 1).padStart(2, '0');
    previous.disabled = activeIndex === 0;
    next.disabled = activeIndex === slides.length - 1;
    dots.forEach((dot, dotIndex) => dot.setAttribute('aria-current', String(dotIndex === activeIndex)));
    thumbnails.forEach((thumbnail, thumbnailIndex) => thumbnail.setAttribute('aria-current', String(thumbnailIndex === activeIndex)));
  };

  const goTo = (index) => {
    const nextIndex = Math.max(0, Math.min(slides.length - 1, index));
    track.scrollTo({ left: nextIndex * track.clientWidth, behavior: 'smooth' });
    update(nextIndex);
  };

  previous.addEventListener('click', () => goTo(activeIndex - 1));
  next.addEventListener('click', () => goTo(activeIndex + 1));
  dots.forEach((dot) => dot.addEventListener('click', () => goTo(Number(dot.dataset.galleryDot))));
  thumbnails.forEach((thumbnail) => thumbnail.addEventListener('click', () => goTo(Number(thumbnail.dataset.galleryThumb))));

  track.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(activeIndex - 1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(activeIndex + 1);
    }
  });

  track.addEventListener('scroll', () => {
    window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(() => {
      const width = track.clientWidth || 1;
      update(Math.round(track.scrollLeft / width));
    }, 80);
  }, { passive: true });

  window.addEventListener('resize', () => {
    track.scrollLeft = activeIndex * track.clientWidth;
  });

  update(0);
})();
