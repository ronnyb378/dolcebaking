var express = require('express');
var router = express.Router();
const db = require('../models');
const orderid = require('order-id')('mysecret');
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)


router.post('/neworder', async function (req, res, next) {
    const value = req.body.value
    const { firstName, lastName, email, completed, number } = req.body

    const id = orderid.generate();
    // console.log(value)
    try {
        db.Order.create({
            orderId: id,
            cart: value.cart,
            cartValues: value.cartValues,
            firstName,
            lastName,
            email,
            phoneNumber: number,
            completed,
            UserId: req.session.user.id,
        })
            .then((order) => {
                res.json({
                    order,
                    user: req.session.user,
                    success: "Order created successfully."
                })
            })
    } catch (error) {
        res.json({
            error: error.message,
            issue: true
            })
    }
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

// do a get route that will return all of the orders from the db in orders table
router.get("/past-orders", async function (req, res) {
    try {
        await db.Order.findAll({
            UserId: req.session.user.id
        })
            .then((orders) => { res.json(orders) }
            ).catch(function (err) {
                if (err) {
                    res.status(401).json({ error: "Unauthorized" })
                }
            })

    } catch (error) {
        res
            .status(401)
            .json({
                error: "Not authorized"
            })
    }
})

router.get("/all-orders", async function (req, res) {
    await db.Order.findAll({
        // raw: true
        attributes:
            ['createdAt', 'email', 'firstName', 'lastName', 'cartValues', 'cart', 'orderId', 'completed', 'phoneNumber'],
        order: [['id', 'DESC']]

    })
        .then((orders) => { res.json(orders) })
})

router.patch('/update-order', async (req, res) => {
    try {
    const {orderId, status } = req.body
    // const status = req.body
    const order = await db.Order.findOne({
        where: {
            orderId,
        }
    })

    db.Order.update({
        completed: status
    }, {
        where: {
            orderId: order.orderId
        }
    }).then(() => {
        db.Order.sync()
        res.json({ success: 'Changes made'})
    })
    } catch(error) {
        res.json({ error: 'An error occured'})
    }
})

module.exports = router;