const beerQueries = require("../db/queries.beers.js");

module.exports = {
    index(req, res, next) {
        beerQueries.getAllBeers((err, beers) => {
            if(err){
                res.redirect(500, "static/index");
            } else {
                res.render("beers/index", {beers});
            }
        })
    }

}