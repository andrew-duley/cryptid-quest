// Script to add picture elements for backgrounds, crew members, game cards, game elements, and hero images
import React from 'react';

export default function Picture({ 
  imagePath,
  imageWidths,
  fallbackFormat = "jpg",
  sizes = "100vw",
  alt = '',
  className = "", 
  imgClassName = "",
  loading,
  decoding = "async",
  fetchPriority,
}) {

  if (!imagePath) {
    return null;
  }

  if (!Array.isArray(imageWidths) || imageWidths.length === 0) {
    console.warn('Picture: imageWidths must be a non-empty array.');
    return null;
  }

  const fallbackWidth = Math.max(...imageWidths);

  // Expected format: ".../image-name-".
  // Legacy ".../image-name-master.ext" paths are converted to the same base path.
  const basePath = imagePath.replace(/-master\.[^.]+$/, "-");

  const generateSrcSet = ext => {
    return imageWidths.map(width => {
      return `${basePath}${width}.${ext} ${width}w`
    }).join(', ');
  }

  const avifSrcSet = generateSrcSet("avif");

  const webpSrcSet = generateSrcSet("webp");

  const fallbackSrcSet = generateSrcSet(fallbackFormat);

  return(
    <picture className={className}>
      <source srcSet={avifSrcSet} sizes={sizes} type="image/avif" />
      <source srcSet={webpSrcSet} sizes={sizes} type="image/webp" />
      <img
        src={`${basePath}${fallbackWidth}.${fallbackFormat}`}
        srcSet={fallbackSrcSet}
        sizes={sizes}
        alt={alt}
        className={imgClassName}
      />
    </picture>
  );
}