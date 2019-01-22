/**
 * Created by huangxiao on 2019/1/16.
 */
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
module.exports = env =>{
    console.log('env:',env);
    return merge(common,{
        mode: 'development',
        devtool:'inline-source-map',
        devServer:{
            contentBase:path.join(__dirname,''),
            compress:true,
            port: 9000,
            index:'html/index.html',
            openPage:'html/index.html',
            // hot:true,
            // noInfo:true
        },
        plugins:[
            //模块热更新
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin()
        ]
    });
};