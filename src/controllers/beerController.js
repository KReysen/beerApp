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
    },
    new(req, res, next){
        res.render("beers/new");
    },
    create(req, res, next){
        let newBeer = {
            name: req.body.name,
            description: req.body.description,
            abv: req.body.abv,
            style: req.body.style,
            brewery: req.body.brewery
        };
        beerQueries.addBeer(newBeer, (err, beer) => {
            if(err){
                res.redirect(500, "/beers/new");
            } else {
                res.redirect(303, `/beers/${beer.id}`)
            }
        });
    },
    show(req, res, next){
        beerQueries.getBeer(req.params.id, (err, beer) => {
            if(err || beer == null){
                res.redirect(404, "/");
            } else {
                res.render("beers/show", {beer});
            }
        });
    },

    destroy(req, res, next){
        beerQueries.deleteBeer(req.params.id, (err, beer) => {
            if(err){
                res.redirect(500, `/beers/${beer.id}`)
            } else {
                res.redirect(303, "/beers")
            }
        });
    },

    edit(req, res, next){
        beerQueries.getBeer(req.params.id, (err, beer) => {
            if(err || beer == null){
                res.redirect(404, "/");
            } else {
                res.render("beers/edit", {beer});
            }
        });
    },

    update(req, res, next){
        beerQueries.updateBeer(req.params.id, req.body, (err, beer) => {
            if(err || beer == null){
                res.redirect(404, `/beers/${req.params.id}/edit`);
            } else {
                res.redirect(`/beers/${beer.id}`);
            }
        });
    }

}