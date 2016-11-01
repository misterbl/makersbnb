var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var models = require('./models');
var User = require('./models').User;
var index = require('./routes/index');
var users = require('./routes/users');
var validator = require('validator');
var app = express();
var session = require('express-session');
var validator = require('validator');

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
app.get('/',function(req,res){
sess = req.session;
//Session set when user Request our app via URL
if(sess.email) {
/*
* This line check Session existence.
* If it existed will do some action.
*/
    res.redirect('/admin');
}
else {
    res.render('index.ejs');
}
});

app.post('/login',function(req,res){
    return models.User.count({ where: { email: req.body.email } && { password: req.body.password } })
      .then(count => {
        if (count !== 0) {
          sess.email=req.body.email;
          res.redirect('/admin');
        }
        res.render('login_error');
    });
});


//In this we are assigning email to sess.email variable.
//email comes from HTML page.
//   try {
//     models.User.findAll({
//       where: {
//         email: req.body.email
//       }
//     }).then(function(emailCheck));
//     console.log(emailCheck);
//     if(emailCheck.email === null) {
//       console.log("Invalid email");
//       res.redirect("/");
//     }
//     sess.email=req.body.email;
//     res.redirect('/admin');
//   }
//   catch(err) {
//     console.log("Email does not exist");
//     console.log(err);
//   }
// });

app.get('/admin',function(req,res){
  sess = req.session;
if(sess.email) {
res.render('admin');
res.end('<a href="+">Logout</a>');
} else {
    res.write('Please login first');
    res.end('<a href="+">Login</a>');
}
});

app.get('/logout',function(req,res){
req.session.destroy(function(err) {
  if(err) {
    console.log(err);
  } else {
    res.redirect('/');
  }
});
});

// enable ejs layouts
app.use(expressLayouts);

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// var app = express();
// var sess = {
//   secret: 'keyboard cat',
//   cookie: {}
// };
// if (app.get('env') === 'production') {
//   app.set('trust proxy', 1); // trust first proxy
//   sess.cookie.secure = true; // serve secure cookies
// }
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
