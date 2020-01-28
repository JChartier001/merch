const router = require("express").Router();
const Users = require("./userModel");
const Stores = require("./storeModel");
const restricted = require("../../globalMiddleware/restrictedMiddleware");

// @desc     Get all Users
// @route    GET /api/users
// @access   Private
router.get("/", restricted, async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error, message: "Unable to get users, its not you.. its me" });
  }
});

// @desc     Get a user by ID
// @route    GET /api/users/:id
// @access   Private
router.get("/:id", restricted, async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error,
      message: "Unable to find this user id, its not you.. its me"
    });
  }
});

// @desc     Edit a  User
// @route    PUT /api/users:id
// @access   Private
router.put("/:id", restricted, async (req, res) => {
  try {
    const user = await Users.update(req.params.id, req.body);
    if (user) {
      res.status(200).json({ user, message: "Info updated!" });
    } else {
      res.status(404).json({ message: "User could not be found!" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Could not edit this user, its not you.. its me"
    });
  }
});

// @desc     Delete a User
// @route    DELETE /api/users:id
// @access   Private
router.delete("/:id", restricted, async (req, res) => {
  try {
    const count = await Users.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "User Deleted!" });
    } else {
      res.status(404).json({ message: "User unable to be deleted!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while deleting User, its not you.. its me" });
  }
});

// @desc     Get a users stores
// @route    GET /api/users/stores/:id
// @access   Private
router.get("/stores/:id", restricted, async (req, res) => {
  try {
    const stores = await Users.getUsersStores(req.params.id);

    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({
      error,
      message: "Unable to find this user id, its not you.. its me"
    });
  }
});

// Export router
module.exports = router;
