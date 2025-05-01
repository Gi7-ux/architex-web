# Exporting Architex Website to ZIP

This document provides instructions for exporting the Architex website to a ZIP file for easy distribution or deployment.

## Option 1: Using Node.js (Recommended)

This method uses Node.js and the archiver package to create a well-structured ZIP file.

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the build script:
   ```bash
   npm run build
   ```

3. The ZIP file will be created at `dist/architex-website.zip`

## Option 2: Using Shell Script (Linux/Mac)

This method uses the built-in zip command on Linux/Mac systems.

1. Make the script executable (if not already):
   ```bash
   chmod +x create-zip.sh
   ```

2. Run the script:
   ```bash
   ./create-zip.sh
   ```

3. The ZIP file will be created at `dist/architex-website.zip`

## Option 3: Using Batch File (Windows)

This method uses PowerShell (if available) or falls back to the Node.js script on Windows systems.

1. Run the batch file:
   ```
   create-zip.bat
   ```

2. The ZIP file will be created at `dist\architex-website.zip`

## Manual Export

If none of the above methods work, you can manually create a ZIP file with the following contents:

- All HTML files (*.html)
- All CSS files (*.css)
- All JavaScript files (*.js)
- assets/ directory
- fonts/ directory
- Favicon (favicon.ico)
- robots.txt
- sitemap.xml
- .htaccess
- nginx.conf
- README.md

Exclude the following files and directories:
- node_modules/
- .git/
- dist/
- .env
- create-zip.js
- create-zip.sh
- create-zip.bat
