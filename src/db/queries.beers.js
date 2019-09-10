const Beer = require("./models").Beer;
const Rating = require("./models").Rating;
const User = require("./models").User;

module.exports = {
    getAllBeers(callback){
        return Beer.findAll()
        .then((beers) => {
            callback(null, beers);
        })
        .catch((err) => {
            callback(err);
        })
    },
    addBeer(newBeer, callback){
        return Beer.create({
            name: newBeer.name,
            description: newBeer.description,
            abv: newBeer.abv,
            style: newBeer.style,
            brewery: newBeer.brewery
        })
        .then((beer) => {
            callback(null, beer);
        })
        .catch((err) => {
            callback(err);
        })
    },
    getBeer(id, callback){
        return Beer.findById(id, {
            include: [
                {model: Rating, as: "ratings", include: [
                    {model: User }
                ]}
            ]
        })
        .then((beer) => {
            callback(null, beer);
        })
        .catch((err) => {
            callback(err);
        })
    },
    deleteBeer(id, callback){
        return Beer.destroy({
            where: {id}
        })
        .then((beer) => {
            callback(null, beer);
        })
        .catch((err) => {
            callback(err);
        })
    },
    updateBeer(id, updatedBeer, callback) {
        return Beer.findById(id)
        .then((beer) => {
            if(!beer){
                return callback("Beer not found");
            }
            beer.update(updatedBeer, {
                fields: Object.keys(updatedBeer)
            })
            .then(() => {
                callback(null, beer);
            })
            .catch((err) => {
                callback(err);
            });
        });
    }

}