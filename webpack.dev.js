/**
 * Created by huangxiao on 2019/1/16.
 */
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
module.exports = merge(common,{
    mode: 'development',
    devtool:'inline-source-map',
    devServer:{
        contentBase:path.join(__dirname,'dist'),
        compress:true,
        port: 9000,
        index:'html/index.html',
        openPage:'html/index.html',
        // hot:true,
        // noInfo:true
    },
    plugins:[
        //默认添加NODE_ENV为development
        new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
        //模块热更新
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
});