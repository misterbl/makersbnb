var express = require('express');
var router = express.Router();
var models = require('../models');
var Listing = require('../models').Listing;
var session = require('express-session');


router.get('/home', function(req, res) {
  res.render('home');
});

// router.post('/user/create', function(req, res) {
//     models.User.create({
//     username: req.body.username,
//     email: req.body.email,
//     firstname: req.body.firstname,
//     lastname: req.body.lastname,
//     password: req.body.password
//   });
//   sess = req.session;
//   sess.email=req.body.email;
//   res.redirect('/admin');
//
// });
router.post('/login',function(req,res){
    return models.User.count({ where: { email: req.body.email } && { password: req.body.password } })
      .then(count => {
        if (count !== 0) {
          sess = req.session;
          sess.email=req.body.email;
          res.redirect('/user');
        }
        res.render('login_error');
    });
});

// router.get('/new_listing', function(req, res) {
//   models.Listing.findAll({}).then(function(listings) {
//     res.json(listing);
//   });
// });
//
// router.post('/new_listing', function(req, res) {
//   var user;
//   models.User.find({ where: { email: sess.email } }).then(function(user){
//     var listing = models.Listing.create({
//       user_id: user.id,
//       name: req.body.name,
//       description: req.body.description,
//       price: req.body.price,
//       image: req.body.image,
//     });
//   });
//   res.redirect('/admin');
// });

// router.get('/admin',function(req, res){
//   sess = req.session;
//   var user;
//   var listings;
//   models.User.find({ where: { email: sess.email } }).then(function(user) {
//   models.Listing.findAll({ where: { user_id: user.id } }).then(function(listings) {
//     res.render('admin', {user: user, listings: listings});});
//   });
// });

// router.get('/listing/:listing_id', function(req, res) {
//   var listing;
//   var user;
//   models.Listing.find({where: { id: req.params.listing_id}}).then(function(listing) {
//     models.User.find({where: {id: listing.user_id}}).then(function(user){
//     res.render('listing', {listing: listing, user: user});});
//   });
// });
//  router.get('/update/:listing_id', function(req, res) {
//   var listing;
//    models.Listing.find({where: {id: req.params.listing_id }}).then(function(listing){
//      res.render('listing_update', {listing: listing});
//    });
//  });
// router.post('/updated/:listing_id', function(req,res){
//   var listing;
//   models.Listing.find({where: {id: req.params.listing_id }}).then(function(listing){
//     listing.update({name: req.body.name, description: req.body.description,
//     price: req.body.price, image: req.body.image,}).then(function() {
//       res.redirect('/admin');
//     });
//   });
// });
module.exports = router;
