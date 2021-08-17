const withImages = require('next-images');

const isProd = process.env.NODE_ENV === 'production';

module.exports = withImages({
  assetPrefix: isProd ? '/Video-Player-Next/' : '',
  esModule: true,
  webpack(config) {
    return config
  },
  images: {
    disableStaticImages: true,
  },
});
