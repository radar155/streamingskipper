const fs = require('fs');
const archiver = require('archiver');
const version = require('./package.json').version
const output_path = `${__dirname}/AIOSkipper.v${version}.zip`

try {
  fs.unlinkSync(output_path)
} catch (e) {
  if (e.code === 'EBUSY') {
    console.error('ERROR: bundle.zip file is used by another application. Please, close it and try again.')
    process.exit(1)
  }
  else if (e.code !== 'ENOENT') {
    console.error(e)
    process.exit(1)
  }
}

const output = fs.createWriteStream(output_path);
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

output.on('end', function() {
  console.log('Data has been drained');
});

archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    // log warning
  } else {
    // throw error
    throw err;
  }
});

archive.on('error', function(err) {
  throw err;
});

// pipe archive data to the file
archive.pipe(output);

archive.file('manifest.json', { name: 'manifest.json' })

archive.directory('src/icons', 'src/icons')
archive.directory('src/popup', 'src/popup')
archive.file('src/background.js', { name: 'src/background.js' })
archive.file('src/config.js', { name: 'src/config.js' })

archive.file('dist/skipper.js', { name: 'dist/skipper.js' })

archive.finalize();
