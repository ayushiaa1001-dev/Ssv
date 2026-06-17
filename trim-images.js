import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, 'Products');
const outputDir = path.join(__dirname, 'public', 'products');

async function processImages() {
  try {
    const files = fs.readdirSync(inputDir);
    let processedCount = 0;

    for (const file of files) {
      if (!file.match(/\.(jpg|jpeg|png)$/i)) continue;

      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, file);

      console.log(`Trimming ${file}...`);

      // Using trim with a slight threshold to account for slight background gradients or noise
      // The threshold 25 is usually a good starting point for white backgrounds
      await sharp(inputPath)
        .trim({ threshold: 25 })
        .resize({ width: 1200, withoutEnlargement: true })
        .jpeg({ quality: 85, progressive: true })
        .toFile(outputPath);

      console.log(`✓ Cropped and optimized ${file}`);
      processedCount++;
    }

    console.log(`\nSuccessfully processed ${processedCount} images!`);
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

processImages();
