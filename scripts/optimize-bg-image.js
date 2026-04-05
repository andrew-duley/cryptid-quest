// scripts/optimize-background-image.js

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Root of the project (where package.json lives)
const ROOT_DIR = process.cwd();

// Where your backgrounds folder lives
const BG_IMAGES_DIR = path.join(ROOT_DIR, 'public', 'images', 'backgrounds');

// This is the width we'll generate for each background image
const TARGET_WIDTH = 1536;

// Helper: does this file look like a master image for the given slug?
function isMasterFile(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  const base = path.basename(fileName, ext);
  return MASTER_EXTENSIONS.includes(ext) && base.endsWith('-master');
}

// Find every collection folder inside /public/images/backgrounds
function getBackgroundCollections() {
  return fs.readdirSync(BG_IMAGES_DIR).filter(name => {
    const fullPath = path.join(BG_IMAGES_DIR, name);
    return fs.statSync(fullPath).isDirectory();
  });
}

// Find every scene folder inside a collection folder
function getSceneFolders(collectionName) {
  const collectionDir = path.join(BG_IMAGES_DIR, collectionName);

  return fs.readdirSync(collectionDir).filter(name => {
    const fullPath = path.join(collectionDir, name);
    return fs.statSync(fullPath).isDirectory();
  });
}

async function processSceneFolder(collectionName, sceneName) {
  const sceneDir = path.join(BG_IMAGES_DIR, collectionName, sceneName);

  if (!fs.existsSync(sceneDir)) {
    console.warn(`⚠️  Scene folder not found: ${sceneDir}`);
    return;
  }

  const files = fs.readdirSync(sceneDir);
  const masterFile = files.find(file => file.endsWith('-master.png'));

  if (!masterFile) {
    console.warn('No master file found in:', sceneDir);
    return;
  }

  const fullPath = path.join(sceneDir, masterFile);

  const basePath = path.basename(masterFile, '.png').replace('-master', '');
  const baseOutPath = path.join(sceneDir, basePath);

  const width = 1536;

  // Load the master image and resize to the target width.
  // withoutEnlargement: true means "don't upscale if master is smaller"
  const image = sharp(fullPath).resize({ width, withoutEnlargement: true });

  await image
    .clone()
    .toFormat('avif', { quality: 60 })
    .toFile(`${baseOutPath}.avif`);

  await image
    .clone() 
    .toFormat('webp', { quality: 75 })
    .toFile(`${baseOutPath}.webp`);

  await image
    .clone()
    .jpeg({ quality: 80 })
    .toFile(`${baseOutPath}.jpg`);
}

// 👇 IIFE (runs immediately and properly awaits)
(async () => {
  const collectionName = process.argv[2];
  const sceneName = process.argv[3];

  if (!collectionName || !sceneName) {
    console.error("Usage: npm run optimize:backgrounds -- <collection> <scene>");
    process.exit(1);
  }

  try {
    await processSceneFolder(collectionName, sceneName);
  } catch (error) {
    console.error('❌ Error optimizing background images:', error);
    process.exit(1);
  }
})();