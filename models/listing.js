'use strict';
module.exports = function(sequelize, DataTypes) {
  var Listing = sequelize.define('Listing', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING,
    booking_from: DataTypes.STRING,
    booking_until: DataTypes.STRING,
    booking_email: DataTypes.STRING
  },
  {
    classMethods: {
      associate: function(models) {
        Listing.belongsTo(models.User, { foreignKey: 'user_id' });
      }
    }
  });
  return Listing;
};
