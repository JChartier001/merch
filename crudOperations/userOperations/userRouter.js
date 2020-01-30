const router = require("express").Router();
const Users = require("./userModel");
const Stores = require("../storeOperations/storeModel");
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

// @desc     Get a user by username
// @route    GET /api/users/:username
// @access   Private
router.get("/:username", restricted, async (req, res) => {
  try {
    const user = await Users.findByUsername(req.params.username);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error,
      message: "Unable to find this user, its not you.. its me"
    });
  }
});

// @desc     Edit a User
// @route    PUT /api/users/username
// @access   Private
router.put("/:username", restricted, async (req, res) => {
  try {
    const user = await Users.update(req.params.username, req.body);
    if (user) {
      res.status(200).json({ user, message: "Info updated!" });
    } else {
      res.status(404).json({ message: "That user could not be found!" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Could not edit this user, its not you.. its me"
    });
  }
});

// @desc     Delete a User
// @route    DELETE /api/users/:username
// @access   Private
router.delete("/:username", restricted, async (req, res) => {
  try {
    const count = await Users.remove(req.params.username);
    if (count > 0) {
      res.status(200).json({ message: "this User has been deleted!" });
    } else {
      res.status(404).json({ message: "User unable to be deleted!" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Error while deleting User, its not you.. its me"
    });
  }
});

// @desc     Get a users stores
// @route    GET /api/users/stores/:username
// @access   Private
router.get("/stores/:username", restricted, async (req, res) => {
  try {
    const stores = await Users.getUsersStores(req.params.username);

    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({
      error,
      message: "Unable to find this users stores, its not you.. its me"
    });
  }
});

// Export router
module.exports = router;
