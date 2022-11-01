const path = require('path');

module.exports = {
  mode: 'none',
  entry: {
      skipper: { import: './dist-ts/content_scripts/skipper.js', filename: 'skipper.js' },
  },
  output: {
    path: path.resolve(__dirname, 'dist-ts/content_scripts'),
  },
}
