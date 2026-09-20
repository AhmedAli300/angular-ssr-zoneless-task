import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import compression from 'compression';
import { join } from 'node:path';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Gzip/Brotli HTTP compression for extreme mobile network speed
app.use(compression({ level: 9, threshold: 0 }));

// Parse JSON request body
app.use(express.json());

/**
 * Security Headers Middleware (Production Best Practice)
 */
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );
  next();
});

/**
 * Helper to get path to testimonials.json
 */
function getTestimonialsPath(): string {
  const devPath = join(process.cwd(), 'public/data/testimonials.json');
  const distPath = join(browserDistFolder, 'data/testimonials.json');
  if (existsSync(distPath)) return distPath;
  if (existsSync(devPath)) return devPath;
  return devPath;
}

/**
 * REST API: GET /api/testimonials
 */
app.get('/api/testimonials', (req, res) => {
  try {
    const filePath = getTestimonialsPath();
    if (existsSync(filePath)) {
      const data = JSON.parse(readFileSync(filePath, 'utf-8'));
      return res.json(data);
    }
    return res.json([]);
  } catch (err) {
    console.error('Failed reading testimonials.json:', err);
    return res.status(500).json({ error: 'Failed to read testimonials' });
  }
});

/**
 * REST API: POST /api/testimonials
 * Appends new customer review directly to the JSON file and returns updated array
 */
app.post('/api/testimonials', (req, res) => {
  try {
    const newReview = req.body;
    if (!newReview || !newReview.clientName || !newReview.review) {
      return res.status(400).json({ error: 'clientName and review are required' });
    }

    const devPath = join(process.cwd(), 'public/data/testimonials.json');
    const distPath = join(browserDistFolder, 'data/testimonials.json');

    let currentList: any[] = [];
    const targetPath = existsSync(distPath) ? distPath : devPath;
    if (existsSync(targetPath)) {
      currentList = JSON.parse(readFileSync(targetPath, 'utf-8'));
    }

    const entry = {
      id: Date.now(),
      clientName: newReview.clientName,
      role: newReview.role || 'Verified Client',
      company: newReview.company || 'Direct Partner',
      avatarUrl: newReview.avatarUrl || 'images/avatars/avatar-1.svg',
      rating: Number(newReview.rating) || 5,
      review: newReview.review,
      highlightMetric: newReview.highlightMetric || 'New Verified Feedback',
      date: new Date().toISOString().split('T')[0],
      isUserSubmitted: true
    };

    // Prepend to show most recent first
    currentList.unshift(entry);

    // Save to both paths if available
    try {
      if (existsSync(devPath)) writeFileSync(devPath, JSON.stringify(currentList, null, 2), 'utf-8');
      if (existsSync(distPath)) writeFileSync(distPath, JSON.stringify(currentList, null, 2), 'utf-8');
    } catch (writeErr) {
      console.warn('Could not persist to file system (read-only environment):', writeErr);
    }

    return res.status(201).json({ success: true, item: entry, all: currentList });
  } catch (err) {
    console.error('Failed writing to testimonials:', err);
    return res.status(500).json({ error: 'Failed saving testimonial' });
  }
});

/**
 * REST API: POST /api/contact
 * Receives contact form submissions and optionally creates a review entry
 */
app.post('/api/contact', (req, res) => {
  try {
    const formData = req.body;
    const submission = {
      ...formData,
      id: 'DB-' + Math.floor(100000 + Math.random() * 900000),
      submittedAt: new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
      })
    };
    return res.status(201).json({ success: true, data: submission });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to process submission' });
  }
});

/**
 * SEO: Serve robots.txt directly
 */
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nAllow: /\n\nSitemap: https://digitalbondmena.com/sitemap.xml\n');
});

/**
 * SEO: Serve sitemap.xml directly
 */
app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  const sitemapPath = join(browserDistFolder, 'sitemap.xml');
  if (existsSync(sitemapPath)) {
    return res.sendFile(sitemapPath);
  }
  res.send('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://digitalbondmena.com/</loc><priority>1.0</priority></url></urlset>');
});

/**
 * Serve prerendered index.html for root route for instant TTFB (<10ms) and complete pre-rendered DOM
 */
app.get('/', (req, res, next) => {
  const indexPath = join(browserDistFolder, 'index.html');
  if (existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  next();
});

/**
 * Serve static files from /browser with 1y immutable cache
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is run via PM2.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express SSR server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI or Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
