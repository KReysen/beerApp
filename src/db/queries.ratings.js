const Beer = require("./models").Beer;
const User = require("./models").User;
const Rating = require("./models").Rating;

// const Authorizer == require("../policies/rating");

module.exports = {
    createRating(newRating, callback){
        return Rating.create(newRating)
        .then((rating) => {
            callback(null, rating);
        })
        .catch((err) => {
            callback(err);
        });
    },

    deleteRating(req, callback){
        return Rating.findById(req.params.id)
        .then((rating) => {
            const authorized = new Authorizer(req.user, rating).destroy();
            if(authorized){
                rating.destroy();
                callback(null, rating)
            } else {
                req.flash("notice", "You are not authorized to do that")
                callback(401)
            }
        })
    }
    
}