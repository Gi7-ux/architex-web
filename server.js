const http = require('http');
const fs = require('fs');
const path = require('path');

// Use environment variable for port or default to 3000
const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf',
  '.xml': 'application/xml',
  '.txt': 'text/plain'
};

// Cache duration in seconds
const CACHE_DURATION = {
  html: 0, // No cache for HTML files
  assets: 60 * 60 * 24 * 7, // 7 days for static assets
  images: 60 * 60 * 24 * 30, // 30 days for images
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Parse the URL
  let url = req.url;

  // Remove query string
  const queryStringIndex = url.indexOf('?');
  if (queryStringIndex !== -1) {
    url = url.substring(0, queryStringIndex);
  }

  // Handle the root path
  let filePath = url === '/' ? './index.html' : '.' + url;

  // Get the file extension
  const extname = path.extname(filePath);
  let contentType = MIME_TYPES[extname] || 'application/octet-stream';

  // Read the file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Page not found - serve 404 page
        fs.readFile('./404.html', (err, content) => {
          if (err) {
            // If 404 page doesn't exist, send a simple message
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1><p>The page you requested could not be found.</p>');
          } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
          }
        });
      } else {
        // Server error
        console.error(`Server Error: ${err.code} for ${filePath}`);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>500 Internal Server Error</h1><p>Sorry, something went wrong on our end.</p>');
      }
    } else {
      // Set cache headers based on file type
      let cacheControl = 'no-store'; // Default: no caching

      if (extname === '.html' || extname === '') {
        cacheControl = 'no-cache, must-revalidate'; // HTML files
      } else if (['.jpg', '.jpeg', '.png', '.gif', '.svg', '.ico'].includes(extname)) {
        cacheControl = `public, max-age=${CACHE_DURATION.images}`; // Images
      } else if (['.css', '.js', '.ttf', '.woff', '.woff2', '.eot', '.otf'].includes(extname)) {
        cacheControl = `public, max-age=${CACHE_DURATION.assets}`; // Static assets
      }

      // Set security headers
      const headers = {
        'Content-Type': contentType,
        'Cache-Control': cacheControl,
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Content-Security-Policy': "default-src 'self'; script-src 'self' https://assets.calendly.com https://www.googletagmanager.com https://*.calendly.com 'sha256-FVuM//BO1I8Cd4FWKx3lOVmxU4s4LzxqSmWyXRC0WhM=' 'sha256-L2q69Kh8MQEQD8piYTHKXwhVhEsA/Fzdw3QGRJR0tTc='; style-src 'self' https://fonts.googleapis.com https://assets.calendly.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://www.google-analytics.com https://*.calendly.com; connect-src 'self' https://www.google-analytics.com https://stats.g.doubleclick.net https://*.calendly.com; frame-src 'self' data: blob: https://assets.calendly.com https://calendly.com https://*.calendly.com"
      };

      // Success
      res.writeHead(200, headers);
      res.end(content, 'utf-8');
    }
  });
});

// Handle server errors
server.on('error', (err) => {
  console.error(`Server error: ${err.message}`);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
