const express = require("express");
const router = express.Router();

const beerController = require("../controllers/beerController");

router.get("/beers", beerController.index);
router.get("/beers/new", beerController.new);
router.get("/beers/:id", beerController.show);
router.get("/beers/:id/edit", beerController.edit);

router.post("/beers/create", beerController.create);
router.post("/beers/:id/destroy", beerController.destroy);
router.post("/beers/:id/update", beerController.update);

module.exports = router;