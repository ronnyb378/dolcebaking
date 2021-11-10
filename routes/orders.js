var express = require('express');
const db = require('../models');
var router = express.Router();


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

    // const user = await db.User.findByPk(req.session.user.id) 
    // try {
    //     const order = await user.createOrder({
    //         orderId: 'test',
    //         cartArray: 'test',
    //         firstName: req.session.user.firstName,
    //         lastName: req.session.user.lastName,
    //         email: req.session.user.email
    //     })
    //     res.json(order)
    // } catch (e) {
    //     res.status(400).json({ error: e })
    //     console.error(e)
    // }
    db.Order.create({
        orderId: 'test',
        cartArray: 'test',
        firstName: req.session.user.firstName,
        lastName: req.session.user.lastName,
        email: req.session.user.email,
        UserId: 56
    })
        .then((order) => {
            res.json({order: order})
        })
    // res.json({
    //     Order: newOrder
    // }) 

});

module.exports = router;
