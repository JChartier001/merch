const router = require("express").Router();
const Quotes = require("../quoteOperations/quoteModel");
// const restricted = require("../../globalMiddleware/restrictedMiddleware");

// @desc     Post a Quote
// @route    POST /api/quotes
// @access   Private
router.post("/", async (req, res) => {
  try {
    let data = req.body;

    if (data) {
      // console.log("----The whole thing passed from FE----", data);
      // console.log("---Just the id's needed for our BE---", data.quoteInfo);
      // console.log("---Info to be sent to SP---", data.spInfo);

      const spResponse = await Quotes.quoteMaker(data.spInfo);

      // console.log("data sent back from SP after BE post in ROUTER", spResponse);

      if (spResponse) {
        let quote = {
          userID: data.quoteInfo.userID,
          storeID: data.quoteInfo.storeID,
          total: spResponse.total,
          subtotal: spResponse.subtotal,
          tax: spResponse.tax,
          fees: spResponse.fees,
          shipping: spResponse.shipping,
          orderToken: spResponse.orderToken,
          warnings: spResponse.warnings,
          mode: spResponse.mode
        };
        // console.log(
        //   "quote info sent to our backend line 32 router------>",
        //   quote
        // );

        Quotes.insert(quote);
        res.status(201).json({
          message:
            "You have successfully added this Quote to our DB, spResponse is from SP!",
          quote,
          spResponse
        });
      }
    } else {
      res.status(400).json({ message: "please include all required content" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Unable to add this quote, its not you.. its me"
    });
  }
});

// @desc     Get all quotes
// @route    GET /api/quotes
// @access   Private
router.get("/", async (req, res) => {
  try {
    const quotes = await Quotes.find();
    // console.log(quotes);
    res.status(200).json(quotes);
  } catch (error) {
    res
      .status(500)
      .json({ error, message: "Unable to get quotes, its not you.. its me" });
  }
});

// @desc     Get an quote by quoteID
// @route    GET /api/quotes/:quoteID
// @access   Private
router.get("/:quoteID", async (req, res) => {
  try {
    const quote = await Quotes.findById(req.params.quoteID);
    res.status(200).json(quote);
  } catch (error) {
    res.status(500).json({
      error,
      message: "Unable to find this quote id, its not you.. its me"
    });
  }
});

// @desc     Get a quote by Scalable Press order token
// @route    GET /api/quotes/:orderToken
// @access   Private
router.get("/quotetoken/:orderToken", async (req, res) => {
  try {
    const quote = await Quotes.findByOrderToken(req.params.orderToken);

    if (quote) {
      res.status(200).json(quote);
    } else {
      res.status(404).json({
        message:
          "Please enter a valid quote token, keep in mind they are case sensitive"
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Unable to find this order id, its not you.. its me"
    });
  }
});

// @desc     Edit a quote by quoteID
// @route    PUT /api/quotes/:quoteID
// @access   Private
router.put("/:quoteID", async (req, res) => {
  try {
    const quote = await Quotes.updateByQuoteId(req.params.quoteID, req.body);
    if (quote) {
      res.status(200).json({ quote, message: "Quote info has been updated!" });
    } else {
      res.status(404).json({ message: "That quote could not be found!" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Could not edit this quote, its not you.. its me"
    });
  }
});

// @desc     Edit an quote by order token
// @route    PUT /api/quotes/ordertokenedit/:orderToken
// @access   Private
router.put("/ordertokenedit/:orderToken", async (req, res) => {
  try {
    // console.log(req.params.orderToken);
    const quote = await Quotes.updateByOrderToken(
      req.params.orderToken,
      req.body
    );
    // console.log(quote);
    if (quote) {
      res.status(200).json({ quote, message: "Quote info has been updated!" });
    } else {
      res.status(404).json({ message: "That quote could not be found!" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Could not edit this quote, its not you.. its me"
    });
  }
});

// @desc     Delete a quote by quoteID
// @route    DELETE /api/quotes/:quoteID
// @access   Private
router.delete("/:quoteID", async (req, res) => {
  try {
    const count = await Quotes.removeByQuoteId(req.params.quoteID);
    if (count > 0) {
      res.status(200).json({ message: "this Quote has been deleted!" });
    } else {
      res.status(404).json({ message: "Could not find that quote ID" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Error while deleting Quote, its not you.. its me"
    });
  }
});

// @desc     Delete a quote by order token
// @route    DELETE /api/quotes/:orderToken
// @access   Private
router.delete("/ordertoken/:orderToken", async (req, res) => {
  try {
    const count = await Quotes.removeByOrderToken(req.params.orderToken);
    if (count > 0) {
      res.status(200).json({ message: "this Quote has been deleted!" });
    } else {
      res
        .status(404)
        .json({ message: "Could not find that quote by given quote token" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Error while deleting Quote, its not you.. its me"
    });
  }
});

// Export router
module.exports = router;
