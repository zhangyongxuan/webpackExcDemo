/*
 * @Description: DLLPlugin插件配置
 * @Date: 2020-03-31 14:35:17
 * @author: zhangyongxuan <yongxuan.zhang@hand-china.com>
 * @version: 1.0.0
 * @copyright: Copyright (c) 2019, Hand
 */


const path = require('path');
const paths = require('./paths');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode:'production',
    entry: {
        vendor: ['react','dva']
    },
    output: {
        path: path.resolve(__dirname,'../dist/dll'),
        filename: '[name].dll.js',
        library: '[name]_library',
        publicPath: '/app'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve('./dist', '[name]-manifest.json'),
            name: '[name]_library'
        }),
        new CleanWebpackPlugin({
            root: paths.appPath, // 根目录
            verbose: true, // 开启在控制台输出信息
            dry: false, // 启用删除文件
        }),
        new WebpackBar({ name: '✈', color: '#29BECE' }),
    ],
    module: {
        rules: [{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }]
    }
};