const sequelize = require("../../src/db/models/index").sequelize;
const Beer = require("../../src/db/models").Beer;
const User = require("../../src/db/models").User;
const Rating = require("../../src/db/models").Rating;

describe("Rating", () => {
    beforeEach((done)=> {
        this.user;
        this.beer;
        this.rating;
        sequelize.sync({force: true}).then((res) => {

            User.create({
                username: "LeoCat",
                email: "Leo@cat.com",
                password: "password"
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
// tests for create action
    describe("#create()", () => {
        it("should create a rating object with a score, review, assigned beer and user", (done) => {
            Rating.create({
                score: 6,
                review: "Above average",
                userId: this.user.id,
                beerId: this.beer.id
            })
            .then((rating) => {
                expect(rating.score).toBe(6);
                expect(rating.review).toBe("Above average");
                expect(rating.userId).toBe(this.user.id);
                expect(rating.beerId).toBe(this.beer.id);
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
        it("should not create a rating with missing score, assigned beer or user", (done) => {
            Rating.create({
                review: "Mediocre",
                userId: this.user.id
            })
            .then((rating) => {
                // nothing
                done();
            })
            .catch((err) => {
                expect(err.message).toContain("Rating.beerId cannot be null");
                expect(err.message).toContain("Rating.score cannot be null");
                done();
            })
        });
    });  // end tests for create action
    describe("#setUser()", () => {

        it("should associate a rating and a user together", (done) => {
    
          User.create({               // create an unassociated user
            username: "BobExample",
            email: "bob@example.com",
            password: "password"
          })
          .then((newUser) => {        // pass the user down
    
            expect(this.rating.userId).toBe(this.user.id); // confirm the rating belongs to another user
    
            this.rating.setUser(newUser)                   // then reassign it
            .then((rating) => {
    
              expect(rating.userId).toBe(newUser.id);      // confirm the values persisted
              done();
    
            });
          })
        });
    
      });

      describe("#getUser()", () =>{
          it("should return the associated user", (done) => {
              this.rating.getUser()
              .then((associatedUser) => {
                  expect(associatedUser.email).toBe("Leo@cat.com");
                  done();
              });
          });
      });

      describe("#setBeer()", () => {
          it("should associate a beer and a rating together", (done) => {
              Beer.create({
                  name: "Brut IPA",
                  description: "Extra extra dry",
                  abv: 6.6,
                  style: "IPA",
                  brewery: "Sandpaper brewing"
              })
              .then((newBeer) => {
                  expect(this.rating.beerId).toBe(this.beer.id);
                  this.rating.setBeer(newBeer)
                  .then((rating) => {
                      expect(rating.beerId).toBe(newBeer.id);
                      done();
                  });
              })
          });
      });

      describe("#getBeer()", () => {
          it("should return the associated beer", (done) => {
              this.rating.getBeer()
              .then((associatedBeer) => {
                  expect(associatedBeer.name).toBe("No-Coast IPA");
                  done();
              });
          });
      });


});