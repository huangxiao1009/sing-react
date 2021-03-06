/**
 * Created by hx on 2019/1/7.
 */
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const fileDistPath = path.resolve(__dirname, 'server/dist/');
const fileSrcPath = path.resolve(__dirname, 'src/');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
    const filesHtml = fs.readdirSync(path.join(fileSrcPath, 'html'));
    filesHtml.forEach(function (filename) {
        let HtmlWebpackPluginOptions = {
            template: path.join(fileSrcPath, 'html', filename),
            title: 'Output Man....',
            filename: `html/${filename}`,
            inject: 'body',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            favicon: 'favicon/favicon.ico'
        };
        const filenameShort = filename.split('.')[0];
        entries[filenameShort] && (HtmlWebpackPluginOptions.chunks = ['runtime', 'commons', filenameShort]);
        let htmlPlu = new HtmlWebpackPlugin(HtmlWebpackPluginOptions);
        plugins.push(htmlPlu);

    });

    //从js中提取css
    let extPlu = new ExtractTextPlugin({
        filename: `css/[name]-[id]-[chunkhash].css`,
        allChunks: true
    });
    plugins.push(extPlu);

}
initHtmlWebpackPlugin();
//每次都清除一次dist文件夹
plugins.push(new CleanWebpackPlugin(['dist/']));

module.exports = {
    context: __dirname,
    entry: entries,
    output: {
        path: fileDistPath,
        filename: "js/[name].[hash].js",
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
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'sass-loader',
                        {
                            loader:'sass-resources-loader',
                            options:{
                                resources:[
                                    path.resolve(__dirname, 'src/components/scss/var.scss')
                                ]
                            }
                        }
                    ],
                })
            },
            {
                test: /\.html$/,
                // loader: 'html-loader'
            },
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, 'src/js'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react'],
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, 'src/components/jsx'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react'],
                    }
                },
                exclude: /node_modules/
            },
            {
                test:/\.(jpg|jpeg|png|gif)$/,
                use:{
                    loader:'url-loader',
                    options:{
                        limit:8192,
                        name:'images/[hash:8].[name].[ext]',
                        publicPath:'/server/dist/'
                    }
                }
            }
        ]
    },
    optimization: {
        //minimize: env === 'production' ? true : false, //是否进行代码压缩
        minimize: true, //是否进行代码压缩
        splitChunks: {
            chunks: "async",
            minSize: 30000, //模块大于30k会被抽离到公共模块
            minChunks: 1, //模块出现1次就会被抽离到公共模块
            maxAsyncRequests: 5, //异步模块，一次最多只能被加载5个
            maxInitialRequests: 3, //入口模块最多只能加载3个
            name: true,
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                }
            }
        },
        runtimeChunk: {
            name: "runtime"
        }
    },
    plugins: plugins,
};
