'use strict';
/*
 * @Description: 
 * @Date: 2020-03-31 10:33:21
 * @author: zhangyongxuan <yongxuan.zhang@hand-china.com>
 * @version: 1.0.0
 * @copyright: Copyright (c) 2019, Hand
 */

const webpack = require('webpack');
const express = require('express');
const webpackMiddleWare = require('webpack-dev-middleware');
const webpackConfigFac = require('../config/webpack.config');
const openBrowser = require('react-dev-utils/openBrowser');





const app = new express();
const compiler = webpack(webpackConfigFac('development'));

app.use(webpackMiddleWare(compiler, {
    publicPath: '/app'
}))
app.use(express.static('../static'))
app.listen(3000, () => {
    console.log(`server is running in port 3000`);
    console.log(`http://localhost:3000/app`);
    openBrowser('http://localhost:3000/app');
})