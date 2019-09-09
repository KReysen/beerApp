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
    }
}