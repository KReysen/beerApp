'use strict';
const bcrypt = require("bcryptjs");

const faker = require("faker");

const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync();
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
}

let users = [
  {
    username: "LeoCat",
    password: encryptPassword('password'),
    email: "Leo@cat.com",
    role: "member",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: "MackDog",
    password: encryptPassword('password1'),
    email: "Mack@dog.com",
    role: "member",
    createdAt: new Date(),
    updatedAt: new Date()
  }

]
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", users, {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
