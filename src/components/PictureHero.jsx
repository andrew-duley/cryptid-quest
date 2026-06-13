// Script to add picture element for hero images
import React from 'react';

const IMAGE_WIDTHS = [768, 1024, 1536];

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

  const jpgSrcSet = IMAGE_WIDTHS.map(width => {
    return `${basePath}${width}.jpg ${width}w`
  }).join(', ');

  return(
    <picture className={className}>
      <source srcSet={avifSrcSet} type="image/avif" />
      <source srcSet={webpSrcSet} type="image/webp" />
      <img
        src={`${basePath}1024.jpg`}
        srcSet={jpgSrcSet}
        alt={alt}
        className={imgClassName}
      />
    </picture>
  );
}