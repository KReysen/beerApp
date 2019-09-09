const Beer = require("./models").Beer;

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
        return Beer.findById(id)
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
    }
    
}