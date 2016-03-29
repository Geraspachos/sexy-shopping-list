import path from 'path'

const webpackConfig = {
    entry: './app/App.js',
    output: {
        path: path.resolve('./build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loaders: ['babel'], include: /app/ }
        ]
    }
}

export default webpackConfig
