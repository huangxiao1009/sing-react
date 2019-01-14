/**
 * Created by hx on 2019/1/7.
 */
const path = require('path');
console.log()
module.exports = {
    mode:'development',
    entry:'./src/index.js',
    output:{
        path:path.resolve(__dirname,'dist/'),
        filename:"js/[chunkhash].bundle.js",
        // publicPath:"https://music.51vv.com"
    },
    module:{
        rules:[

        ]
    },
    plugins:[

    ]

};
