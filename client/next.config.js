/**
 * @type {import('next').NextConfig}
 */
module.exports = {
    experimentalFeatures: {
        outputStandalone: true,
        reactStrictMode: true
    },
    poweredByHeader: false,
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production'
    }
}
