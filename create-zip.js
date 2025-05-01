const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

// Create output directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Create a file to stream archive data to
const output = fs.createWriteStream(path.join('dist', 'architex-website.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level
});

// Listen for all archive data to be written
output.on('close', function() {
  console.log('Archive created successfully!');
  console.log('Total bytes: ' + archive.pointer());
});

// Handle warnings and errors
archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    console.warn(err);
  } else {
    throw err;
  }
});

archive.on('error', function(err) {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Files and directories to exclude from the zip
const excludeList = [
  'node_modules',
  '.git',
  'dist',
  '.env',
  'create-zip.js'
];

// Add all files and directories except those in the exclude list
fs.readdirSync('./').forEach(item => {
  if (!excludeList.includes(item)) {
    const itemPath = path.join('./', item);
    const stats = fs.statSync(itemPath);
    
    if (stats.isDirectory()) {
      archive.directory(itemPath, item);
    } else {
      archive.file(itemPath, { name: item });
    }
  }
});

// Finalize the archive
archive.finalize();
