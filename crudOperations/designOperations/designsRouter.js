const router = require("express").Router();
const Designs = require("../designOperations/designsModel");
const restricted = require("../../globalMiddleware/restrictedMiddleware");

// @desc     Post a Design
// @route    POST /api/designs
// @access   Private
router.post("/", restricted, async (req, res) => {
  try {
    const { store_name, username, design_name, design_url } = req.body;

    const design = await Designs.insert({
      store_name,
      username,
      design_name,
      design_url
    });

    if (design) {
      res
        .status(201)
        .json({ design, message: "You have successfully added this Design!" });
    } else {
      res.status(400).json({ message: "please include all required content" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Unable to add this design, its not you.. its me"
    });
  }
});

// @desc     Get all designs
// @route    GET /api/designs
// @access   Private
router.get("/", restricted, async (req, res) => {
  try {
    const designs = await Designs.find();
    res.status(200).json(designs);
  } catch (error) {
    res
      .status(500)
      .json({ error, message: "Unable to get designs, its not you.. its me" });
  }
});

// @desc     Get an design by designID
// @route    GET /api/designs/:designID
// @access   Private
router.get("/:designID", restricted, async (req, res) => {
  try {
    const design = await Designs.findById(req.params.designID);
    res.status(200).json(design);
  } catch (error) {
    res.status(500).json({
      error,
      message: "Unable to find this quote id, its not you.. its me"
    });
  }
});

// @desc     Edit a design by designID
// @route    PUT /api/designs/:designID
// @access   Private
router.put("/:designID", restricted, async (req, res) => {
  try {
    const design = await Designs.updateByDesignId(req.params.quoteID, req.body);
    if (design) {
      res
        .status(200)
        .json({ design, message: "Design info has been updated!" });
    } else {
      res.status(404).json({ message: "That design could not be found!" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Could not edit this design, its not you.. its me"
    });
  }
});

// @desc     Delete a design by designID
// @route    DELETE /api/designs/:designID
// @access   Private
router.delete("/:designID", restricted, async (req, res) => {
  try {
    const count = await Designs.removeByDesignId(req.params.designID);
    if (count > 0) {
      res.status(200).json({ message: "this Design has been deleted!" });
    } else {
      res.status(404).json({ message: "Could not find that design ID" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Error while deleting Design, its not you.. its me"
    });
  }
});

// Export router
module.exports = router;
