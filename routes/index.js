var express = require('express');
var router = express.Router();
var models = require('../models');
var Listing = require('../models').Listing;
var session = require('express-session');
/* GET home page/listings. */
router.get('/', function(req, res, next) {
  // sess=req.session;
  res.render('index');
});

router.post('/user/create', function(req, res) {
    models.User.create({
    username: req.body.username,
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password
  });
    res.render('admin');

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

router.get('/admin',function(req,res){
  sess = req.session;
  sess.email;
    res.render('admin');



});

module.exports = router;
