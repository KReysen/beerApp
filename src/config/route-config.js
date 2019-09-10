module.exports = {
    init(app){

      const staticRoutes = require("../routes/static");
      const userRoutes = require("../routes/users");
      const beerRoutes = require("../routes/beers");
      const ratingRoutes = require("../routes/ratings");


      app.use(staticRoutes);
      app.use(userRoutes);
      app.use(beerRoutes);
      app.use(ratingRoutes);
    }
  }