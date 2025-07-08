// craco.config.js
/** @type {import('@craco/craco').CracoConfig} */
module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
};
module.exports = {
  // ...seu style
  eslint: {
    // desliga o patch automático de ESLint
    enable: false,
  },
};
