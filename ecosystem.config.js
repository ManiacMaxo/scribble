module.exports = {
    apps: [
        {
            name: 'scribble',
            script: './build/server/index.js',
            env: {
                NODE_ENV: 'production'
            }
        }
    ]
}
