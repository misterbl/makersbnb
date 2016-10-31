var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  models.User.findAll({
    include: [models.Listing]
  }).then(function(users) {
    res.render('index', {
      title: 'MakersBnB',
      users: users
    });
  });
});

module.exports = router;
