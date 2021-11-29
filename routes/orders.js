var express = require('express');
const db = require('../models');
var router = express.Router();
const orderid = require('order-id')('mysecret');

router.post('/neworder', async function (req, res, next) {
    const newOrder = {
        // need to store the following in one order
        // the menu item, quantity, flavor is applicable
        N506: {
            Empanadas: {
                Flavor: {
                    Strawberry: { Dozen: 0, HalfDozen: 0 },
                    Nutella: { Dozen: 0, HalfDozen: 0 },
                    Cajeta: { Dozen: 0, HalfDozen: 0 },
                    Pineapple: { Dozen: 0, HalfDozen: 0 }
                }
            },
            Cookies: {
                Dozen: 0,
                HalfDozen: 0,
                Flavor: 'None'
            },
            PoundCake: {
                Dozen: 0,
                HalfDozen: 0
            },
            Strawberry: {
                Dozen: 0,
                HalfDozen: 0
            }
        }
    }
    
    const id = orderid.generate();
    db.Order.create({
        orderId: id,
        cartArray: 'cart order goes here',
        firstName: req.session.user.firstName,
        lastName: req.session.user.lastName,
        email: req.session.user.email,
        UserId: 56,
    })
    .then((order) => {
        res.json({ order: order })
    })
});

module.exports = router;