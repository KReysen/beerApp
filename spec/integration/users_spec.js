const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/users/";
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;
const Beer = require("../../src/db/models").Beer;
const Rating = require("../../src/db/models").Rating;

describe("routes : users", () => {

    beforeEach((done) => {
  
      sequelize.sync({force: true})
      .then(() => {
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  
    });
  
    describe("GET /users/sign_up", () => {
  
      it("should render a view with a sign up form", (done) => {
        request.get(`${base}sign_up`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Sign up");
          done();
        });
      });
  
    });

    describe("GET /users/sign_in", () => {

      it("should render a view with a sign in form", (done) => {
        request.get(`${base}sign_in`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Sign in");
          done();
        });
      });
 
    });

    describe("GET /users/:id", () => {
      beforeEach((done) => {
        this.user;
        this.rating;
        this.beer;

        User.create({
          username: "newuser",
          email: "newuser@email.com",
          password: "GoBuffs"
        })
        .then((res) => {
          this.user = res;

          Beer.create({
            name: "Amber Ale",
            description: "The beer that helped build our brewery",
            abv: 5.8,
            style: "Amber",
            brewery: "Bells Brewing",
          })
          .then((res) => {
            this.beer = res;

            Rating.create({
              score: 7,
              review: "A malty delight",
              userId: this.user.id,
              beerId: this.beer.id
          
            })
            .then((res) => {
              this.rating = res;
              done();
            })
          })
        })
      });

      it("should present a list of ratings a user has created", (done) => {
        request.get(`${base}${this.user.id}`, (err, res, body) => {
          expect(body).toContain("A malty delight");
          done();
        });
      });
    });

    describe("POST /users", () => {

            it("should create a new user with valid values and redirect", (done) => {
        
              const options = {
                url: base,
                form: {
                  username: "example",
                  email: "user@example.com",
                  password: "123456789"
                }
              }
        
              request.post(options,
                (err, res, body) => {
        
                  User.findOne({where: {email: "user@example.com"}})
                  .then((user) => {
                    expect(user).not.toBeNull();
                    expect(user.email).toBe("user@example.com");
                    expect(user.id).toBe(1);
                    done();
                  })
                  .catch((err) => {
                    console.log(err);
                    done();
                  });
                }
              );
            });

            it("should not create a new user with invalid attributes and redirect", (done) => {
              request.post(
                {
                  url: base,
                  form: {
                    username: "invalid",
                    email: "no",
                    password: "123456789"
                  }
                },
                (err, res, body) => {
                  User.findOne({where: {email: "no"}})
                  .then((user) => {
                    expect(user).toBeNull();
                    done();
                  })
                  .catch((err) => {
                    console.log(err);
                    done();
                  });
                }
              );
            });
        
          });
  
  });