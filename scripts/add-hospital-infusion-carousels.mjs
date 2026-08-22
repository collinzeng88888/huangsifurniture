import { readFileSync, writeFileSync } from 'node:fs';

const products = [
  ['HS-S-528', 'hs-s-528', 5],
  ['HS-S-1150', 'hs-s-1150', 4],
  ['HS-S-1860', 'hs-s-1860', 5],
  ['HS-S-1999', 'hs-s-1999', 2],
  ['HS-SL-008A', 'hs-sl-008a', 1],
  ['JT-SA-2195', 'jt-sa-2195', 4],
  ['JT-SA-2383', 'jt-sa-2383', 4],
  ['JT-SA-3035', 'jt-sa-3035', 4],
  ['LD25-05', 'ld25-05', 3],
  ['LD26-15', 'ld26-15', 1],
  ['LD26-20', 'ld26-20', 2],
  ['LD26-21', 'ld26-21', 2],
  ['LD26-22', 'ld26-22', 2],
  ['CF-QO-YY023', 'cf-qo-yy023', 1],
  ['HS-S-002', 'hs-s-002', 2],
];

const twoDigits = (number) => String(number).padStart(2, '0');

for (const [model, slug, imageCount] of products) {
  const pagePath = `products/${slug}-hospital-infusion-chair.html`;
  let html = readFileSync(pagePath, 'utf8');
  if (html.includes('data-m15-gallery')) continue;

  const images = Array.from(
    { length: imageCount },
    (_, index) => `/assets/images/hospital-infusion-chair-details/${slug}/view-${twoDigits(index + 1)}.webp`,
  );
  const primaryImage = images[0];
  const schemaImages = images.map((image) => `https://huangsifurniture.com${image}`);
  const collectionImage = `/assets/images/hospital-infusion-chair-collection/${slug}.webp`;

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

  const slides = images.map((image, index) => `<figure class="m15-slide" data-gallery-slide><img src="${image}" width="1400" height="900" alt="${model} hospital infusion chair view ${index + 1}"${index === 0 ? ' fetchpriority="high"' : ' loading="lazy"'}></figure>`).join('');
  const dots = images.map((_, index) => `<button type="button" data-gallery-dot="${index}" aria-label="Show image ${index + 1}"${index === 0 ? ' aria-current="true"' : ''}></button>`).join('');
  const thumbnails = images.map((image, index) => `<button type="button" data-gallery-thumb="${index}"${index === 0 ? ' aria-current="true"' : ''}><img src="${image}" width="1400" height="900" alt="${model} view ${index + 1} thumbnail" loading="lazy"></button>`).join('');
  const gallery = `<div class="m15-gallery" data-m15-gallery aria-label="${model} product image gallery"><div class="m15-track" data-gallery-track tabindex="0" aria-live="polite">${slides}</div><div class="m15-gallery-controls"><div class="m15-gallery-arrows"><button type="button" data-gallery-prev aria-label="Previous product image">←</button><button type="button" data-gallery-next aria-label="Next product image">→</button></div><span class="m15-count"><b data-gallery-current>01</b> / <span>${twoDigits(imageCount)}</span></span><div class="m15-dots" aria-label="Choose product image">${dots}</div></div><div class="m15-thumbnails">${thumbnails}</div></div>`;
  const singleImageGallery = /<div class="m15-gallery" aria-label="[^"]+ product image"><div class="m15-track"><figure class="m15-slide"><img[^>]+><\/figure><\/div><\/div>/;
  if (!singleImageGallery.test(html)) throw new Error(`Single-image gallery not found in ${pagePath}`);
  html = html.replace(singleImageGallery, gallery);
  writeFileSync(pagePath, html);
}
