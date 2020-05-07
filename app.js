import express from 'express';
const expressValidator = require('express-validator');
import moment from 'moment';
const path = require("path");
const fs = require("fs");
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import lessMiddleware from 'less-middleware';
import mongoose from 'mongoose';
import hbs from 'hbs';
const fileUpload = require('express-fileupload');


// import home from './routes/home';
import admin from './routes/admin';


const app = express();
app.use(fileUpload());
var debug = require('debug');
var http = require('http').Server(app);
const port = process.env.PORT || '3500';


// export locals ato template
hbs.localsAsTemplateData(app);
app.locals.defaultPageTitle = 'Theoderic Boilerplate';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('view options', { layout: 'layout/main' });

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(session({cookie: { maxAge: 60000 }}));
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'AdminBSBMaterialDesign-master')));
app.use('/bower_components', express.static(`${__dirname}/bower_components`));
var session = require('express-session');


app.use(session({
  name: 'inventory22',
  secret: 'keyboard cat', 
  resave: false,
  saveUninitialized: false,
cookie: {secure:false},
}))


app.use(express.static(path.join(__dirname, 'views/public')));//this is for the css and js files in the template folder
app.use(express.static(__dirname + '/public/'));

// Express-validator MiddleWare copied from https://github.com/ctavan/express-validator/issues/238
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var   namespace = param.split('.'),
            root      = namespace.shift(),
            formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
// app.use('/', home);
app.use('/', admin);

// mongoose.connect('mongodb://localhost/boilerdb');
mongoose.connect('mongodb://localhost/cohims').then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});




app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
//this is to set a global variable for the user, to know if the user is logged in or not
app.get('*', function(req, res, next){
	res.locals.user = req.user || null;
	next();
});

hbs.registerHelper('json', function (content) {
    return JSON.stringify(content);
});






http.listen(port, function(err){//this takes a callback, that is if we want to run something when we start listening to the port
  if(err){
    console.log("this is the error")
  }
  console.log("Listening on Port:", port);
 
});

module.exports = app;
