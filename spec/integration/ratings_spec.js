const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/beers/";
const sequelize = require("../../src/db/models/index").sequelize;
const Beer = require("../../src/db/models").Beer;
const User = require("../../src/db/models").User;
const Rating = require("../../src/db/models").Rating;

describe("routes : ratings", () => {
    beforeEach((done)=> {
        this.user;
        this.beer;
        this.rating;
        sequelize.sync({force: true}).then((res) => {

            User.create({
                username: "LeoCat",
                email: "Leo@cat.com",
                password: "password",
                role: "member"
            })
            .then((user) => {
                this.user = user;

                Beer.create({
                    name: "No-Coast IPA",
                    description: "A beer for no coasts",
                    abv: 7,
                    style: "IPA",
                    brewery: "Bathtub Brewing Co"
                })
                .then((beer) => {
                    this.beer = beer;

                    Rating.create({
                        score: 9,
                        review: "Second best beer ever made",
                        userId: this.user.id,
                        beerId: this.beer.id
                    })
                    .then((rating) => {
                        this.rating = rating;
                        done();
                    })
                    .catch((err) => {
                        console.log(err);
                        done();
                    });
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });
    });
// test suites here
// guest context
  describe("guest attempting to rate beer or delete ratings", () => {
      beforeEach((done) => {
          request.get({
              url: "http://localhost:3000/auth/fake",
              form: {
                  userId: 0
              }
          },
          (err, res, body) => {
              done();
          }
          );
      });
      describe("POST /beers/:beerId/ratings/create", () => {
          it("should not create a new rating", (done) => {
              const options = {
                  url: `${base}${this.beer.id}/ratings/create`, 
                  form: {
                      score: 6,
                      review: "This beer is amazing!"
                  }
              };
              request.post(options,
                (err, res, body) => {
                    Rating.findOne({where: {review: "This beer is amazing!"}})
                    .then((rating) => {
                        expect(rating).toBeNull();
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
      describe("POST /beers/:beerId/ratings/:id/destroy", () => {
          it("should not delete the rating with the associated ID", (done) => {
              Rating.findAll()
              .then((ratings) => {
                  const ratingCountBeforeDelete = ratings.length;
                  expect(this.ratingCountBeforeDelete).toBe(1);
                  request.post(
                      `${base}${this.beer.id}/ratings/${this.rating.id}/destroy`,
                      (err, res, body) => {
                          Rating.findAll()
                          .then((ratings) => {
                              expect(err).toBeNull();
                              expect(ratings.length).toBe(ratingCountBeforeDelete);
                              done();
                          })
                      });
              })
          });
      });

  });  //end guest context

  describe("signed in user performing CRUD options for rating", () => {
      beforeEach((done) => {
          request.get({
              url: "http://localhost:3000/auth/fake",
              form: {
                  role: "member",
                  userId: this.user.id
              }
          },
          (err, res, body) => {
              done();
          }
          );
      });
      describe("POST /beers/:beerId/ratings/create", () => {
          it("should create a new rating and redirect", (done) => {
            const options = {
                url: `${base}${this.beer.id}/ratings/create`, 
                form: {
                    score: 6,
                    review: "This beer is amazing!"
                }
            };
            request.post(options,
              (err, res, body) => {
                  Rating.findOne({where: {review: "This beer is amazing!"}})
                  .then((rating) => {
                    expect(rating).not.toBeNull();
                      expect(rating.score).toBe(6);
                      expect(rating.review).toBe("This beer is amazing!");
                      expect(rating.id).not.toBeNull();
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

      describe("POST /beers/:beerId/ratings/:id/destroy", () => {
        it("should delete the rating with the associated ID", (done) => {
            Rating.findAll()
            .then((ratings) => {
                const ratingCountBeforeDelete = ratings.length;
                expect(this.ratingCountBeforeDelete).toBe(1);
                request.post(
                    `${base}${this.beer.id}/ratings/${this.rating.id}/destroy`,
                    (err, res, body) => {
                        expect(res.statusCode).toBe(302);
                        Rating.findAll()
                        .then((ratings) => {
                            expect(err).toBeNull();
                            expect(ratings.length).toBe(ratingCountBeforeDelete - 1);
                            done();
                        })
                    });
            })
        });
    });

  }); // end user context

});