var express = require('express');
var router = express.Router();
var models = require('../models');
var Listing = require('../models').Listing;

/* GET home page/listings. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/user/create', function(req, res) {
    models.User.create({
    username: req.body.username,
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });
    res.redirect('/');
});

router.get('/new_listing', function(req, res) {
  models.Listing.findAll({}).then(function(listings) {
    res.json(listing);
  });
});

router.post('/new_listing', function(req, res) {
    models.Listing.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
  });

});


module.exports = router;
