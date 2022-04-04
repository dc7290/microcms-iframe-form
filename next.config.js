const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: process.env.ANALYZE === 'true' })

/**
 * @type {import('next/dist/next-server/server/config-shared').NextConfig}
 */
const config = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      type: 'asset',
      parser: {
        dataUrlCondition: {
          maxSize: 8 * 1024,
        },
      },
      generator: {
        filename: 'static/chunks/images/[path][name].[hash].[ext]',
      },
    })

    return config
  },
  trailingSlash: true,
}

module.exports = withBundleAnalyzer(config)
