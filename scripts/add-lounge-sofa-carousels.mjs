import { readFileSync, writeFileSync } from 'node:fs';

const products = [
  ['JT-SA-21', 'jt-sa-21', 7],
  ['JT-SA-5002', 'jt-sa-5002', 4],
  ['LD24-05', 'ld24-05', 6],
  ['LD24-SF51-4', 'ld24-sf51-4', 7],
  ['LD25-16', 'ld25-16', 3],
  ['LD25-17', 'ld25-17', 6],
  ['LD25-24-1', 'ld25-24-1', 5],
  ['LD25-25', 'ld25-25', 4],
  ['LD26-14', 'ld26-14', 6],
  ['LD26-17', 'ld26-17', 4],
  ['LD-K930', 'ld-k930', 5],
  ['HS-S-1621', 'hs-s-1621', 6],
  ['JH-SF-141', 'jh-sf-141', 1],
  ['JT-S-1003', 'jt-s-1003', 6],
  ['JT-S-1012', 'jt-s-1012', 6],
  ['JT-SA-10', 'jt-sa-10', 6],
];

const twoDigits = (number) => String(number).padStart(2, '0');

for (const [model, slug, imageCount] of products) {
  const pagePath = `products/${slug}-lounge-sofa.html`;
  let html = readFileSync(pagePath, 'utf8');
  if (html.includes('data-m15-gallery')) continue;

  const images = Array.from(
    { length: imageCount },
    (_, index) => `/assets/images/lounge-sofa-details/${slug}/view-${twoDigits(index + 1)}.webp`,
  );
  const primaryImage = images[0];
  const schemaImages = images.map((image) => `https://huangsifurniture.com${image}`);
  const collectionImage = `/assets/images/lounge-sofa-collection/${slug}.webp`;

  html = html.replace(
    new RegExp(`"image":\\["https://huangsifurniture\\.com${collectionImage.replaceAll('/', '\\/')}"\\]`),
    `"image":${JSON.stringify(schemaImages)}`,
  );
  html = html.replaceAll(collectionImage, primaryImage);
  html = html.replace(
    '<script defer src="/assets/js/main.js"></script>',
    '<script defer src="/assets/js/main.js"></script><script defer src="/assets/js/m15-chair-detail.js"></script>',
  );
  html = html.replace('style="--gallery-columns:1"', `style="--gallery-columns:${imageCount}"`);

  const slides = images.map((image, index) => `<figure class="m15-slide" data-gallery-slide><img src="${image}" width="1400" height="900" alt="${model} lounge sofa view ${index + 1}"${index === 0 ? ' fetchpriority="high"' : ' loading="lazy"'}></figure>`).join('');
  const dots = images.map((_, index) => `<button type="button" data-gallery-dot="${index}" aria-label="Show image ${index + 1}"${index === 0 ? ' aria-current="true"' : ''}></button>`).join('');
  const thumbnails = images.map((image, index) => `<button type="button" data-gallery-thumb="${index}"${index === 0 ? ' aria-current="true"' : ''}><img src="${image}" width="1400" height="900" alt="${model} view ${index + 1} thumbnail" loading="lazy"></button>`).join('');
  const gallery = `<div class="m15-gallery" data-m15-gallery aria-label="${model} product image gallery"><div class="m15-track" data-gallery-track tabindex="0" aria-live="polite">${slides}</div><div class="m15-gallery-controls"><div class="m15-gallery-arrows"><button type="button" data-gallery-prev aria-label="Previous product image">←</button><button type="button" data-gallery-next aria-label="Next product image">→</button></div><span class="m15-count"><b data-gallery-current>01</b> / <span>${twoDigits(imageCount)}</span></span><div class="m15-dots" aria-label="Choose product image">${dots}</div></div><div class="m15-thumbnails">${thumbnails}</div></div>`;
  const singleImageGallery = /<div class="m15-gallery" aria-label="[^"]+ product image"><div class="m15-track"><figure class="m15-slide"><img[^>]+><\/figure><\/div><\/div>/;
  if (!singleImageGallery.test(html)) throw new Error(`Single-image gallery not found in ${pagePath}`);
  html = html.replace(singleImageGallery, gallery);
  writeFileSync(pagePath, html);
}
