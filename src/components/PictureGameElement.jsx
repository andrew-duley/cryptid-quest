
// const IMAGE_WIDTHS = [128, 192, 256, 384, 512];

//   const avifSrcSet = IMAGE_WIDTHS.map(width => {
//     return `${basePath}${width}.avif ${width}w`
//   }).join(', ');

//   const webpSrcSet = IMAGE_WIDTHS.map(width => {
//     return `${basePath}${width}.webp ${width}w`
//   }).join(', ');

//   const pngSrcSet = IMAGE_WIDTHS.map(width => {
//     return `${basePath}${width}.png ${width}w`
//   }).join(', ');

//   return(
//     <picture className={className}>
//       <source srcSet={avifSrcSet} type="image/avif" />
//       <source srcSet={webpSrcSet} type="image/webp" />
//       <img
//         src={`${basePath}256.png`}
//         srcSet={pngSrcSet}
//         alt={alt}
//         className={imgClassName}
//       />
//     </picture>
//   );
