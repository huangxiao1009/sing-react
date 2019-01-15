/**
 * Created by hx on 2019/1/7.
 */
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const fileDistPath = path.resolve(__dirname, 'dist/');
const fileSrcPath = path.resolve(__dirname, 'src/');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const plugins = [];
const entries = {};
//创建entry
function initEntries() {
    const files = fs.readdirSync(path.join(fileSrcPath, 'js'));
    files.forEach(function (filename) {
        let entryName = filename.split('.')[0];
        let entryPath = path.join(fileSrcPath, 'js', filename);
        // let entryPath = `./src/js/${filename}`;
        entries[entryName] = entryPath;
    });
}
initEntries();
//创建plugins
function initHtmlWebpackPlugin() {
    const files = fs.readdirSync(path.join(fileSrcPath, 'html'));
    files.forEach(function (filename) {
        let HtmlWebpackPluginOptions = {
            template: path.join(fileSrcPath, 'html', filename),
            title: 'Output Man....',
            filename: `html/${filename}`,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        };
        const filenameShort = filename.split('.')[0];
        entries[filenameShort] && (HtmlWebpackPluginOptions.chunks = [filenameShort]);
        let htmlPlu = new HtmlWebpackPlugin(HtmlWebpackPluginOptions);
        plugins.push(htmlPlu);

    });
}
initHtmlWebpackPlugin();
//每次都清除一次dist文件夹
plugins.push(new CleanWebpackPlugin(['dist/']));
//模块热更新
plugins.push(new webpack.NamedModulesPlugin());
plugins.push(new webpack.HotModuleReplacementPlugin());


module.exports = {
    context: __dirname,
    mode: 'development',
    // mode: 'production',
    entry: entries,
    devtool:"inline-source-map",//开发模式
    devServer:{
        contentBase:path.join(__dirname,'dist'),
        compress:true,
        port: 9000,
        index:'html/index.html',
        openPage:'html/index.html',
        // hot:true,
        // noInfo:true
    },
    output: {
        path: fileDistPath,
        filename: "js/[name].bundle.js",
        // publicPath:"https://music.51vv.com"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {test: /\.html$/, loader: 'html-loader'}
        ]
    },
    plugins: plugins,
};
