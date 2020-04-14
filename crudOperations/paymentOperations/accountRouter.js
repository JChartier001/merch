const router = require("express").Router();
const Models = require("../helperVariables/models");

if (process.env.NODE_ENV !== 'production') require('dotenv').config({ path: "./config/config.env" });

const stripe = require('stripe')('sk_test_RRgLrJ77g7l5APlwZ9Tkna6g00NLWWukJR'); 

router.post('/accounts', async (req, res) => {
    
    let userCode = req.body.user_code;
    
    try{
        const response = await stripe.oauth.token({
            grant_type: 'authorization_code',
            code: userCode,
          });
        
        if(response){
            res.status(201).json({ message: "Account Number Aqcuired!", response });
        }
        else{
            res.status(500).json({ error: "There was an issue connecting your stripe account", response})
        }

    }
    catch(error){
        res.status(500).json({ error: "Stripe API error", error})
    }

});


router.post('/post', async (req, res) => {

    const stripeAcc = req.body.account_num;
    const id = req.body.id;
    try{
        const user = await Models.Users.insertStripeAccount(id, stripeAcc);
        if(user)
        {
            res.status(201).json({ message: "Sucessfully added the stripe account to DB =", user });
        }
    }
    catch(error){
        res.status(500).json({
            error,
            message: "Unable to find this user"
          });

    }


});

module.exports = router;