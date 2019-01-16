/**
 * Created by huangxiao on 2019/1/16.
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common');
module.exports = merge(common, {
    mode: 'production',
    devtool:'source-map',
    plugins: [
        //默认添加NODE_ENV为development
        new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
        new UglifyJSPlugin({
            sourceMap:true
        })
    ]
});