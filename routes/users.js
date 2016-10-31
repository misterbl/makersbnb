var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST new user. */
router.post('/create', function(req, res) {
  models.User.create({
    username: req.body.username
  }).then(function() {
    res.redirect('/');
  });
});

/* POST new listing for user. */
router.post('/:user_id/listings/create', function (req, res) {
  models.Listing.create({
    UserId: req.params.user_id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  }).then(function() {
    res.redirect('/');
  });
});

module.exports = router;
