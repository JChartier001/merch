const router = require("express").Router();
const Stores = require("../storeOperations/storeModel");
const restricted = require("../../globalMiddleware/restrictedMiddleware");

// @desc     Post a Store
// @route    POST /api/stores
// @access   Private
router.post("/", restricted, async (req, res) => {
  try {
    const { active, store_name, hero_imageURL, logo_url, username } = req.body;

    const store = await Stores.insert({
      active,
      store_name,
      hero_imageURL,
      logo_url
    });

    if (store) {
      Stores.insertStoresUsers(store.store_name, username);
      res
        .status(201)
        .json({ store, message: "You have successfully added a Store!" });
    } else {
      res.status(400).json({ message: "please include all required content" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Unable to add this store, its not you.. its me"
    });
  }
});

// @desc     Get all stores
// @route    GET /api/stores
// @access   Private
router.get("/", restricted, async (req, res) => {
  try {
    const stores = await Stores.find();
    res.status(200).json(stores);
  } catch (error) {
    res
      .status(500)
      .json({ error, message: "Unable to get stores, its not you.. its me" });
  }
});

// @desc     Get a store by ID
// @route    GET /api/stores/:id
// @access   Private
router.get("/:id", restricted, async (req, res) => {
  try {
    const user = await Stores.findById(req.params.id);
    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({
      error,
      message: "Unable to find this store id, its not you.. its me"
    });
  }
});

// @desc     Get a store by Name
// @route    GET /api/stores/:store_name
// @access   Private
router.get("/:store_name", restricted, async (req, res) => {
  try {
    const store = await Stores.findByStoreName(req.params.store_name);
    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({
      error,
      message: "Unable to find this store, its not you.. its me"
    });
  }
});

// @desc     Edit a Store
// @route    PUT /api/stores/:store_name
// @access   Private
router.put("/:store_name", restricted, async (req, res) => {
  try {
    const store = await Stores.update(req.params.store_name, req.body);
    if (store) {
      res.status(200).json({ store, message: "Store info updated!" });
    } else {
      res.status(404).json({ message: "That store could not be found!" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Could not edit this store, its not you.. its me"
    });
  }
});

// @desc     Delete a Store
// @route    DELETE /api/stores/:store_name
// @access   Private
router.delete("/:store_name", restricted, async (req, res) => {
  try {
    const count = await Stores.remove(req.params.store_name);
    if (count > 0) {
      res.status(200).json({ message: "this Store has been deleted!" });
    } else {
      res.status(404).json({ message: "Store unable to be deleted!" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Error while deleting Store, its not you.. its me"
    });
  }
});

// @desc     Get a Stores Users
// @route    GET /api/stores/:store_name/users
// @access   Private
router.get("/:store_name/users", restricted, async (req, res) => {
  try {
    const users = await Stores.getStoresUsers(req.params.store_name);
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: "Please enter a valid store name" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Unable to find this Stores Users, its not you.. its me"
    });
  }
});

// @desc     Get a stores products
// @route    GET /api/store/:store_name/products
// @access   Private
router.get("/:store_name/products", restricted, async (req, res) => {
  try {
    const products = await Stores.getStoresProducts(req.params.store_name);

    if (products) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: "Please enter a valid store name" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Unable to find this Stores products, its not you.. its me"
    });
  }
});

// Export router
module.exports = router;
