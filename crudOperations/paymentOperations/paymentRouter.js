const router = require("express").Router();

if (process.env.NODE_ENV !== 'production') require('dotenv').config({ path: "./config/config.env" });

const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST_KEY); //Change STRIPE_SECRET_TEST_KEY to STRIPE_SECRET_KEY to collect payments when stripe goes LIVE.


router.post('/', (req, res) => {
    const Data = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    };

    stripe.charges.create(Data, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).json({ error: stripeErr });
            console.log(stripeErr)
        } else {
            res.status(200).json({ success: stripeRes })
        }
    })

})




module.exports = router;