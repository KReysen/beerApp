'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rating = sequelize.define('Rating', {
    score: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    review: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    beerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Rating.associate = function(models) {
    // associations can be defined here
    Rating.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });

    Rating.belongsTo(models.Beer, {
      foreignKey: "beerId",
      onDelete: "CASCADE"
    });
  };
  return Rating;
};