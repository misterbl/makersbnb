process.env.NODE_ENV = 'test';
var expect = require('chai').expect;
var request = require('request');
var sinon = require('sinon');
var app = require('../app');
var nock = require('nock');
var http = require('http');
var Browser = require('zombie');
var User = require('../models').User;
// var index = require('../models/index');

// var DatabaseCleaner = require('database-cleaner');
// var databaseCleaner = new DatabaseCleaner('postgres');
// databaseCleaner.clean(`postgres://localhost/makersbnb_${process.env.NODE_ENV}`, function(){});



describe('sign up form', function(){
  before(function(){
    this.server = http.createServer(app).listen('3000');
    this.browser = new Browser ({site: 'http://localhost:3000'});
  });


  beforeEach(function(done){

    this.browser.visit('/listings', done);
  });



  it('shows the sign up form', function(){
    expect(this.browser.success).to.be.ok;
    expect(this.browser.text('h1')).contain('Create new acount')

  });

  it('successful sign up with correct data', function(){
    var browser = this.browser;
    browser.fill('username', 'Laszlo');
    browser.fill('email', 'laszlo@makers.com');
    browser.fill('firstname', 'Laszlo');
    browser.fill('lastname', 'Bogacsi');
    browser.fill('password', 'password');
    browser.pressButton('Create user').then(function(){
      expect(browser.success).to.be.ok;

    });

  });

  it('refuse empty submissions', function(){

  });

  it('refuse submission if required data is missing', function(){

  });

  it('keeps values on partial submission', function(){

  });

  it('refuse when email format is incorrect', function(){

  });

  it('successful sign up with correct data', function(){

  });

  after(function(done){
    this.server.close(done);
  });
});
