var express = require('express');
var router = express.Router();
const db = require('../models')
const bcrypt = require('bcrypt')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
  // res.render('index', { title: 'Express' });
});

router.post('/login', async (req, res) => {
  // check for email and password
  if (!req.body.email || !req.body.password) {
    res.status(400).json({
      error: 'please include email and password'
    })
    return
  }
  // find user by email
  const user = await db.User.findOne({
    where: {
      email: req.body.email
    }
  })
  // checks if email exist in db
  if (!user) {
    res.status(404).json({
      error: 'could not find user with that email'
    })
    return
  }
  // check password
  const success = await bcrypt.compare(req.body.password, user.password)

  if (!success) {
    res.status(401).json({
      error: 'incorrect password'
    })
    return
  }
  //login
  console.log('this ran')
  req.session.user = user

  // respond with success
  res.json({
    success: 'Successfully logged in',
    user: user
  })
})
module.exports = router;
