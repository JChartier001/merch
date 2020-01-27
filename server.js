const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

//////    import Router files    //////
const authRouter = require("./authOperations/authRouter");
const usersRouter = require("./crudOperations/userOperations/userRouter");

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
server.use("/api/users", usersRouter);

//testing that the server works
server.get("/", (req, res) => {
  res.status(200).json({ status: "The Party Planner server is running!!" });
});

module.exports = server;
