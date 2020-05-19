const router = require("express").Router();

if (process.env.NODE_ENV !== 'production') require('dotenv').config({ path: "./config/config.env" });

const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST_KEY); //Change STRIPE_SECRET_TEST_KEY to STRIPE_SECRET_KEY to collect payments when stripe goes LIVE.


router.post('/', (req, res) => {
    // console.log('body sent to endpoint', req.body)
    const Data = {
        source: req.body.token.id,
        amount: Number(req.body.amount),
        currency: 'usd',
        receipt_email: req.body.email,
        shipping: {
            address: {
                line1: req.body.card.address_line1,
                city: req.body.card.address_city,
                country: req.body.country,
                line2: req.body.address_line2,
                postal_code: req.body.address_zip,
                state: req.body.address_state
            },
            name: req.body.card.name
        }
    };

    stripe.charges.create(Data, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).json({ error: stripeErr });
            console.log('Stripe Error',stripeErr)
        } else {
            res.status(200).json({ success: stripeRes })
        }
    })

})




module.exports = router;