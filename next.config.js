/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    STREAMCHAT_API_KEY: process.env.NEXT_PUBLIC_STREAMCHAT_API_KEY,
    FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECTID: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
    FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGE_SENDERID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDERID,
    FIREBASE_APPID: process.env.NEXT_PUBLIC_FIREBASE_APPID,
    FIREBASE_MEASUREMENTID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID
  },
  webpack(config, { dev }) {
    if (dev) {
      config.devtool = 'eval-source-map'
    }
    return config
  },
}

module.exports = nextConfig
