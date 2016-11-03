// var databaseCleaner = require('./TestHelper/databaseCleanerSetup');
var expect = require('chai').expect;
var request = require('request');
var sinon = require('sinon');
var app = require('../app');


describe('app.js main page', function(){
  var url = "http://localhost:3000";
  it('loads the / route and returns a 200 ok', function(done){
    request(url, function(err, res, req){
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
