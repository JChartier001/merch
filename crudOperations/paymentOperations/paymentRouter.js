const router = require("express").Router();

if (process.env.NODE_ENV !== 'production') require('dotenv').config({ path: "./config/config.env" });

const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST_KEY); //Change STRIPE_SECRET_TEST_KEY to STRIPE_SECRET_KEY to collect payments when stripe goes LIVE.


router.post('/', async (req, res) => {
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
    const paymentIntent = await stripe.paymentIntents.create({
     amount: Data.amount,
     currency: Data.currency,
     payment_method_types: ['card'],
     application_fee_amount: 1 * 100  // placeholder value 
    }, {
        stripeAccount: `{{${CONNECTED_STRIPE_ACCOUNT_ID_TEST}}}`
    })
    // stripe.charges.create(Data, (stripeErr, stripeRes) => {
    //     if (stripeErr) {
    //         res.status(500).json({ error: stripeErr });
    //         console.log('Stripe Error',stripeErr)
    //     } else {
    //         res.status(200).json({ success: stripeRes })
    //     }
    // })

})

router.post('/create-payment-intent', async (req, res) => {
  
    const data = req.body;
    console.log('payment intent data',data)
    const amount = data.amount

    //scalable press cost should be app fee (shipping?)
    const calculateOrderAmount = (items) => {
        // Replace this constant with a calculation of the order's amount
        // Calculate the order total on the server to prevent
        // people from directly manipulating the amount on the client
    }
   

    await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd', // currency doesn't exist in obj from front end
      application_fee_amount: 100,
      transfer_data: {
        destination: `{{${CONNECTED_STRIPE_ACCOUNT_ID_TEST}}}`
      },
    }).then(function(paymentIntent) {
      try {
        return res.send({
          publishableKey: process.env.STRIPE_PUBLISHABLE_KEY_TEST,
          clientSecret: paymentIntent.client_secret
        });
      } catch (err) {
        return res.status(500).send({
          error: err.message
        });
      }
    }); 
});




module.exports = router;