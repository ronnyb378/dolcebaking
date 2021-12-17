var express = require('express');
// was getting error because of this line
// const { json } = require('sequelize/types');
var router = express.Router();
const db = require('../models');
const orderid = require('order-id')('mysecret');
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)


router.post('/neworder', async function (req, res, next) {
    const value = req.body.value
    const id = orderid.generate();
    // console.log(value)
    db.Order.create({
        orderId: id,
        products: value.products,
        itemDetail: value.itemDetail,
        cart: value.cart,
        cartValues: value.cartValues,
        // firstName: req.session.user.firstName,
        // lastName: req.session.user.lastName,
        // email: req.session.user.email,
        UserId: 56,
    })
    .then((order) => {
        res.json({ 
            order
        })
    })

    // ! test
    // console.log(value)
    // res.json({
    //     value
    //     // orderId: id
    // })
    // console.log(req)
});

router.post("/payment", async function (req, res) {
    let { amount, billing } = req.body
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            shipping: billing,
            description: "Dolce Desserts",
            // payment_method: id,
            // confirm: true
        });
        res
            .status(200)
            // .send(payment.client_secret)
            .json({
                message: "success",
                clientSecret: payment.client_secret
            })

    } catch (error) {
        console.log("Error", error);
        res.json({
            message: "Payment failed",
            success: false
        })
    }
})

module.exports = router;