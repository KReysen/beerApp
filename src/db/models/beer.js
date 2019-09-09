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
      type: DataTypes.INTEGER
    },
    style: {
      type: DataTypes.STRING,
      allowNull: false
    },
    brewery: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  Beer.associate = function(models) {
    // associations can be defined here
  };
  return Beer;
};