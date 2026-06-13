// Script to optimize hero images

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Root of the project (where package.json lives)
const ROOT_DIR = process.cwd();

// Where your media folder lives
const MEDIA_DIR = path.join(ROOT_DIR, 'public', 'media');

// These are the accepted master file extensions
const MASTER_EXTENSIONS = ['.png', '.jpg', '.jpeg'];

// These are the widths we'll generate for each hero image
const TARGET_WIDTHS = [768, 1024, 1536];

// Helper: does this file look like a master image?
function isMasterFile(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  const base = path.basename(fileName, ext);
  return MASTER_EXTENSIONS.includes(ext) && base.endsWith('-master');
}

async function processAssetDir(assetPath) {
  const assetDir = path.join(MEDIA_DIR, assetPath);

  if (!fs.existsSync(assetDir)) {
    console.warn(`⚠️  Post hero folder not found: ${assetDir}`);
    return;
  }

  const files = fs.readdirSync(assetDir);
  const masterFile = files.find(isMasterFile);

  if (!masterFile) {
    console.warn('No master file found in:', assetDir);
    return;
  }

  const fullPath = path.join(assetDir, masterFile);

  const fullPathExt = path.extname(masterFile).toLowerCase();
  const basePath = path.basename(masterFile, fullPathExt).replace(/-master$/, '');
  const baseOutPath = path.join(assetDir, basePath);

  // Load the master image and resize the new generated images to the target widths.
  for (const width of TARGET_WIDTHS) {
    const height = Math.round(width * 9 / 16);
    const image = sharp(fullPath).resize({ 
      width, 
      height,
      fit: 'cover',
      position: 'center',
      withoutEnlargement: true 
    });

    // AVIF
    await image
      .clone()
      .toFormat('avif', { quality: 60 })
      .toFile(`${baseOutPath}-${width}.avif`);

    // WebP
    await image
      .clone()
      .toFormat('webp', { quality: 75 })
      .toFile(`${baseOutPath}-${width}.webp`);

    // JPG
    await image
      .clone()
      .jpeg({ quality: 80 })
      .toFile(`${baseOutPath}-${width}.jpg`);
  }
}

// 👇 IIFE (runs immediately and properly awaits)
(async () => {
  const assetPath = process.argv[2];

  if (!assetPath) {
    console.error("Usage: npm run optimize:hero-image -- <assetPath>");
    process.exit(1);
  }

  try {
    await processAssetDir(assetPath);
  } catch (error) {
    console.error('❌ Error optimizing hero image:', error);
    process.exit(1);
  }
})();