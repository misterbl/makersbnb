// var databaseCleaner = require('./TestHelper/databaseCleanerSetup');
var expect = require('chai').expect;
var request = require('request');
var sinon = require('sinon');
var app = require('../app');
var nock = require('nock');


describe('app.js main page', function(){
  var url = "http://localhost:3000";
  it('loads the / route and returns a 200 ok', function(){
    // request(url, function(err, res, req){
    //   expect(res.statusCode).to.equal(200);
    //   done();
    // });
  });
});



// tests to carry out:
//
//   register feature (can sign up, missmatching password, missing info, incorrect email format, account already exists.)
//   login feature (right credentials, wrong credentials)
//   logout feature (success)
//   post a listing feature (create a listing when logged in, can't create a listing when not logged in.)
