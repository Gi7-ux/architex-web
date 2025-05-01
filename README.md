# Architex Website

This is the official website for Architex, an architectural freelancing specialist company based in South Africa.

## Features

- Responsive design for all device sizes
- Interactive bird animation
- Calendly integration for scheduling
- Contact form with Formspree integration
- NDA and IP protection information

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/architex-web.git
cd architex-web
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server
```bash
npm run dev
```

## Deployment

### Option 1: Node.js Server

1. Install dependencies
```bash
npm install
```

2. Set environment variables
```bash
# Edit .env file with production settings
NODE_ENV=production
PORT=3000
```

3. Start the server
```bash
npm start
```

### Option 2: Static Hosting (Apache/Nginx)

1. Upload all files to your web server
2. Ensure the `.htaccess` file is properly configured (for Apache)
3. For Nginx, use the provided `nginx.conf` configuration

### Option 3: Netlify/Vercel

1. Connect your repository to Netlify or Vercel
2. Configure build settings (if needed)
3. Deploy

## Production Checklist

Before deploying to production, ensure:

1. Replace the Google Analytics tracking ID (`G-ABCDE12345`) with your actual ID
2. Configure Formspree form endpoint in contact forms
3. Verify all links and paths are correct
4. Add actual architect profile images and project images
5. Test all forms and interactive elements
6. Optimize images for web
7. Test on multiple devices and browsers

## Built With

- HTML5, CSS3, JavaScript
- Node.js (Express) for server
- Calendly for scheduling integration
- Formspree for form handling

## License

All rights reserved. This project and its contents are proprietary and confidential.

## Contact

For questions or support, contact info@architex.com
