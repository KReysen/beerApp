const ratingQueries = require("../db/queries.ratings.js");
const Authorizer = require("../policies/rating.js");

module.exports = {
    create(req, res, next){
        const authorized = new Authorizer(req.user).create();
        if(authorized) {
            let newRating = {
                score: req.body.score,
                review: req.body.review,
                userId: req.user.id,
                beerId: req.params.beerId
            };
            ratingQueries.createRating(newRating, (err, rating) => {
                if(err){
                    req.flash("error", err);
                }
                res.redirect(req.headers.referer);
            });
        } else {
            req.flash("notice", "You must be signed in to do that")
            req.redirect("/users/sign_in");
        }
    },
    destroy(req, res, next){
        ratingQueries.deleteRating(req, (err, rating) => {
            if(err){
                res.redirect(err, req.headers.referer);
            } else {
                res.redirect(req.headers.referer);
            }
        });
    }
}