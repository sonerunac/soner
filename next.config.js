/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  output: 'export',  // statik çıktı
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, '.'),
      '@components': path.resolve(__dirname, 'components'),
      '@app': path.resolve(__dirname, 'app'),
      '@lib': path.resolve(__dirname, 'lib')
    };
    return config;
  }
  // headers(): statik export ile ÇALIŞMAZ -> tanımlama!
};

module.exports = nextConfig;
