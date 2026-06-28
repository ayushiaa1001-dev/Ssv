import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define all routes that need index.html duplicates
const routes = [
  'about',
  'products',
  'careers',
  'contact',
  'events/culture',
  'events/gallery'
];

const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('Error: dist/index.html not found. Run npm run build first.');
  process.exit(1);
}

routes.forEach((route) => {
  const routeDirPath = path.join(distPath, route);
  const routeIndexPath = path.join(routeDirPath, 'index.html');

  // Create directory if it doesn't exist
  fs.mkdirSync(routeDirPath, { recursive: true });

  // Copy dist/index.html to the directory
  fs.copyFileSync(indexPath, routeIndexPath);
  console.log(`Created static route fallback: ${route}/index.html`);
});

console.log('Static route fallbacks generated successfully!');
