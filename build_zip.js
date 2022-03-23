const fs = require('fs');
const archiver = require('archiver');

const output = fs.createWriteStream(__dirname + '/bundle.zip');
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

archive.directory('src/', 'src')

archive.directory('dist/', 'dist')

archive.finalize();
