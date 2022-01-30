var express = require('express');
var router = express.Router();
const db = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const checkAuth = require('../checkAuth');
const nodemailer = require('nodemailer');

// users signup
router.post('/signup', function (req, res, next) {
  const paswd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
  const phoneReg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

  if (!req.body.email || !req.body.first_name || !req.body.last_name || !req.body.phone_number || !req.body.password || !req.body.confirmed_password) {
    res.status(400).json({ error: "All fields are required!" })
    return
  } else if (!req.body.phone_number.match(phoneReg)) {
    res.status(400).json({ error: "Not a valid phone number" })
    return
  } else if (!req.body.password.match(paswd)) {
    res.status(400).json({ error: "Password must be 8-15 characters long, contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character" })
    return
  } else if (req.body.password != req.body.confirmed_password) {
    res.status(400).json({
      error: 'Passwords do not match'
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
            // username: req.body.username,
            email: req.body.email,
            password: hash,
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            phoneNumber: req.body.phone_number,
            date: dateCreated
          })
            .then((user) => {
              // req.session.user = user
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
  if (!user) {
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
        res.status(200).json({
          user: req.session.user,
          success: "Logged in as guest"
        })
        return
      } else {
        res.json({ message: 'something went wrong' })
      }
    })
})

// logout users
router.get('/logout', (req, res) => {
  if (!req.session.user) {
    res.json({ message: "User not logged in" })
  } else {
    req.session.destroy()
    res.json({
      success: 'Succesfully logged out',
      session: req.session
    })
  }
})


// send token to user's email
router.patch('/recovery', async (req, res) => {
  const { email } = req.body;

  await db.User.findOne({
    where: {
      email: email
    }
  })
    .then((user) => {
      if (!user) {
        return res
          .status(400)
          .json({ error: 'User with this email does not exist' })
      }
      if (user.resetLink !== null) {
        return res
          .status(400)
          .json({ error: `An email has already been sent to ${email}` })
      }
      const { password, ...userData } = user.dataValues;
      const token = jwt.sign(userData, process.env.RESET_PASSWORD_KEY, { expiresIn: '30m' });

      var transport = nodemailer.createTransport({
        // host: process.env.MAIL_HOST,
        // port: process.env.MAIL_PORT,
        // auth: {
        //   user: process.env.MAIL_USER,
        //   pass: process.env.MAIL_PASS
        // },
        service: 'gmail',
        auth: {
          user: process.env.TEMP_BUSINESS_EMAIL,
          pass: process.env.TEMP_BUSINESS_PASS
        }
        // tls: {
        //   rejectUnauthorized: false
        // }
      });

      var mailOptions = {
        from: 'dolcedesserts868@gmail.com',
        to: `${email}`,
        subject: 'Reset your Dolce Desserts password',
        html: `
      <!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<meta name="x-apple-disable-message-reformatting">
	<title></title>
	<!--[if mso]>
	<noscript>
		<xml>
            <o:OfficeDocumentSettings>
				<o:PixelsPerInch>96</o:PixelsPerInch>
			</o:OfficeDocumentSettings>
		</xml>
	</noscript>
	<![endif]-->
	<style>
		table, td, div, h1, p {font-family: Arial, sans-serif;}
		table, td {border:2px solid #000000 !important;}
    a {         background-color: #e86a92;
      text-decoration: none;
      border: none;
      color: #000000;
      padding: 14px 28px;
      text-align: center;
      display: inline-block;
      font-size: 14px;
      margin: 4px 2px;
      cursor: pointer; }
	</style>
</head>
<body style="margin:0;padding:0; background-color: #ffffff">
    <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background-color:#427CA9;">
		<tr>
			<td style="padding:5px 5px;">
				<h3>A request has been received to change the password for your Dolce Desserts account</h3>
        <a href="${process.env.CLIENT_URL}/resetpassword/${token}">Reset Password</a>
			</td>
		</tr>
	</table>
</body>
</html>
      `
      };

      db.User.update({
        resetLink: token
      }, {
        where: {
          id: userData.id
        }
      }).then(data => {
        transport.sendMail(mailOptions, function (error, info) {
          if (error) {
            res.json({ error: error })
          } else {
            console.log("*************")
            console.log('Email sent: ' + info.response)
            db.User.sync()
            res.json({ success: `An email has been sent to ${email}.` })
          }
        })
      }).catch(function (err) {
        if (err) {
          res.status(400).json({ error: "Something went wrong" })
        }
      })
    })
})

// change password after email sent
router.patch('/resetpassword', async (req, res) => {
  const { resetLink, newPass } = req.body
  if (resetLink) {
    try {
      jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, function (error, decodedData) {
        if (error) {
          console.log("*******", error.name)
          let response;
          switch (error.name) {
            case ("TokenExpiredError"):
              db.User.update({
                resetLink: null
              }, {
                where: {
                  resetLink: resetLink
                }
              }).then(function () {
                db.User.sync();
                response = res.status(401).json({ error: "This token has expired. Please have new token resent to your email." })
              })
              break;
            case ("JsonWebTokenError"):
              response = res.status(401).json({ error: "Invalid token" })
              break;
            default:
              response = res.status(400).json({ error: "Invalid token" })
          }
          return response
        }
        db.User.findOne({
          where: {
            resetLink: resetLink
          }
        }).then(user => {
          if (!user) {
            return res
              .status(400)
              .json({ error: 'User with this token does not exist' })
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
              }).then(function () {
                db.User.sync()
                res.status(200).json({ success: "Password successfully changed" })
              })
            })
        }).catch(function (err) {
          if (err) {
            res.status(400).json({ error: "Something went wrong" })
          }
        })

      })
    } catch (error) {
      if (error) {
        res.status(400).json({ error: "Something went wrong" })
      }
    }
  }
})


module.exports = router;
