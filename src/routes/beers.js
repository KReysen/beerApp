const express = require("express");
const router = express.Router();

const beerController = require("../controllers/beerController");

router.get("/beers", beerController.index);

module.exports = router;