const router = require("express").Router();
const Products = require("./productModel");

// const restricted = require("../../globalMiddleware/restrictedMiddleware");

// @desc     Post a product
// @route    POST /api/Products
// @access   Private
router.post("/", async (req, res) => {
  try {
    let product = req.body;
    if (product) {
      Products.insert(product);
      res.status(201).json({
        product,
        message: "You have successfully added this product!"
      });
    } else {
      res.status(400).json({ message: "please include all required content" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Unable to add this product, its not you.. its me"
    });
  }
});

// @desc     Post a mockup
// @route    POST /api/products/mockup
// @access   Private
router.post("/mockup", async (req, res) => {
  try {
    let data = req.body;

    if (data) {
      const URL = await Products.ShirtMaker(data);

      if (URL) {
        res.status(201).json({
          message: "product successfully sent to ScalablePress!",
          URL
        });
      }
    } else {
      res.status(400).json({ message: "please include all required content" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Error posting to ScalablePress, its not you.. its me"
    });
  }
});

// @desc     Get all Products
// @route    GET /api/Products
// @access   Private
router.get("/", async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ error, message: "Unable to get Products, its not you.. its me" });
  }
});

// @desc     Get an product by productID
// @route    GET /api/Products/:productID
// @access   Private
router.get("/:productID", async (req, res) => {
  try {
    const product = await Products.findById(req.params.productID);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      error,
      message: "Unable to find this quote id, its not you.. its me"
    });
  }
});

// @desc     Edit a product by productID
// @route    PUT /api/Products/:productID
// @access   Private
router.put("/:productID", async (req, res) => {
  try {
    const product = await Products.updateByProductId(
      req.params.productID,
      req.body
    );
    if (product) {
      res
        .status(200)
        .json({ product, message: "product info has been updated!" });
    } else {
      res.status(404).json({ message: "That product could not be found!" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Could not edit this product, its not you.. its me"
    });
  }
});

// @desc     Delete a product by productID
// @route    DELETE /api/Products/:productID
// @access   Private
router.delete("/:productID", async (req, res) => {
  try {
    const count = await Products.removeByProductId(req.params.productID);
    if (count > 0) {
      res.status(200).json({ message: "this product has been deleted!" });
    } else {
      res.status(404).json({ message: "Could not find that product ID" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Error while deleting product, its not you.. its me"
    });
  }
});

// Export router
module.exports = router;
