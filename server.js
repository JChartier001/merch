const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

//////    import Router files    //////
const authRouter = require("./authOperations/authRouter");
const userRouter = require("./crudOperations/userOperations/userRouter");
// const storeRouter = require("./crudOperations/storeOperations/storeRouter");
// const cartRouter = require("./crudOperations/cartOperations/cartRouter");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

//  pass this in cors if having bad cors issues

// {
//   origin: true,
//   credentials: true
// }

//////    Use routers    ///////
server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);
// server.use("/api/store", storeRouter);
// server.use("/api/cart", cartRouter);

//testing that the server works
server.get("/", (req, res) => {
  res.status(200).json({ status: "The Party Planner server is running!!" });
});

module.exports = server;
