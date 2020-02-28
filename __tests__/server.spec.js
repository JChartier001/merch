const server = require("../server");
const request = require("supertest");
const db = require("../databaseOperations/db-config");
// const Users = require("../crudOperations/userOperations/userModel");

describe("ROUTE TESTING", () => {
  beforeAll(async () => {
    return (
      await db.migrate.rollback(),
      await db.migrate.latest(),
      await db.seed.run()
    );
  });

  afterAll(async () => {
    return await db.migrate.rollback();
  });

  //   vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv  SERVER STATUS  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv   //
  describe("Should be in testing enviroment", () => {
    it("should be in testing environment", () => {
      expect(process.env.DB_ENV).toBe("testing");
    });
  });
  describe("Checking server status", () => {
    describe("Sanity check", () => {
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

  //   vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv  USER ROUTES  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv   //

  describe("USER ROUTES", () => {
    describe("should insert provided user into the database", () => {
      it("POST /api/auth/register", async () => {
        await request(server)
          .post("/api/auth/register")
          .send({
            first_name: "TESTUSER",
            last_name: "TESTUSER",
            username: "TESTUSER",
            password: "TESTUSER",
            stripe_account: "12345678912345678",
            address1: "7822 Test Drive",
            city: "Atlanta",
            state: "Georgia",
            zip_code: 30313,
            country: "USA",
            email: "merchdropper20@gmail.com"
          })
          .then(res => {
            expect(res.status).toBe(201);
          });
      });
      it("insert a new user with duplicate username and throw an error", async () => {
        await request(server)
          .post("/api/auth/register")
          .send({
            first_name: "TESTUSER",
            last_name: "TESTUSER",
            username: "TESTUSER",
            password: "TESTUSER",
            stripe_account: "12345678912345678",
            address1: "7822 Test Drive",
            city: "Atlanta",
            state: "Georgia",
            zip_code: 30313,
            country: "USA",
            email: "merchdropper20@gmail.com"
          })
          .then(res => {
            expect(res.status).toBe(500);
          });
      });
    });

    describe("should log a user into the database", () => {
      it("POST /api/auth/login", async () => {
        await request(server)
          .post("/api/auth/login")
          .send({
            username: "TESTUSER",
            password: "TESTUSER"
          })
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
      it("invalid username", async () => {
        await request(server)
          .post("/api/auth/login")
          .send({
            username: "invalid",
            password: "TESTUSER"
          })
          .then(res => {
            expect(res.status).toBe(401);
          });
      });
      it("invalid password", async () => {
        await request(server)
          .post("/api/auth/login")
          .send({
            username: "TESTUSER",
            password: "invalid"
          })
          .then(res => {
            expect(res.status).toBe(401);
          });
      });
    });

    describe("Gets all users", () => {
      it("GET /api/users", done => {
        request(server)
          .get("/api/users/")
          .then(response => {
            expect(response.statusCode).toBe(200);
            done();
          });
      });
    });

    describe("Get user by id", () => {
      it("GET /api/users/1", done => {
        request(server)
          .get("/api/users/1")
          .then(response => {
            expect(response.statusCode).toBe(200);
            done();
          });
      });
      it("Get a user that doesn't exist - status check", done => {
        request(server)
          .get("/api/users/999")
          .then(response => {
            expect(response.status).toBe(404);

            done();
          });
      });
      it("Get a user that doesn't exist - message check", done => {
        request(server)
          .get("/api/users/999")
          .then(response => {
            const expectedBody = { message: "That user could not be found!" };
            expect(response.body).toEqual(expectedBody);

            done();
          });
      });
    });

    describe("Get user by username", () => {
      it("GET /api/users/username/:username", done => {
        request(server)
          .get("/api/users/username/TESTUSER")
          .then(response => {
            expect(response.statusCode).toBe(200);
            done();
          });
      });
      it("Get a user that doesn't exist - status check", done => {
        request(server)
          .get("/api/users/username/DoesntExist")
          .then(response => {
            expect(response.status).toBe(404);

            done();
          });
      });
      it("Get a user that doesn't exist - message check", done => {
        request(server)
          .get("/api/users/username/DoesntExist")
          .then(response => {
            const expectedBody = { message: "That user could not be found!" };
            expect(response.body).toEqual(expectedBody);

            done();
          });
      });
    });

    describe("Edit a user by username", () => {
      it("PUT /api/users/username/:username", done => {
        request(server)
          .get("/api/users/username/TESTUSER")
          .then(response => {
            expect(response.statusCode).toBe(200);
            done();
          });
      });
      it("Edit a user that doesn't exist - status check", done => {
        request(server)
          .get("/api/users/username/DoesntExist")
          .then(response => {
            expect(response.status).toBe(404);

            done();
          });
      });
      it("Edit a user that doesn't exist - message check", done => {
        request(server)
          .get("/api/users/username/DoesntExist")
          .then(response => {
            const expectedBody = { message: "That user could not be found!" };
            expect(response.body).toEqual(expectedBody);

            done();
          });
      });
    });

    describe("Delete a user by username", () => {
      it("PUT /api/users/username/:username", done => {
        request(server)
          .get("/api/users/username/TESTUSER")
          .then(response => {
            expect(response.statusCode).toBe(200);
            done();
          });
      });
      it("Delete a user that doesn't exist - status check", done => {
        request(server)
          .get("/api/users/username/DoesntExist")
          .then(response => {
            expect(response.status).toBe(404);

            done();
          });
      });
      it("Delete a user that doesn't exist - message check", done => {
        request(server)
          .get("/api/users/username/DoesntExist")
          .then(response => {
            const expectedBody = { message: "That user could not be found!" };
            expect(response.body).toEqual(expectedBody);

            done();
          });
      });
    });

    //   vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv  STORE ROUTES  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv   //

    //   vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv  DESIGN ROUTES  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv   //

    //   vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv  PRODUCT STATUS  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv   //

    //   vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv  QUOTE ROUTES  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv   //

    //   vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv  ORDER ROUTES  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv   //

    //   vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv  PRODUCT STATUS  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv   //

    // it('', () => {
    // placeholder
    // })
  });
});
