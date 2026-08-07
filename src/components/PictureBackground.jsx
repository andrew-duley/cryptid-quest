
// const IMAGE_WIDTHS = [768, 1536, 1920];

//   const avifSrcSet = IMAGE_WIDTHS.map(width => {
//     return `${basePath}${width}.avif ${width}w`
//   }).join(', ');

//   const webpSrcSet = IMAGE_WIDTHS.map(width => {
//     return `${basePath}${width}.webp ${width}w`
//   }).join(', ');

//   const jpgSrcSet = IMAGE_WIDTHS.map(width => {
//     return `${basePath}${width}.jpg ${width}w`
//   }).join(', ');

//   return(
//     <picture className={className}>
//       <source srcSet={avifSrcSet} type="image/avif" />
//       <source srcSet={webpSrcSet} type="image/webp" />
//       <img
//         src={`${basePath}1536.jpg`}
//         srcSet={jpgSrcSet}
//         alt={alt}
//         className={imgClassName}
//       />
//     </picture>
//   );
