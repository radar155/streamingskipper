const path = require('path');

module.exports = {
  mode: 'none',
  entry: {
      netflix_skipper: { import: './src/content_scripts/netflix_skipper.js', filename: 'netflix_skipper.js' },
      primevideo_skipper: { import: './src/content_scripts/primevideo_skipper.js', filename: 'primevideo_skipper.js' },
      disneyplus_skipper: { import: './src/content_scripts/disneyplus_skipper.js', filename: 'disneyplus_skipper.js' },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
}
