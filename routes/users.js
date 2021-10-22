var express = require('express');
var router = express.Router();
const db = require('../models')
const bcrypt = require('bcrypt')

/* GET users listing. */
router.post('/signup', function (req, res, next) {
  // check for username, email, and password fields (non sanitized, sanitization will be done with middleware using express-validator)
  if (!req.body.username) {
    res.status(400).json({
      error: 'Include a username'
    })
    return
  } else if (!req.body.email) {
    res.status(400).json({
      error: 'Email is required'
    })
    return
  } else if (!req.body.password) {
    res.status(400).json({
      error: 'Password is required'
    })
    return
  }

  // check if username or email has been taken
  db.User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then((user) => {
      if (user) {
        res.status(400).json({
          error: 'Username already in use',
          message: user.email,
          req: req.body.email
        })
        return
      } 
      else if (req.body.email === user.email) {
        res.status(400).json({
          error: 'Email is already used'
        })
        return
      }
      res.json({
        message: 'It happened'
      })
    })
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
