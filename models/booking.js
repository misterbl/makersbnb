'use strict';
module.exports = function(sequelize, DataTypes) {
  var Booking = sequelize.define('Booking', {
    checkin: DataTypes.STRING,
    checkout: DataTypes.STRING,
    price: DataTypes.INTEGER,
    email: DataTypes.STRING,
    accepted: DataTypes.BOOLEAN,
    complete: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        Booking.belongsTo(models.Listing, { foreignKey: 'listing_id' });
      }
    }
  });
  return Booking;
};
