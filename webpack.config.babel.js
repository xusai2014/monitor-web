import webpack from 'webpack';
import path from 'path'

export default {
    context: __dirname + '/client',
    entry:  path.resolve(__dirname, './client/index.jsx'),
    output: {
        path: path.resolve(__dirname, './bin'),

        filename: 'client.bundle.js',

        sourceMapFilename: '[file].map'
    },
    devtool: '#source-map',
    module: {
        loaders: [
            {test: /\.jsx?$/, loader: 'babel-loader',exclude: /node_modules/,
                query:{
                    plugins:[
                        [
                            'import',{libraryName:'bootstrap',style:'css',javascript:'js'}
                        ]
                    ]
                }
            },

            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader", // compiles Sass to CSS
                    options: {
                        includePaths: ["./public/scss/main.scss"]
                    }
                }]
            },
            {test: /\.(png|jpg|svg)$/, loader: 'url-loader?limit=25000'},
            {test: /\.(woff|ttf|eot|woff2)$/, loader: 'url-loader?limit=100000'},

        ]
    },
    resolve: {
        extensions: [ '.js', '.jsx','.scss','.less']
    },

    plugins: [
        new webpack.BannerPlugin('This file is created by Jerry'),
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false')),
            __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'true'))
        }),
    ]

}