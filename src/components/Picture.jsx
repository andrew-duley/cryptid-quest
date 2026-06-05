import React from 'react';

const IMAGE_WIDTHS = [768, 1024, 1536];

export default function Picture({ 
  src,
  alt,
  className, 
}) {

  console.log("Picture rendered");
  console.log("src:", src);

  if (!src) {
    console.warn("Picture missing src");
    return null;
  }
  // URL to the master image in the database with -master.<extension> removed
  const basePath = src.replace(/-master\.[^.]+$/, "-");

  console.log("src:", src);
  console.log("basePath:", basePath);
  console.log("jpg:", `${basePath}1536.jpg`);

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