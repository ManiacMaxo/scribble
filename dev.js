require('@babel/register')({
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    env: {
        development: {
            sourceMaps: 'inline',
            retainLines: true
        }
    }
})

require('./server')
