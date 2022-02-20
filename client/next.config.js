/**
 * @type {import('next').NextConfig}
 */
module.exports = {
    experimentalFeatures: {
        removeConsole: process.env.NODE_ENV === 'production',
        outputStandalone: true
    }
}
