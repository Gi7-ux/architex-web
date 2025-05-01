require('dotenv').config();
const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://assets.calendly.com", "https://www.googletagmanager.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://assets.calendly.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'"],
      frameSrc: ["https://calendly.com"]
    }
  }
}));

// Compression middleware
app.use(compression());

// Serve static files
app.use(express.static(path.join(__dirname), {
  etag: true,
  lastModified: true,
  setHeaders: (res, path) => {
    // Set caching headers based on file type
    if (path.endsWith('.html')) {
      // No caching for HTML files
      res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    } else if (path.match(/\.(jpg|jpeg|png|gif|svg|ico)$/)) {
      // 30 days for images
      res.setHeader('Cache-Control', 'public, max-age=2592000');
    } else if (path.match(/\.(css|js|ttf|woff|woff2|eot|otf)$/)) {
      // 7 days for static assets
      res.setHeader('Cache-Control', 'public, max-age=604800');
    }
  }
}));

// Handle 404 errors
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
