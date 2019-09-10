const express = require("express");
const router = express.Router();

const ratingController = require("../controllers/ratingController");
const validation = require("./validation");
const helper = require("../auth/helpers");



router.post("/beers/:beerId/ratings/create", helper.ensureAuthenticated, validation.validateRatings, ratingController.create);
router.post("/beers/:beerId/ratings/:id/destroy", ratingController.destroy);

module.exports = router;