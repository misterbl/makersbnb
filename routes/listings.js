var express = require('express');
var router = express.Router();
var models = require('../models');
var Listing = require('../models').Listing;
var User = require('../models').User;
var session = require('express-session');


router.get('/', function(req, res) {
  var sess = req.session;
  var allListings;
  models.Listing.findAll({}).then(function(listings){
    allListings = listings;
    res.render('index.ejs', {allListings: allListings, sess: sess});
  });
});

router.get('/view/:listing_id', function(req, res) {
  var sess = req.session;
  var listing;
  var user;
  models.Listing.find({where: { id: req.params.listing_id}}).then(function(listing) {
    models.User.find({where: {id: listing.user_id}}).then(function(user){
    res.render('listing', {listing: listing, user: user, sess: sess});});
  });
});

router.get('/update/:listing_id', function(req, res) {
  var sess = req.session;
  var listing;
   models.Listing.find({where: {id: req.params.listing_id }}).then(function(listing){
     res.render('listing_update', {listing: listing, sess: sess});
   });
 });

router.get('/delete/:listing_id', function(req, res) {
  var sess = req.session;
  var listing;
  models.Listing.destroy({where: {id: req.params.listing_id }}).then(function(listing){
    res.redirect('/user');
  });
});

router.post('/updated/:listing_id', function(req,res){
  sess = req.session;
  var listing;
  models.Listing.find({where: {id: req.params.listing_id }}).then(function(listing){
    listing.update({name: req.body.name, description: req.body.description,
    price: req.body.price, image: req.body.image,}).then(function() {
      res.redirect('/user');
    });
  });
});

router.get('/new', function(req, res) {
  sess = req.session;
  models.Listing.findAll({}).then(function(listings) {
    res.render('listings/new', {sess: sess});
  });
});

router.post('/new', function(req, res) {
  sess = req.session;
  var user;
  models.User.find({ where: { email: sess.email } }).then(function(user){
    var listing = models.Listing.create({
      user_id: user.id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
    });
  });
  res.redirect('/user');
});

router.post('/book/:listing_id', function(req, res) {
  sess = req.session;
  var listing;
  var user;
  var booking;
  if (sess.email) {
  models.Booking.create({
    checkin: req.body.checkin,
    checkout:req.body.checkout,
    email: sess.email,
    listing_id: req.params.listing_id,
  }).then(function(booking){
      models.Listing.find({where: { id: req.params.listing_id}}).then(function(listing) {
        models.User.find({ where: { email: sess.email } }).then(function(user) {
    res.render('listing', {listing: listing, user: user, booking: booking, sess: sess});
   });
  // models.Listing.find({where: { id: req.params.listing_id}}).then(function(listing) {
  //     listing.update({booking_from: req.body.checkin, booking_until: req.body.checkout, booking_email: sess.email}).then(function() {
  //         models.User.find({ where: { email: sess.email } }).then(function(user) {
  //   res.render('listing', {listing: listing, user: user});});
  });
    });
  }
  else {
    res.render ('needlogin');
  }
      });


module.exports = router;
