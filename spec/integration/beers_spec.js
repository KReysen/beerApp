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
});