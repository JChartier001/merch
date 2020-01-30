const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

//////    import Router files    //////
const authRouter = require("./authOperations/authRouter");
const userRouter = require("./crudOperations/userOperations/userRouter");
const storeRouter = require("./crudOperations/storeOperations/storeRouter");
// const cartRouter = require("./crudOperations/cartOperations/cartRouter");
// const orderRouter = require("./crudOperations/orderOperations/orderRouter");
// const productRouter = require("./crudOperations/productOperations/productRouter");
// const orderDetailsRouter = require("./crudOperations/orderDetailsOperations/orderDetailsRouter");

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
server.use("/api/stores", storeRouter);
// server.use("/api/cart", cartRouter);
// server.use("/api/orders", orderRouter);
// server.use("/api/products", productRouter);
// server.use("/api/orderDetails", orderDetailsRouter);

//testing that the server works
server.get("/", (req, res) => {
  res.status(200).json({ status: "The Merch Dropper server is running!!" });
});

module.exports = server;
