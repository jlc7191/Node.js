var express = require('express');
var exphbs = require('express-handlebars');
var url = require('url');
var bodyParser = require('body-parser');
var cors = require('cors');
var multer = require('multer');
var fs = require('fs');
const uuidv4 = require('uuid/v4')


// 開啟上面那個玩意
var app = express();


// 靜態資料夾
app.use(express.static('public'));
app.use(cors());


// 設定multer
var upload = multer({ dest: 'tmp_uploads' });


// 抓到進來的post跟json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


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
app.get('/try_qs', (req, res) => {
    console.log(req.url);
    const urlParts = url.parse(req.url, true);
    console.log(urlParts);
    res.render('/try_qs', {
        urlParts: urlParts
    })
});


// 回應接到的post或json
app.post('/post-echo', (req, res) => {
    res.json(req.body);
});
app.post('/post-echo2', (req, res) => {
    res.send(req.body.name)
});


// body-parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/bparder', urlencodedParser, (req, res) => {
    res.json(req.body);
});


// 路由1 routes1 
// (順序很重要!!   這邊的abc.html抓不到,  因為上面資料夾裡面有abc.html  而它在上它優先)
app.get('/abc.html', function (req, res) {
    res.send('Ya Hey noChinese 沒有中文~~會亂碼');
});


app.get('/try-upload', (req, res) => {
    res.render('try-upload');
});


app.post('/try-upload', upload.single('avatar'), (req, res) => {
    console.log(req.file);
    let ext = '';
    let fname = uuidv4();
    if (req.file && req.file.originalname) {
        switch (req.file.mimetype) {
            case 'image/png':
                ext = '.png';
            case 'image/jpeg':
                if (!ext) {
                    ext = '.jpg';
                }
                fs.createReadStream(req.file.path)
                    .pipe(fs.createWriteStream(__dirname + './../public/img/' + fname + ext));
                res.json({
                    success: true,
                    file: '/img/' + fname + ext,
                    name: req.body.name
                });
                return;
        }
    }
    res.json({
        success: false,
        file: '',
        name: req.body.name
    });
    // 判斷是否有檔案
    // if (req.file && req.file.originalname) {
    //     // 判斷是否附檔名為圖檔
    //     if (/\.(jpg|jpeg|png)$/i.test(req.file.originalname)) {
    //         fs.createReadStream(req.file.path)
    //             .pipe(
    //                 fs.createWriteStream(__dirname + './../public/img/' + req.file.originalname)
    //             );
    //     }
    // }
    // 成功後傳送ok訊息
    // res.send('ok');
});


app.post('/upload-single', upload.single('filefield'), (req, res) => {
    let ext = '';
    let fname = uuidv4();
    const result = {
        success: false,
        info: '',
        file: ''
    }
    if (req.file && req.file.originalname) {
        switch (req.file.mimetype) {
            case 'image/png':
                ext = '.png';
            case 'image/jpeg':
                if (!ext) {
                    ext = '.jpg';
                }

                fs.createReadStream(req.file.path)
                    .pipe(fs.createWriteStream(__dirname + './../public/img/' + fname + ext));
                res.json({
                    success: true,
                    file: '/img/' + fname + ext,
                });
                return;
            default:
                result.info = '檔案格式不符';
        }
    } else {
        result.info = '沒有選擇檔案';
    }
    res.json(result);
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

