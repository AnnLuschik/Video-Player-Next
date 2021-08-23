// const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  // assetPrefix: isProd ? '/Video-Player-Next/' : '',
  esModule: true,
  webpack(config) {
    return config;
  },
  fileLoader: true,
};
