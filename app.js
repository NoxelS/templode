var express = require('express');
var hbs = require("express-handlebars");
var robots = require('express-robots');

var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var datetime = require("node-datetime");

var indexRouter = require('./routes/index');

require('dotenv').config();

var app = express();

app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts/",
    //helpers: {}
  })
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(
  logger((tokens, req, res) => {
    console.log(`${datetime.create().format("d.m.y H:M:S")}: ${tokens.method(req, res)} "${tokens.url(req, res)}" [${tokens.status(req, res)}] ${tokens["response-time"](req, res)}ms`);
  })
);

app.use(robots({
  UserAgent: '*',
  Disallow: '/'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? {...err, url: req.originalUrl} : {};
  res.locals.error.status = err.status || 500;
  res.status(err.status || 500);
  res.render(err.status == 404 ? 'error/404' : 'error/main');
});

module.exports = app;
