const express = require("express");
const router = express.Router();

const ratingController = require("../controllers/ratingController");
const validation = require("./validation");

router.post("/beers/:beerId/ratings/create", validation.validateRatings, ratingController.create);
router.post("/beers/:beerId/ratings/:id/destroy", ratingController.destroy);

module.exports = router;