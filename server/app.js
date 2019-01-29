let express = require('express');
let favicon = require('serve-favicon');
let path  = require('path');
let app = express();

app.get('/',function (req,res) {
    res.send('hello guys')
});
app.use(favicon(path.join(__dirname,'favicon','favicon.ico')));
app.use('/dist',express.static('dist'));

app.listen(3000);