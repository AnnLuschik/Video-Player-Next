module.exports = {
  esModule: true,
  webpack(config) {
    return config;
  },
  fileLoader: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
};
