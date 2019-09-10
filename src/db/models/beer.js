'use strict';
module.exports = (sequelize, DataTypes) => {
  var Beer = sequelize.define('Beer', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    abv: {
      type: DataTypes.FLOAT
    },
    style: {
      type: DataTypes.STRING,
      allowNull: false
    },
    brewery: {
      type: DataTypes.STRING,
      
    },
  }, {});
  Beer.associate = function(models) {
    // associations can be defined here
    Beer.hasMany(models.Rating, {
      foreignKey: "beerId",
      as: "ratings"
    });
  };
  return Beer;
};