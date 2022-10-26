const path = require('path');

module.exports = {
  mode: 'none',
  entry: {
      skipper: { import: './src/content_scripts/skipper.js', filename: 'skipper.js' },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
}
