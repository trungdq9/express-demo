var express = require('express');
var Sequelize = require('sequelize');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var mysql = require('mysql');
var http = require('http');
var models = require(path.join(__dirname, '/models'));
var config = require(path.join(__dirname, '/configs/config.json'));
// console.log(config.dev.database);
// console.log(config.dev.username);
// console.log(config.dev.password);
// console.log(config.dev.host);
// console.log(config.dev.port);
// console.log(config.dev.dialect);
// var sequelize = new Sequelize(config.dev.database, config.dev.username, config.dev.password, {
//         host: config.dev.host,
//         port: config.dev.port,
//         logging: false,
//         dialect: config.dev.dialect,
//         pool: {
//             max: 5,
//             min: 0,
//             idle: 10000
//         }
//     });
//var sequelize = new Sequelize('mysql://localhost:3306/nodejsdemo');
/*var pool  = mysql.createPool({
	host : 'localhost',
	user : 'root',
	password : '123456',
	connectionLimit: '5',
	database : 'nodejsdemo'
});*/
//var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.set('pool', pool);

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

//app.use('/index.html', routes);
app.use('/users', users);


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json(err.message);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json(err.message);
});
module.exports = app;
//var server = app.listen(3000);

models.sequelize.sync().then(function () {
  var server = app.listen(3000);
});