import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define route-specific SEO metadata
const routeMetadata = {
  'about': {
    title: 'About Us | Ssv Pharmaceuticals (SSV Pharma)',
    description: 'Learn about Ssv Pharmaceuticals (SSV Pharma), our mission, vision, and core values. Dedicated to high-quality healthcare and ethical practices in Nagpur, India.',
    ogTitle: 'About Us | Ssv Pharmaceuticals (SSV Pharma)',
    ogDescription: 'Learn about Ssv Pharmaceuticals (SSV Pharma), our mission, vision, and core values.',
    canonicalUrl: 'https://www.ssvpharma.com/about'
  },
  'products': {
    title: 'Our Pharmaceutical Products | SSV Pharma',
    description: 'Browse the product portfolio of SSV Pharma, including Alnil, Felocold, Felokof, Felo, Felodol, Rabpad, and OMGOD. High-quality medicines across Ortho, Gastro, Gynae, and Cough & Cold.',
    ogTitle: 'Our Pharmaceutical Products | SSV Pharma',
    ogDescription: 'Browse the product portfolio of SSV Pharma, including Alnil, Felocold, Felokof, Felo, Felodol, Rabpad, and OMGOD.',
    canonicalUrl: 'https://www.ssvpharma.com/products',
    additionalHead: `
    <!-- Structured Data (Products ItemList Schema) -->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "SSV Pharmaceuticals Products",
        "description": "Complete range of anti-cold, asthmatics, orthopedic, pain management, gynecological, gastro care, and nutraceutical products by SSV Pharma.",
        "url": "https://www.ssvpharma.com/products",
        "numberOfItems": 15,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Alnil (Tablets)",
            "description": "Effective relief from joint pain, muscle aches, and fever."
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Alnil-M (Tablets)",
            "description": "Fast-acting relief from severe pain, swelling, and inflammation."
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Felocold (Tablets)",
            "description": "Comprehensive relief from cold, flu, fever, and nasal congestion."
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Felocold Susp. (Suspension)",
            "description": "Gentle and effective relief for children's cold, cough, and fever symptoms."
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Felokof DX (Syrup)",
            "description": "Provides soothing relief from dry, irritating cough and nasal congestion."
          },
          {
            "@type": "ListItem",
            "position": 6,
            "name": "Felo (Tablets)",
            "description": "Dual-action formula for quick relief from acute pain and high fever."
          },
          {
            "@type": "ListItem",
            "position": 7,
            "name": "Felo-MR (Tablets)",
            "description": "Advanced relief from muscle spasms, stiffness, and joint inflammation."
          },
          {
            "@type": "ListItem",
            "position": 8,
            "name": "Felodol (Tablets)",
            "description": "Trusted painkiller for relieving backache, toothache, and mild joint pain."
          },
          {
            "@type": "ListItem",
            "position": 9,
            "name": "Felodol-SP (Tablets)",
            "description": "Triple-action therapy for severe pain and rapid reduction of tissue swelling."
          },
          {
            "@type": "ListItem",
            "position": 10,
            "name": "SS Cal (Tablets)",
            "description": "Essential daily supplement for stronger bones, joints, and overall immunity."
          },
          {
            "@type": "ListItem",
            "position": 11,
            "name": "Hemopeak (Tablets)",
            "description": "Boosts iron levels and energy, effectively combating anemia and fatigue."
          },
          {
            "@type": "ListItem",
            "position": 12,
            "name": "Rabpad-DSR (Capsules)",
            "description": "Fast, sustained relief from severe acidity, heartburn, and gastric discomfort."
          },
          {
            "@type": "ListItem",
            "position": 13,
            "name": "Rabpad 20 (Tablets)",
            "description": "Effectively reduces stomach acid to treat ulcers and chronic heartburn."
          },
          {
            "@type": "ListItem",
            "position": 14,
            "name": "OMGOD (Soft Gel Capsules)",
            "description": "Premium blend of multivitamins and antioxidants to support heart, brain, and daily vitality."
          },
          {
            "@type": "ListItem",
            "position": 15,
            "name": "Ver-D (Tablets)",
            "description": "Provides rapid relief from vertigo, motion sickness, and associated nausea."
          }
        ]
      }
    </script>`
  },
  'careers': {
    title: 'Careers at Ssv Pharmaceuticals | Join SSV Pharma',
    description: 'Join the team at Ssv Pharmaceuticals (SSV Pharma). Explore job openings, career growth opportunities, and work culture in the healthcare and pharmaceutical sector.',
    ogTitle: 'Careers at Ssv Pharmaceuticals | Join SSV Pharma',
    ogDescription: 'Join the team at Ssv Pharmaceuticals (SSV Pharma). Explore job openings and career growth.',
    canonicalUrl: 'https://www.ssvpharma.com/careers'
  },
  'contact': {
    title: 'Contact Us | Ssv Pharmaceuticals (SSV Pharma)',
    description: 'Get in touch with Ssv Pharmaceuticals (SSV Pharma) in Nagpur, India. Find our phone numbers (+91 89206 06892), email (info@ssvpharma.com), and office location.',
    ogTitle: 'Contact Us | Ssv Pharmaceuticals (SSV Pharma)',
    ogDescription: 'Get in touch with Ssv Pharmaceuticals (SSV Pharma) in Nagpur, India.',
    canonicalUrl: 'https://www.ssvpharma.com/contact'
  },
  'events/culture': {
    title: 'Work Culture & Life at SSV Pharma',
    description: 'Discover the life, work culture, celebrations, and team-building events at Ssv Pharmaceuticals (SSV Pharma).',
    ogTitle: 'Work Culture & Life at SSV Pharma',
    ogDescription: 'Discover the life, work culture, and events at Ssv Pharmaceuticals (SSV Pharma).',
    canonicalUrl: 'https://www.ssvpharma.com/events/culture'
  },
  'events/gallery': {
    title: 'Photo Gallery | Ssv Pharmaceuticals (SSV Pharma)',
    description: 'View photos of events, office workspace, celebrations, and products at Ssv Pharmaceuticals (SSV Pharma).',
    ogTitle: 'Photo Gallery | Ssv Pharmaceuticals (SSV Pharma)',
    ogDescription: 'View photos of events, office workspace, and celebrations at Ssv Pharmaceuticals (SSV Pharma).',
    canonicalUrl: 'https://www.ssvpharma.com/events/gallery'
  }
};

const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('Error: dist/index.html not found. Run npm run build first.');
  process.exit(1);
}

const defaultHtml = fs.readFileSync(indexPath, 'utf-8');

Object.keys(routeMetadata).forEach((route) => {
  const meta = routeMetadata[route];
  const routeDirPath = path.join(distPath, route);
  const routeIndexPath = path.join(routeDirPath, 'index.html');

  // Create directory if it doesn't exist
  fs.mkdirSync(routeDirPath, { recursive: true });

  // Dynamically replace tags in HTML
  let html = defaultHtml;

  // Replace title
  html = html.replace(/<title>[^<]+<\/title>/, `<title>${meta.title}</title>`);

  // Replace meta description
  html = html.replace(/<meta name="description" content="[^"]+">/, `<meta name="description" content="${meta.description}">`);

  // Replace og:title
  html = html.replace(/<meta property="og:title" content="[^"]+">/, `<meta property="og:title" content="${meta.ogTitle}">`);

  // Replace og:description
  html = html.replace(/<meta property="og:description" content="[^"]+">/, `<meta property="og:description" content="${meta.ogDescription}">`);

  // Replace og:url
  html = html.replace(/<meta property="og:url" content="[^"]+">/, `<meta property="og:url" content="${meta.canonicalUrl}">`);

  // Replace canonical link
  html = html.replace(/<link rel="canonical" href="[^"]+"[^>]*>/, `<link rel="canonical" href="${meta.canonicalUrl}" />`);

  // Inject additional head contents (like structured data schema) right before </head>
  if (meta.additionalHead) {
    html = html.replace('</head>', `${meta.additionalHead}\n  </head>`);
  }

  // Write modified file
  fs.writeFileSync(routeIndexPath, html, 'utf-8');
  console.log(`Created dynamic static route fallback: ${route}/index.html`);
});

console.log('Static route fallbacks generated and SEO injected successfully!');
