'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    password: DataTypes.STRING
  });

  // ,{
  //   classMethods: {
  //     associate: function(models) {
  //       User.hasMany(models.Listing, { foreignKey: 'user_id'});
  //     }
  //   }
  // });
  return User;
};
