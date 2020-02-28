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
  describe("Should be in testing environment", () => {
    it("should be in testing environment", () => {
      expect(process.env.DB_ENV).toBe("testing");
    });
  });
  describe("Checking server status", () => {
    describe("Sanity check", () => {
      it("should return an OK status code from the index route", async () => {
        const expectedStatus = 200;

        const response = await request(server).get("/");

        expect(response.status).toEqual(expectedStatus);
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
            expect(response.status).toBe(200);
            done();
          });
      });
    });

    describe("Get user by id", () => {
      it("GET /api/users/1", done => {
        request(server)
          .get("/api/users/1")
          .then(response => {
            expect(response.status).toBe(200);
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
            expect(response.status).toBe(200);
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
      it("PUT /api/users/:username", done => {
        request(server)
          .put("/api/users/TESTUSER")
          .send({
            first_name: "TESTUSEREDITED"
          })
          .then(response => {
            expect(response.status).toBe(200);
            done();
          });
      });
      it("Edit a user that doesn't exist - status check", done => {
        request(server)
          .put("/api/users/DoesntExist")
          .send({
            first_name: "TESTUSEREDITED"
          })
          .then(response => {
            expect(response.status).toBe(404);

            done();
          });
      });
      it("Edit a user that doesn't exist - message check", done => {
        request(server)
          .put("/api/users/DoesntExist")
          .send({
            first_name: "TESTUSEREDITED"
          })
          .then(response => {
            const expectedBody = { message: "That user could not be found!" };
            expect(response.body).toEqual(expectedBody);

            done();
          });
      });
    });

    describe("Delete a user by username", () => {
      it("DELETE /api/users/:username", done => {
        request(server)
          .delete("/api/users/TESTUSER")
          .then(response => {
            expect(response.status).toBe(200);
            done();
          });
      });
      it("Delete a user that doesn't exist - status check", done => {
        request(server)
          .delete("/api/users/DoesntExist")
          .then(response => {
            expect(response.status).toBe(404);

            done();
          });
      });
      it("Delete a user that doesn't exist - message check", done => {
        request(server)
          .delete("/api/users/DoesntExist")
          .then(response => {
            const expectedBody = { message: "User unable to be deleted!" };
            expect(response.body).toEqual(expectedBody);

            done();
          });
      });
    });

    //   vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv  STORE ROUTES  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv   //

    describe("STORE ROUTES", () => {
      describe("should insert provided store into the database", () => {
        it("POST /api/stores", async () => {
          await request(server)
            .post("/api/stores")
            .send({
              active: 1,
              store_name: "NewStore",
              hero_ImageURL:
                "https://www.dalesjewelers.com/wp-content/uploads/2018/10placeholder-silhouette-male.png",
              logo_url: "https://uxmasters.org/images/ant_logo.svg",
              userID: 1
            })
            .then(res => {
              expect(res.status).toBe(201);
            });
        });

        // Need to figure out this validation
        // it("Try to post store with taken store name", async () => {
        //   await request(server)
        //     .post("/api/stores")
        //     .send({
        //       active: 1,
        //       store_name: "NewStore",
        //       hero_ImageURL:
        //         "https://www.dalesjewelers.com/wp-content/uploads/2018/10placeholder-silhouette-male.png",
        //       logo_url: "https://uxmasters.org/images/ant_logo.svg",
        //       userID: 1
        //     })
        //     .then(res => {
        //       expect(res.status).toBe(400);
        //     });
        // });

        it("Try to insert store without everything required", async () => {
          await request(server)
            .post("/api/stores")
            .send({
              active: 1,
              //missing store name
              hero_ImageURL:
                "https://www.dalesjewelers.com/wp-content/uploads/2018/10placeholder-silhouette-male.png",
              logo_url: "https://uxmasters.org/images/ant_logo.svg",
              userID: 1
            })
            .then(res => {
              expect(res.status).toBe(400);
            });
        });
      });

      describe("Gets all stores", () => {
        it("GET /api/stores", done => {
          request(server)
            .get("/api/stores/")
            .then(response => {
              expect(response.status).toBe(200);
              done();
            });
        });
      });

      describe("Get a store by id", () => {
        it("GET /api/stores/1", done => {
          request(server)
            .get("/api/stores/1")
            .then(response => {
              expect(response.status).toBe(200);
              done();
            });
        });
        it("Get a store that doesn't exist - status check", done => {
          request(server)
            .get("/api/stores/999")
            .then(response => {
              expect(response.status).toBe(404);

              done();
            });
        });
        it("Get a store that doesn't exist - message check", done => {
          request(server)
            .get("/api/stores/999")
            .then(response => {
              const expectedBody = {
                message: "That store could not be found!"
              };
              expect(response.body).toEqual(expectedBody);

              done();
            });
        });
      });

      describe("Get store by name", () => {
        it("GET /api/stores/storename/:store_name", done => {
          request(server)
            .get("/api/stores/storename/NewStore")
            .then(response => {
              expect(response.status).toBe(200);
              done();
            });
        });
        it("Get a store that doesn't exist - status check", done => {
          request(server)
            .get("/api/stores/storename/DoesntExist")
            .then(response => {
              expect(response.status).toBe(404);

              done();
            });
        });
        it("Get a store that doesn't exist - message check", done => {
          request(server)
            .get("/api/stores/storename/DoesntExist")
            .then(response => {
              const expectedBody = {
                message:
                  "Please enter a valid store name, keep in mind that store names are case sensitive"
              };
              expect(response.body).toEqual(expectedBody);

              done();
            });
        });
      });

      describe("Edit a store by id", () => {
        it("PUT /api/stores/:id", done => {
          request(server)
            .put("/api/stores/1")
            .send({
              store_name: "NewStoreEDITED"
            })
            .then(response => {
              expect(response.status).toBe(200);
              done();
            });
        });
        it("Edit a store that doesn't exist - status check", done => {
          request(server)
            .put("/api/stores/999")
            .send({
              store_name: "NewStoreEDITED"
            })
            .then(response => {
              expect(response.status).toBe(404);

              done();
            });
        });
        it("Edit a store that doesn't exist - message check", done => {
          request(server)
            .put("/api/stores/999")
            .send({
              store_name: "NewStoreEDITED"
            })
            .then(response => {
              const expectedBody = {
                message: "That store could not be found!"
              };
              expect(response.body).toEqual(expectedBody);

              done();
            });
        });
      });

      describe("Delete a store by storename", () => {
        it("DELETE /api/stores/:storename", done => {
          request(server)
            .delete("/api/stores/NewStore")
            .then(response => {
              expect(response.status).toBe(200);
              done();
            });
        });
        it("Delete a store that doesn't exist - status check", done => {
          request(server)
            .delete("/api/stores/DoesntExist")
            .then(response => {
              expect(response.status).toBe(404);

              done();
            });
        });
        it("Delete a store that doesn't exist - message check", done => {
          request(server)
            .delete("/api/stores/DoesntExist")
            .then(response => {
              const expectedBody = {
                message:
                  "Please enter a valid store name, keep in mind that store names are case sensitive"
              };
              expect(response.body).toEqual(expectedBody);

              done();
            });
        });
      });

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
});
