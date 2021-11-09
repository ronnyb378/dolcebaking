var express = require('express');
var router = express.Router();


router.get('/neworder', function (req, res, next) {
    const newOrder = {
        // need to store the following in one order
        // the menu item, quantity, flavor is applicable
        N506: {
            Empanadas: {
                Flavor: {
                    Strawberry: {Dozen: 0, HalfDozen: 0},
                    Nutella: {Dozen: 0, HalfDozen: 0},
                    Cajeta: {Dozen: 0, HalfDozen: 0},
                    Pineapple: {Dozen: 0, HalfDozen: 0}
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
    res.json({
        Order: newOrder
    }) 
    return
});

module.exports = router;
