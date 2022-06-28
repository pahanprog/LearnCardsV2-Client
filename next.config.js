const withImages = require('next-images')
/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  ...withImages(),
  future: {
    webpack5: true,
  },
  env: {
    API_URL: process.env.API_URL,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
