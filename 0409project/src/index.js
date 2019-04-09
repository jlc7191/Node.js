var express = require('express');
var exphbs = require('express-handlebars');
var url = require('url');
var bodyParser = require('body-parser');

// 開啟上面那個玩意
var app = express();
// 靜態資料夾
app.use(express.static('public'));

// 設定handlebars的引擎
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        list: require('../helpers/list')
    }
}));


// 註冊樣板引擎
app.set('view engine', 'hbs');


// 路由1 routes1
app.get('/', (req, res) => {
    const sales = require('../data/sales.json')

    res.render('home', {
        name: sales[0].name,
    });
});


// 呈現json
app.get('/sales', (req, res) => {
    const sales = require('./../data/sales.json');
    res.render('sales', {
        // layout: false,
        sales: sales
    });
});


// 自訂輔助器
app.get('/sales2', (req, res) => {
    const sales = require('./../data/sales.json');
    res.render('sales2', {
        // layout: false,
        sales: sales
    });
});


// queryString
app.get('/try_qs', (req, res)=>{

    console.log(req.url);

    const urlParts = url.parse(req.url, true);

    console.log(urlParts);

    res.render('/try_qs', {
        urlParts: urlParts
    })
});


// body-parser
const urlencodedParser = bodyParser.urlencoded({extended : false});

app.post('/bparder',urlencodedParser,(req,res)=>{
    res.json(req.body);
});


// 路由1 routes1 
// (順序很重要!!   這邊的abc.html抓不到,  因為上面資料夾裡面有abc.html  而它在上它優先)
app.get('/abc.html', function (req, res) {
    res.send('Ya Hey noChinese 沒有中文~~會亂碼');
});


// middle ware
app.use((req, res) => {
    res.type('text', 'plain');
    res.status(404);
    res.send('404-找不到頁面');
});


// 偵聽
app.listen(3000, function () {
    console.log('啟動server 埠號3000');
});

