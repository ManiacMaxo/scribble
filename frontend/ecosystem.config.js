module.exports = {
    name: 'scribble frontend',
    script: 'serve',
    env: {
        PM2_SERVE_PATH: './build',
        PM2_SERVE_PORT: 3000,
        PM2_SERVE_SPA: true,
        NODE_ENV: 'production'
    }
}
