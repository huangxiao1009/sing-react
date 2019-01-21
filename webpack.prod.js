/**
 * Created by huangxiao on 2019/1/16.
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common');
module.exports = env =>{
    console.log('env:',env);
    return merge(common, {
        mode: 'production',
        devtool:'source-map',
        plugins: [
            new UglifyJSPlugin({
                sourceMap:true
            })
        ]
    });
};