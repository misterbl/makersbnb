NODE_ENV = 'test';
var DatabaseCleaner = require('database-cleaner');
var databaseCleaner = new DatabaseCleaner('postgres');

databaseCleaner.clean(`http://localhost/makersbnb${process.env.NODE_ENV}`, function(){});


module.exports = databaseCleaner;
