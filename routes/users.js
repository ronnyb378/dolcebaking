var express = require('express');
var router = express.Router();
const db = require('../models')
const bcrypt = require('bcrypt')

// users signup
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
  } else if (req.body.password != req.body.confirmed_password) {
    res.status(400).json({
      error: 'Password does not match'
    })
    return
  }
  // check if username or email has been taken
  db.User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then((user) => {
      if (user) {
        res.status(400).json({
          error: 'Email already associated with another account',
          message: user.email,
          req: req.body.email
        })
        return
      }
      bcrypt.hash(req.body.password, 10)
        .then((hash) => {
          dateCreated = new Date()
          db.User.create({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            phoneNumber: req.body.phone_number,
            date: dateCreated
          })
            .then((user) => {
              res.status(201).json({
                success: user
              })
            })
        })
    })

});

// users login
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
  req.session.user = user

  // remove any data that does not need to be returned
  const { email, username, ...userData } = user.dataValues;

  // respond with success
  res.json({
    success: 'Successfully logged in',
    user: {email, username}
  })
})

// guest users
router.get('/login/guest', async (req, res) => {
  const guest = db.User.findOne({
    where: {
      username: 'Guest'
    }
  })
    .then((user) => {
      if (user) {
        req.session.user = guest
        res.json({
          message: "Guest Logged in",
          user: req.session.user
        })
      } 
      return
    })
})

// logout users
router.get('/logout', (req, res) => {
  if (!req.session.user) {
    res.json({ message: "User not logged in"})
  } else { 
    req.session.destroy()
    res.json({
      message: 'Succesfully logged out',
      session: req.session
    })
  }
})
module.exports = router;
