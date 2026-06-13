// Script to add picture element for game element images
import React from 'react';

const IMAGE_WIDTHS = [128, 192, 256, 384, 512];

export default function Picture({ 
  src,
  alt,
  className = '', 
  imgClassName = '',
}) {

  if (!src) {
    console.warn("Picture missing src");
    return null;
  }
  
  // URL to the master image from R2 with -master.<extension> removed
  const basePath = src.replace(/-master\.[^.]+$/, "-");

  const avifSrcSet = IMAGE_WIDTHS.map(width => {
    return `${basePath}${width}.avif ${width}w`
  }).join(', ');

  const webpSrcSet = IMAGE_WIDTHS.map(width => {
    return `${basePath}${width}.webp ${width}w`
  }).join(', ');

  const pngSrcSet = IMAGE_WIDTHS.map(width => {
    return `${basePath}${width}.png ${width}w`
  }).join(', ');

  return(
    <picture className={className}>
      <source srcSet={avifSrcSet} type="image/avif" />
      <source srcSet={webpSrcSet} type="image/webp" />
      <img
        src={`${basePath}256.png`}
        srcSet={pngSrcSet}
        alt={alt}
        className={imgClassName}
      />
    </picture>
  );
}