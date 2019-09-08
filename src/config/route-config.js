module.exports = {
    init(app){

      const staticRoutes = require("../routes/static");
      const userRoutes = require("../routes/users");
      const beerRoutes = require("../routes/beers");


      app.use(staticRoutes);
      app.use(userRoutes);
      app.use(beerRoutes);
    }
  }