import React from 'react';

export default function CrewMemberImage({
  slug, 
  alt,
  size = 800,
  className = '',
  loading = 'lazy',
}) {
  // Example: /images/mascots/bif-goot/bif-goot-800
  const basePath = `/images/the-crew/${slug}/${slug}-${size}`;

  return (
    <picture>
      <source srcSet={`${basePath}.avif`} type="image/avif" />
      <source srcSet={`${basePath}.webp`} type="image/webp" />
      <img 
        src={`${basePath}.jpg`} 
        alt={alt} 
        className={className}
        loading={loading}
      />
    </picture>
  );
}