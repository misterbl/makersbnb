var express = require('express');
var router = express.Router();
var models = require('../models');
var Listing = require('../models').Listing;
var session = require('express-session');
/* GET home page/listings. */

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
router.post('/login',function(req,res){
    return models.User.count({ where: { email: req.body.email } && { password: req.body.password } })
      .then(count => {
        if (count !== 0) {
          sess = req.session;
          sess.email=req.body.email;
          res.redirect('/admin');
        }
        res.render('login_error');
    });
});

router.get('/new_listing', function(req, res) {
  models.Listing.findAll({}).then(function(listings) {
    res.json(listing);
  });
});

router.post('/new_listing', function(req, res) {
    var listing = models.Listing.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
  });
  // var user = models.User.findAll({ where: { email: sess.email }})
  // user.listings.push(listing);
  res.redirect('/admin');
});

router.get('/admin',function(req,res){
  var user;
  console.log(models.User.findAll({ where: { email: sess.email } }).then(function(user){return user;}));

  sess = req.session;
  sess.email;
    res.render('admin', {user: user});

});

module.exports = router;
