var path = require('path')
var webpack = require('webpack')
var fs = require('fs')

var appBasePath = './Scripts/app/'

var jsEntries = {}
fs.readdirSync(appBasePath).forEach(function (name) {
    var indexFile = appBasePath + name + '/index.js'
    if (fs.existsSync(indexFile)) {
        jsEntries[name] = indexFile
    }
})

module.exports = {
    entry: jsEntries,
    output: {
        path: path.resolve(__dirname, './Scripts/bundle/'),
        publicPath: '/Scripts/bundle/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.join(__dirname, appBasePath)
        }
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
                        sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },

            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                loader: 'file-loader',
                query: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'dev') {
    module.exports.devtool = '#source-map'
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"dev"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ])
}
