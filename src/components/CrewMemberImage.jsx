import React from 'react';

 const IMAGE_WIDTHS = [400, 800, 1024];

export default function CrewMemberImage({
  slug, 
  alt,
  className = '',
  loading = 'lazy',
  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
}) {
  // Example: /images/mascots/bif-goot/bif-goot-800
  const basePath = `https://media.cryptid.quest/the-crew/${slug}/${slug}-`;

  const avifSrcSet = IMAGE_WIDTHS.map(width => {
    return `${basePath}${width}.avif ${width}w`
  }).join(', ');

  const webpSrcSet = IMAGE_WIDTHS.map(width => {
    return `${basePath}${width}.webp ${width}w`
  }).join(', ');

  const jpgSrcSet = IMAGE_WIDTHS.map(width => {
    return `${basePath}${width}.jpg ${width}w`
  }).join(', ');

  return (
    <picture>
      <source srcSet={avifSrcSet} type="image/avif" sizes={sizes} />
      <source srcSet={webpSrcSet} type="image/webp" sizes={sizes} />
      <img 
        src={jpgSrcSet} 
        alt={alt} 
        className={className}
        loading={loading}
        sizes={sizes}
      />
    </picture>
  );
}