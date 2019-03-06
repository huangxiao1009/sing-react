let express = require('express');
let favicon = require('serve-favicon');
let path = require('path');
let fs = require('fs');
let app = express();
const port = 3000;
//读文件
const readFileJson = (file) => {
    let promise = new Promise((resolve, reject) => {

        fs.readFile(`${process.cwd()}/server/data/${file}`, 'utf-8', (err, data) => {
            if (err) {
                console.log('read file error', err);
                reject("read file error!")
            } else {
                resolve(data);
            }
        })
    });
    return promise;
};
app.get('/', function (req, res) {
    res.send('hello guys')
});
app.get('/data/classification.htm', function (req, res) {
    readFileJson('classification.json')
        .then(data => {
            res.send(data);
        }, msg => {
            console.log('暂时无数据~')
        })
        .catch(function (err) {
            console.log(err);
        });
});
app.get('/data/songs_hot.htm', function (req, res) {
    readFileJson('songs_hot.json')
        .then(data => {
            res.send(data);
        }, msg => {
            console.log('暂时无数据~')
        })
        .catch(function (err) {
            console.log(err);
        });
});
app.get('/data/songs_love.htm', function (req, res) {
    readFileJson('songs_love.json')
        .then(data => {
            res.send(data);
        }, msg => {
            console.log('暂时无数据~')
        })
        .catch(function (err) {
            console.log(err);
        });
});
app.get('/data/songs_new.htm', function (req, res) {
    readFileJson('songs_new.json')
        .then(data => {
            res.send(data);
        }, msg => {
            console.log('暂时无数据~')
        })
        .catch(function (err) {
            console.log(err);
        });
});
app.get('/data/songs_age.htm', function (req, res) {
    readFileJson('songs_age.json')
        .then(data => {
            res.send(data);
        }, msg => {
            console.log('暂时无数据~')
        })
        .catch(function (err) {
            console.log(err);
        });
});
app.use(favicon(path.join(__dirname, 'favicon', 'favicon.ico')));
app.use('/dist', express.static('dist'));

app.listen(port, function () {
    console.log(`server listen on port ${port}`);
});