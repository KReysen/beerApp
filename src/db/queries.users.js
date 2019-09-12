const User = require("./models").User;
const bcrypt = require("bcryptjs");
const Rating = require("./models").Rating;
const Beer = require("./models").Beer;

module.exports = {

    createUser(newUser, callback){

        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(newUser.password, salt);
    
        return User.create({
          username: newUser.username,
          email: newUser.email,
          password: hashedPassword
        })
        .then((user) => {
          callback(null, user);
        })
        .catch((err) => {
          callback(err);
        })
      },

    getUser(id, callback){
        let result = {};
        User.findById(id, {
          include: [
            {model: Rating, as: "ratings", include: [
              {model: Beer}
            ]},
          ]
        })
        .then((user) => {
            if(!user) {
                callback(404);
            } else {
                result["user"] = user;
                Rating.scope({method: ["lastFiveFor", id]}).findAll()
                .then((ratings) => {
                  result["ratings"] = ratings;
                  callback(null, result);
                })
                .catch((err) => {
                  callback(err);
                })
            }
        })
    }

}