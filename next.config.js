/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    STREAMCHAT_API_KEY: process.env.STREAMCHAT_API_KEY
  },
  webpack(config, { dev }) {
    if (dev) {
      config.devtool = 'eval-source-map'
    }
    return config
  },
}

module.exports = nextConfig
