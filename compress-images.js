import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, 'public', 'products');

async function processImages() {
  try {
    const files = fs.readdirSync(directoryPath);
    let processedCount = 0;

    for (const file of files) {
      if (!file.match(/\.(jpg|jpeg|png)$/i)) continue;

      const filePath = path.join(directoryPath, file);
      const tempPath = path.join(directoryPath, `temp_${file}`);

      console.log(`Processing ${file}...`);
      
      const stats = fs.statSync(filePath);
      const initialSize = (stats.size / 1024 / 1024).toFixed(2);

      await sharp(filePath)
        .resize({ width: 1200, withoutEnlargement: true })
        .jpeg({ quality: 80, progressive: true })
        .toFile(tempPath);

      // Replace original file with compressed one
      fs.renameSync(tempPath, filePath);
      
      const finalStats = fs.statSync(filePath);
      const finalSize = (finalStats.size / 1024 / 1024).toFixed(2);

      console.log(`✓ Optimized ${file}: ${initialSize}MB -> ${finalSize}MB`);
      processedCount++;
    }

    console.log(`\nSuccessfully optimized ${processedCount} images!`);
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

processImages();
