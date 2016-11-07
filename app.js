var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var models = require('./models').User;
var index = require('./routes/index');
var listings = require('./routes/listings');
var user = require('./routes/user');
var validator = require('validator');
var app = express();
var session = require('express-session');
var pg = require('pg');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'ssshhhhh'}));
var sess;
app.use('/', index);
app.use('/listings', listings);
app.use('/user', user);

app.get('/',function(req,res){
  res.redirect('/home');
  // sess = req.session;
  // var allListings;
  // models.Listing.findAll({}).then(function(listings){
  //   allListings = listings;
  //   res.render('index.ejs', {allListings: allListings});
  // });
});


app.get('/logout',function(req,res) {
  req.session.destroy(function(err) {
    res.redirect('/');
  });
});


app.use(expressLayouts);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(session(sess));
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
