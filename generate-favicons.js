import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputImage = path.join(__dirname, 'public', 'logo-pentagon.png');
const publicDir = path.join(__dirname, 'public');

async function main() {
  if (!fs.existsSync(inputImage)) {
    console.error(`Input image not found: ${inputImage}`);
    process.exit(1);
  }

  console.log('Generating favicons from:', inputImage);

  // 1. Generate favicon-pentagon-16x16.png
  await sharp(inputImage)
    .resize(16, 16)
    .toFile(path.join(publicDir, 'favicon-pentagon-16x16.png'));
  console.log('Generated favicon-pentagon-16x16.png');

  // 2. Generate favicon-pentagon-32x32.png
  await sharp(inputImage)
    .resize(32, 32)
    .toFile(path.join(publicDir, 'favicon-pentagon-32x32.png'));
  console.log('Generated favicon-pentagon-32x32.png');

  // 2b. Generate favicon-pentagon-48x48.png (Google Search target size)
  await sharp(inputImage)
    .resize(48, 48)
    .toFile(path.join(publicDir, 'favicon-pentagon-48x48.png'));
  console.log('Generated favicon-pentagon-48x48.png');

  // 2c. Generate favicon-pentagon-96x96.png (Google Search target size)
  await sharp(inputImage)
    .resize(96, 96)
    .toFile(path.join(publicDir, 'favicon-pentagon-96x96.png'));
  console.log('Generated favicon-pentagon-96x96.png');

  // 2d. Generate favicon-pentagon-192x192.png (Android / Web App target size)
  await sharp(inputImage)
    .resize(192, 192)
    .toFile(path.join(publicDir, 'favicon-pentagon-192x192.png'));
  console.log('Generated favicon-pentagon-192x192.png');

  // 3. Generate apple-touch-icon-pentagon.png (180x180)
  await sharp(inputImage)
    .resize(180, 180)
    .toFile(path.join(publicDir, 'apple-touch-icon-pentagon.png'));
  console.log('Generated apple-touch-icon-pentagon.png');

  // 4. Generate favicon-pentagon.ico (wrap 48x48 PNG)
  const png48Buffer = await sharp(inputImage)
    .resize(48, 48)
    .toBuffer();

  // ICO header (6 bytes) + Directory entry (16 bytes) + PNG data
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Image type (1 = icon)
  header.writeUInt16LE(1, 4); // Number of images

  const dirEntry = Buffer.alloc(16);
  dirEntry.writeUInt8(48, 0); // Width
  dirEntry.writeUInt8(48, 1); // Height
  dirEntry.writeUInt8(0, 2); // Color count
  dirEntry.writeUInt8(0, 3); // Reserved
  dirEntry.writeUInt16LE(1, 4); // Color planes
  dirEntry.writeUInt16LE(32, 6); // Bits per pixel
  dirEntry.writeUInt32LE(png48Buffer.length, 8); // Size of image data
  dirEntry.writeUInt32LE(22, 12); // Offset of image data

  const icoBuffer = Buffer.concat([header, dirEntry, png48Buffer]);
  fs.writeFileSync(path.join(publicDir, 'favicon-pentagon.ico'), icoBuffer);
  console.log('Generated favicon-pentagon.ico (48x48)');
}

main().catch(console.error);
