const withImages = require('next-images');

module.exports = withImages({
  esModule: true,
  webpack(config) {
    return config
  },
});
