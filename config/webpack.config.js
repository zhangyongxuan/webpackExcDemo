/*
 * @Description: 
 * @Date: 2020-03-31 10:35:22
 * @author: zhangyongxuan <yongxuan.zhang@hand-china.com>
 * @version: 1.0.0
 * @copyright: Copyright (c) 2019, Hand
 */
const path = require('path');
const WebpackBar = require('webpackbar');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = require('./plugins');


module.exports = function (mode) {
    const isDev = mode === 'development';

    return {
        mode: mode,
        devtool: isDev
            ? 'source-map'
            : false,
        entry: {
            main: path.resolve(__dirname, '../src/index.js'),
        },
        output: {
            filename: '[name].js',
            path: !isDev ? path.resolve(__dirname, '../dist/[hash]') : path.resolve(__dirname, '../static/dist'),
            publicPath: '/app'
        },
        plugins: Array.from(new Set([
            ...plugins,
            new HtmlWebpackPlugin({
                filename: !isDev ? path.resolve(__dirname, '../dist/[hash]/index.html') : path.resolve(__dirname, '../static/dist/index.html'),
                template: path.resolve(__dirname, '../public/index.html')
            }),
            new webpack.DllReferencePlugin({
                context:'/app',
                manifest: !isDev ? require('../dist/vendor-manifest.json') : require('../static/vendor-manifest.json')
            }),
            new WebpackBar({ name: '✈ 打包中。。。', color: 'red' }),
            new webpack.NamedModulesPlugin(), // 用于启动 HMR 时可以显示模块的相对路径
            new webpack.HotModuleReplacementPlugin(), // Hot Module Replacement 的插件

        ])),
        module: {
            rules: [{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, { test: /\.jsx$/, use: 'babel-loader', exclude: /node_modules/ }]
        },
        
    }
}