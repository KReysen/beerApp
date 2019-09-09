const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/beers/";
const sequelize = require("../../src/db/models/index").sequelize;
const Beer = require("../../src/db/models").Beer;

describe("routes : beers", () => {

    beforeEach((done) => {
        this.beer;
        sequelize.sync({force: true}).then((res) => {
            Beer.create({
                name: "Stone IPA",
                description: "The IPA That Launched Generations of Hop Fanatics",
                abv: 6.9,
                style: "India Pale Ale",
                brewery: "Stone Brewing"
            })
            .then((beer) => {
                this.beer = beer;
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });

    describe("GET /beers", () => {
        it("should return a status code 200 and all beers", (done) => {
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(err).toBeNull();
                expect(body).toContain("Beers");
                expect(body).toContain("Stone IPA");
                done();
            });
        });
    });

    describe("GET /beers/new", () => {
        it("should render a form to add new beers", (done) => {
            request.get(`${base}new`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("New Beer");
                done();
            });
        });
    });

    describe("POST /beers/create", () => {
        const options = {
            url: `${base}create`,
            form: {
                name: "Ellie's Brown Ale",
                description: "This beautiful, deep russet brew is dominated by a chocolate and brown sugar maltiness with hints of vanilla and nuts, producing a very smooth, well-balanced, and quaffable brown ale.",
                abv: 5.5,
                style: "Brown Ale",
                brewery: "Avery Brewing"
            }
        };
        it("should create a new beer and redirect", (done) => {
            request.post(options, (err, res, body) => {
                Beer.findOne({where: {name: "Ellie's Brown Ale"}})
                .then((beer) => {
                    expect(res.statusCode).toBe(303);
                    expect(beer.name).toBe("Ellie's Brown Ale");
                    expect(beer.description).toBe("This beautiful, deep russet brew is dominated by a chocolate and brown sugar maltiness with hints of vanilla and nuts, producing a very smooth, well-balanced, and quaffable brown ale.");
                    expect(beer.abv).toBe(5.5);
                    expect(beer.style).toBe("Brown Ale");
                    expect(beer.brewery).toBe("Avery Brewing");
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });
    });

    describe("GET /beers/:id", () => {
        it("should render a view of the selected beer's page", (done) => {
            request.get(`${base}${this.beer.id}`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Stone IPA");
                done();
            });
        });
    });

    describe("POST /beers/:id/destroy", () => {
        it("should delete the beer with the associated id", (done) => {
            Beer.findAll()
            .then((beers) => {
                const beerCountBeforeDelete = beers.length;
                expect(beerCountBeforeDelete).toBe(1);
                request.post(`${base}${this.beer.id}/destroy`, (err, res, body) => {
                    Beer.findAll()
                    .then((beers) => {
                        expect(err).toBeNull();
                        expect(beers.length).toBe(beerCountBeforeDelete - 1);
                        done();
                    })
                });
            });
        });
    });


});