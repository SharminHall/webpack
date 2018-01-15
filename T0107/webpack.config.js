const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const postcssList = [
    require('autoprefixer'),
    require('postcss-cssnext'),
    require('precss')
]

const config = {
    entry: {
        index: path.resolve(__dirname + '/app/main.js'),
    },
    output: {
        path: path.resolve(__dirname + '/build'),
        filename: 'js/bundle-[hash].js',
    },
    devtool: 'none',
    devServer: {
        contentBase: './build/',
        port: 8989,
        inline: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ 'es2015', 'react', 'stage-0']
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: '[name]__[local]--[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: postcssList
            }
        }),
        new HtmlWebpackPlugin({
            template: './app/entry.html',
            filename: 'index.html',
            chunks: ['index']
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jquery: 'jquery'
        })
    ]
}

module.exports = config;