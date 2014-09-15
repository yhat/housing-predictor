/*
 * Dependencies
 */
var bodyParser = require('body-parser'),
    express = require('express'),
    exphbs = require('express-handlebars'),
    fs = require('fs'),
    http = require('http'),
    lessMiddleware = require('less-middleware'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    path = require('path'),
    yhat = require('yhat'),
    accounting = require('accounting');

/*
 * Initiate Express
 */
var app = express();

// Yhat environment variables

var YHAT_USERNAME = process.env.YHAT_USERNAME,
    YHAT_APIKEY = process.env.YHAT_APIKEY;


/*
 * App Configurations
 */
app.set('port', process.env.PORT || 5000 );

// Set up views
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', exphbs({
    defaultLayout: 'main',
    extname: '.html'
    //helpers: helpers
}));
app.enable('view cache');

// Set up static assests
app.use(lessMiddleware(path.join(__dirname, '/public'), {}, {}, {
    compress: true,
    sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// Set up logging
//app.use(morgan());

// Add methods PUT & DELETE
app.use(methodOverride());

// Body parsing middleware
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());


/*
 * ROUTES
 */

// index
app.get('/', function(req, res) {
    res.render('index');
});

// Input your Username/APIKEY
yh = yhat.init(YHAT_USERNAME,
               YHAT_APIKEY,
               "http://cloud.yhathq.com/");

app.post('/predict',function(req,res){
    data= {
        "CRIME": [parseFloat(req.body.CRIME)]
        ,"ZONE": [parseFloat(req.body.ZONE)]
        ,"NONRETAILBIZ": [parseFloat(req.body.NONRETAILBIZ)]
        ,"CRIVER": [parseFloat(req.body.CRIVER)]
        ,"NITOX": [.55]
        ,"ROOMS": [parseFloat(req.body.ROOMS)]
        ,"AGE": [parseFloat(req.body.AGE)]
        ,"EMPLOYDIST": [parseFloat(req.body.EMPLOYDIST)]
        ,"RADHIGHWAYS": [parseFloat(req.body.RADHIGHWAYS)]
        ,"TAXRATE": [parseFloat(req.body.TAXRATE)]
        ,"PTRATIO": [parseFloat(req.body.PTRATIO)]
        ,"RACE": [350]
        ,"LSTAT": [parseFloat(req.body.LSTAT)]
    };

    yh.predict("HouseValuePredictor", data, function(err, rsp) {
       
        if (err) {
            console.log("Error connecting to server: " + err);
        } else {
            console.log(rsp.result);
        }
        
        var formatted_price = accounting.formatMoney(rsp.result.predicted_price*1000);

        res.render('response', {formatted_price: formatted_price , data_map: JSON.stringify(data,null,2), data_resp: JSON.stringify(rsp,null,2)
        });
    });
});

app.get('/about', function(req, res) {
    res.render('about');
});

// robots.txt
app.get('/robots.txt', function(req, res) {
    fs.readFile(__dirname + "/robots.txt", function(err, data) {
        res.header('Content-Type', 'text/plain');
        res.send(data);
    });
});

// 404
app.get('*', function(req, res) {
    res.render('404');
});


http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});
