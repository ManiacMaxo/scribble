/**
 * @type {import('next').NextConfig}
 */
module.exports = {
    reactStrictMode: true,
    output: 'standalone',
    poweredByHeader: false,
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production'
    }
}
