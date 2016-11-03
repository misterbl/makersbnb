var express = require('express');
var router = express.Router();
var models = require('../models');
var Listing = require('../models').Listing;
var session = require('express-session');


router.get('/home', function(req, res) {
  res.render('home');
});

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

module.exports = router;
