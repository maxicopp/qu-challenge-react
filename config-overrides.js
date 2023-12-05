const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@': 'src',
    '@hooks': 'src/hooks',
    '@components': 'src/components',
    '@layouts': 'src/layouts',
    '@screens': 'src/screens',
    '@store': 'src/store',
    '@api': 'src/api',
    '@locales': 'src/locales',
    '@constants': 'src/constants',
    '@utils': 'src/utils',
  })(config);

  return config;
};
