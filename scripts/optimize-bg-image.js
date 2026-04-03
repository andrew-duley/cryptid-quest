// scripts/optimize-background-image.js

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Root of the project (where package.json lives)
const ROOT_DIR = process.cwd();

// Where your crew folder lives
const THE_CREW_DIR = path.join(ROOT_DIR, 'public', 'images', 'the-crew');