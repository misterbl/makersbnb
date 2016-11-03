var express = require('express');
var router = express.Router();
var models = require('../models');
var Listing = require('../models').Listing;
var User = require('../models').User;
var session = require('express-session');
var sess;


router.get('/', function(req, res) {
  sess = req.session;
  res.redirect('/user/my_account');
});

router.get('/my_account', function(req, res) {
  sess = req.session;
  var user;
  var listings;
  models.User.find({ where: { email: sess.email } }).then(function(user) {
    models.Listing.findAll({ where: { user_id: user.id } }).then(function(listings) {
      res.render('admin', {user: user, listings: listings, sess: sess
      });
    });
  });
});

router.get('/new', function(req, res) {
  sess = req.session;
  res.render('user/new.ejs', {
    sess: sess
  });
});

router.post('/create', function(req, res) {
  sess = req.session;
  models.User.count({ where: { email: req.body.email} }).then(function(user) {
    if (user ===0) {
      models.User.create({
        username: req.body.username,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
      });
      sess.email=req.body.email;
      res.redirect('/user');
    }
    else {
      res.render('user_exists');
    }
  });
});

module.exports = router;
