const { config } = require('@swc/core/spack')

module.exports = config({
    target: 'node',
    entry: {
        server: __dirname + '/src/index.ts'
    },
    output: {
        path: __dirname + '/build'
    },
    options: {
        swcrc: true,
        inputSourceMap: false
    },
    module: {}
})
