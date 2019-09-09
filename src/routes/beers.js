const express = require("express");
const router = express.Router();

const beerController = require("../controllers/beerController");

router.get("/beers", beerController.index);
router.get("/beers/new", beerController.new);
router.get("/beers/:id", beerController.show);

router.post("/beers/create", beerController.create);
router.post("/beers/:id/destroy", beerController.destroy);

module.exports = router;