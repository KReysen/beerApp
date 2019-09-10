'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: "must be a valid email" }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "member"
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Rating, {
      foreignKey: "userId",
      as: "ratings"
    });
  };

  User.prototype.isAdmin = function() {
    return this.role === "admin";
  };

  return User;
};