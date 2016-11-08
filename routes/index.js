var express = require('express');
var router = express.Router();
var models = require('../models');
var Listing = require('../models').Listing;
var User = require('../models').User;
var session = require('express-session');
var sess;


router.get('/home', function(req, res) {
  sess = req.session;
  models.Listing.findAll().then(function(listings) {
    res.render('home', {
      sess: sess,
      listingOne: listings[0],
      listingTwo: listings[1]
    });
  });
});

router.get('/login', function(req, res) {
  var sess = req.session;
  res.render('login', {sess: sess});
});

router.post('/login',function(req,res){
  sess = req.session;
  return models.User.count({ where: { email: req.body.email } && { password: req.body.password } })
  .then(count => {
    if (count !== 0) {
      sess.email=req.body.email;
      res.redirect('/user');
    }
    res.render('login_error', {
      sess: sess
    });
  });
});

router.post('/booking/accept/:booking_id', function(req, res) {
  sess = req.session;
  var user;
  var booking;
  models.Booking.find({where: {id: req.params.booking_id }}).then(function(booking) {
    booking.update({accepted: true}).then(function(){
      res.redirect('/user/my_account');
    });
  });
});
  router.post('/booking/reject/:booking_id', function(req, res) {
    sess = req.session;
    var user;
    var booking;
    models.Booking.find({where: {id: req.params.booking_id }}).then(function(booking) {
      booking.update({accepted: false}).then(function(){
        res.redirect('/user/my_account');
      });
    });
  });

  router.post('/booking/delete/:booking_id', function(req, res) {
    sess = req.session;
    var user;
    var booking;
    models.Booking.destroy({where: {id: req.params.booking_id }}).then(function(booking) {
        res.redirect('/user/my_account');
      });
});



module.exports = router;
