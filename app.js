var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

//connect database
var dbURL = 'mongodb://localhost:27017/5620';
mongoose.connect(dbURL, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("连接成功");
    }
});

//设置session
app.use(session({
  name: 'sessionTest',    //session的名字叫sessionTest,id叫loginUser,value为我存的对象
  secret: '5620',  // 用来对session中id相关的cookie进行签名
  saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
  resave: false,  // 是否每次都重新保存会话，建议false
  cookie: {
      maxAge: 1200*1000  // 有效期，单位是毫秒
  }
}));

//解决跨域
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,OPTIONS")
  res.header("Access-Control-Allow-Headers", "Content-Type,Access-Token");
  if (req.method == "OPTIONS") res.sendStatus(200);/*让options请求快速返回*/
  else next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
