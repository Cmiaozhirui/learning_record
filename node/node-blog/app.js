var express = require('express');

var app = express();
var swig = require('swig');

app.use('/public', express.static(__dirname+'/public'));

app.set('views','./views');

app.set('view engine', 'html');

app.engine('html', swig.renderFile);//设置模板引擎名称，并且用第二个参数去处理文件
swig.setDefaults({cache: false});


app.get('/', function (req, res) {

    // res.send('hello world');
    res.render('index');
})

app.listen(8889);