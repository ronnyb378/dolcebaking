var express = require('express');
var router = express.Router();
const db = require('../models');
const orderid = require('order-id')('mysecret');

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

module.exports = router;