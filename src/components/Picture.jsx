import React from 'react';

const IMAGE_WIDTHS = [768, 1024, 1536];

export default function Picture({ 
  hero_image_url: src, 
  hero_image_alt: alt, 
}) {

  // URL to the master image in the database with -master.<extension> removed
  const basePath = src.replace(/-master\.[^.]+$/, "-");

  const avifSrcSet = IMAGE_WIDTHS.map(width => {
    return `${basePath}${width}.avif ${width}w`
  }).join(', ');

  const webpSrcSet = IMAGE_WIDTHS.map(width => {
    return `${basePath}${width}.webp ${width}w`
  }).join(', ');

  const jpgSrcSet = IMAGE_WIDTHS.map(width => {
    return `${basePath}${width}.jpg ${width}w`
  }).join(', ');

  return(
    <picture>
      <source srcSet={avifSrcSet} type="image/avif" />
      <source srcSet={webpSrcSet} type="image/webp" />
      <img
        src={`${basePath}1536.jpg`}
        srcSet={jpgSrcSet}
        alt={alt}
      />
    </picture>
  );
}