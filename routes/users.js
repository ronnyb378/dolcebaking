var express = require('express');
var router = express.Router();
const db = require('../models')
// const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const checkAuth = require('../checkAuth');
const nodemailer = require('nodemailer');

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
              req.session.user = user
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
  
  // remove any data that does not need to be returned
  const { password, createdAt, updatedAt, date, ...userData } = user.dataValues;
  //login
  req.session.user = userData

  // respond with success
  res.json({
    success: 'Successfully logged in',
    user: req.session.user
  })
})

router.get('/current', checkAuth, async (req, res) => {
  const user = await db.User.findByPk(req.session.user.id)
  if(!user) {
    res
      .status(401)
      .json({
        error: 'Not logged in'
      })
    return
  }
  const { password, ...userData } = user.dataValues;

  res.json(userData)
})

// guest users
router.get('/login/guest', async (req, res) => {
  db.User.findOne({
    where: {
      id: "1"
    }
  })
    .then((user) => {
      if (user) {
        req.session.user = user
        res.status(400).json({
          user: req.session.user
        })
        return
      } else {
        res.json({ message: 'something went wrong'})
      }
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


// send token to user's email
router.patch('/recovery', async (req, res) => {
  const {email} = req.body;

  await db.User.findOne({
    where: {
      email: email
    }
  })
  .then((user) => {
    if (!user) {
      return res
        .status(400)
        .json({error: 'User with this email does not exist'})
    }
    if (user.resetLink !== null ) {
      res
      .status(400)
      .json({error: "Email has already been sent to this user"})
    }
    const { password, ...userData } = user.dataValues;
    const token = jwt.sign(userData, process.env.RESET_PASSWORD_KEY, {expiresIn: '20m'});

    var transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    var mailOptions = {
      from: 'youremail@gmail.com',
      to: `${email}`,
      subject: 'Sending Email using Node.js',
      html: `<h2>Please click on given link to reset your password</h2>
              <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>
      `
    };

    db.User.update({
      resetLink: token
    }, {
      where: {
        id: userData.id
      }
    }).then(data => {
      transport.sendMail(mailOptions, function(error, info) {
        if (error) {
          res.json({error: error})
        } else { 
          console.log("*************")
          console.log('Email sent: ' + info.response)
          db.User.sync()
          res.json({success: `Email has been sent to ${email}` })
        }
      })
    }).catch(function(err) {
      if (err) {
        res.status(400).json({error: "Something went wrong"})
      }
    })
  })
})

// change password after email sent
router.patch('/resetpassword', (req, res) => {
  const {resetLink, newPass } = req.body
  if(resetLink) {
    jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, function (error, decodedData) {
      if (error) {
        return res.status(401).json({
          error: "Incorrect or expired token"
        })
      }
      db.User.findOne({
        where: {
          resetLink: resetLink
        }
      }).then(user => {
        if (!user) {
          return res
            .status(400)
            .json({error: 'User with this token does not exist'})
        }
        bcrypt.hash(newPass, 10)
        .then((hash) => {
        db.User.update({
          password: hash,
          resetLink: null
        }, {
          where: {
            id: user.id
          }
        }).then(function() {
          db.User.sync()
          res.status(200).json({success: "Password successfully changed"})
        })
      })
    }).catch(function (err) {
        if (err) {
          res.status(400).json({error: "Something went wrong"})
        }
      })
      
    })
  }
})


module.exports = router;
