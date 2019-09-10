'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rating = sequelize.define('Rating', {
    rating: DataTypes.FLOAT,
    review: DataTypes.STRING
  }, {});
  Rating.associate = function(models) {
    // associations can be defined here
  };
  return Rating;
};