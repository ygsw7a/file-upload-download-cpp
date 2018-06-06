var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var appRoutes = require('./routes/app');
var fileRoutes = require('./routes/file');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/file',fileRoutes);
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('index');
});

app.use(function(req, res, next) {	
	var router = express.Router();
	var type = 'standalone_flex_fileH'//yg
	
    router.get('/', function(req, res) {  //yg
      res.render('primes', {target:type});  //yg
    });

    var exec = require('child_process').exec;
    var execFile = require('child_process').execFile
    var program = "./cpp/standalone_flex_fileH/build/Release/standalone_flex_fileH";

    //var inputPath = path.join(__dirname, +'/uploads/'+res.json({originalname:req.file.originalname, uploadname:req.file.filename}));
	//var inputPath = path.join(__dirname, +'/uploads/'+file.originalname);
    //var inputPath = path.join(__dirname, file_name);
    var inputPath = path.join(__dirname, '/uploads/input.csv');
    var outputPath = path.join(__dirname, '/uploads/output.csv');
    console.log("input File " + inputPath);
    console.log("output File " + outputPath);
    //console.log("Calculation Done! ");

    //var inputPath = path.join(__dirname, 'input.csv');
        
    var primes = execFile(program, [inputPath, outputPath], function(error) {
        if (error ) throw error;
    });
      
    console.log("Calculation Done! ");
  next();
});	
module.exports = app;
