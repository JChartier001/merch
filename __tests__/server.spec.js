const server = require("../server");
const request = require("supertest");
const db = require("../databaseOperations/db-config");
const Users = require("../crudOperations/userOperations/userModel");
const knex = require("knex");

describe("test suite", () => {
  beforeAll(async () => {
    return (
      await db.migrate.rollback(),
      await db.migrate.latest(),
      await db.seed.run()
    );
  });

  afterAll(() => {
    return db.migrate.rollback().then(() => db.destroy());
  });

  describe("server.js", () => {
    describe("index route", () => {
      it("should return an OK status code from the index route", async () => {
        const expectedStatusCode = 200;

        const response = await request(server).get("/");

        expect(response.status).toEqual(expectedStatusCode);
      });

      it("should return a JSON object from the index route", async () => {
        const expectedBody = {
          status: "The Merch Dropper server is running!!"
        };

        const response = await request(server).get("/");

        expect(response.body).toEqual(expectedBody);
      });

      it("should return a JSON object from the index route", async () => {
        const response = await request(server).get("/");

        expect(response.type).toEqual("application/json");
      });
    });
  });

  describe("user model", () => {
    describe("insert()", () => {
      it("should insert provided user into the database", async () => {
        await Users.insert({
          first_name: "Mark",
          last_name: "john",
          username: "markJohn",
          password: "secret",
          seller: true,
          stripe_account: "anything",
          address1: "cool address",
          city: "Chicago",
          state: "IL",
          zip_code: 60602,
          country: "Merica",
          email: "something@something.com"
        });
        await Users.insert({
          first_name: "Mark",
          last_name: "john",
          username: "markJohnny",
          password: "secret",
          seller: true,
          stripe_account: "anything",
          address1: "cool address",
          city: "Chicago",
          state: "IL",
          zip_code: 60602,
          country: "Merica",
          email: "something@something.com"
        });

        const users = await db("users");

        expect(users).toHaveLength(2);
      });

      it("should insert the provided user into the db", async () => {
        let user = await Users.insert({
          first_name: "Mark",
          last_name: "john",
          username: "something",
          password: "secret",
          seller: true,
          stripe_account: "anything",
          address1: "cool address",
          city: "Chicago",
          state: "IL",
          zip_code: 60602,
          country: "Merica",
          email: "something@something.com"
        });
        expect(user.first_name).toBe("Mark");
      });
    });
  });

  describe("User Router", () => {
    describe("CRUD Functionality", () => {
      it("Gets all users", done => {
        request(server)
          .get("/api/users/")
          .then(response => {
            expect(response.statusCode).toBe(200);
            done();
          });
      });

      it("Gets user by id but receives 404 error", done => {
        request(server)
          .get("/api/users/1")
          .then(response => {
            expect(response.statusCode).toBe(404);
            done();
          });
      });

      it("Creates a user w/ username sam and deletes it", async () => {
        await Users.insert({
          first_name: "Sam",
          last_name: "Jam",
          username: "sam",
          password: "secret",
          seller: true,
          stripe_account: "anything",
          address1: "cool address",
          city: "Chicago",
          state: "IL",
          zip_code: 60602,
          country: "Merica",
          email: "something@something.com"
        });
        request(server)
          .delete("/api/users/sam")
          .then(response => {
            expect(response.statusCode).toBe(200);
          });
      });

      // it('', () => {
      // placeholder
      // })
    });
  });
});
