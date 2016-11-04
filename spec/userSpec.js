var models = require('../models');
var User = require('../models').User;
var user = require('SpecHelper')


describe ('User', function () {
  var user;




  it ('has a username', function () {
    user = models.User.create({
        username: 'Blanca',
        email: 'blanca@makers.com',
        firstname: 'Blanca',
        lastname: 'Spanish',
        password: 'password2016'
    });
    expect(user._boundTo.dataValues.username).toBe("Blanca");
});

  });
