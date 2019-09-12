'use strict';

let beers = [
  {
    name: "Amber Ale",
    description: "The beer that helped build our brewery",
    abv: 5.8,
    style: "Amber",
    brewery: "Bells Brewing",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Grapefruit Shandy",
    description: "A refreshing blend of lager and grapefruit juice",
    abv: 4.7,
    style: "Fruit Beer",
    brewery: "Avery Brewing",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Colorado Lager",
    description: "It’s a style we love to drink, and we think there’s a place for a lager in the craft beer lover’s fridge.",
    abv: 5,
    style: "Lager",
    brewery: "Odell Brewing Co",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Stone IPA",
    description: "The original for hopheads",
    abv: 6.9,
    style: "IPA",
    brewery: "Stone Brewing",
    createdAt: new Date(),
    updatedAt: new Date(),
  }
]

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Beers", beers, {});
   
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Beers", null, {});

  }
};
