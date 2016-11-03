var express = require('express');
var router = express.Router();
var models = require('../models');
var Listing = require('../models').Listing;
var User = require('../models').User;
var session = require('express-session');
var sess;


router.get('/', function(req, res) {
  res.redirect('/user/my_account')
})

router.get('/my_account', function(req, res) {
  sess = req.session;
  var user;
  var listings;
  models.User.find({ where: { email: sess.email } }).then(function(user) {
    models.Listing.findAll({ where: { user_id: user.id } }).then(function(listings) {
      res.render('user', {user: user, listings: listings
      });
    });
  });
});

router.post('/create', function(req, res) {
    models.User.create({
    username: req.body.username,
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password
  });
  sess = req.session;
  sess.email=req.body.email;
  res.redirect('/admin');

});

module.exports = router;
