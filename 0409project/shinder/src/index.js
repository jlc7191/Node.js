const express = require('express');
const exphbs = require('express-handlebars');
const url = require('url');
const bodyParser = require('body-parser');

const bodyParserUrlencoded = bodyParser.urlencoded({extended: false});

const app = express();
app.use(express.static('public'));

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        list: require('./../helpers/list')
    }
}));

app.set('view engine', 'hbs');

// routes
app.get('/', (req, res)=>{
    const sales = require('./../data/sales.json');
    res.render('home', {
        // layout: false,
        name: sales[0].name,
    });
});

app.get('/sales', (req, res)=>{
    const sales = require('./../data/sales.json');
    res.render('sales', {
        sales: sales
    });
});

app.get('/sales2', (req, res)=>{
    const sales = require('./../data/sales.json');
    res.render('sales2', {
        sales: sales
    });
});

app.get('/try-qs', (req, res)=>{
    console.log(req.url);
    const urlParts = url.parse(req.url, true);
    console.log(urlParts);
    res.render('try_qs', {
        urlParts: urlParts
    })
});

app.post('/post-echo', bodyParserUrlencoded, (req, res)=>{
    //res.send( JSON.stringify(req.body));
    res.json(req.body);
});


app.get('/abc.html', (req, res)=>{
    res.send('ABC');
});

app.use((req, res)=>{
    res.type('text/html');
    res.status(404);
    res.send('找不到頁面');
});


app.listen(3000, ()=>{
    console.log('server running');
});







