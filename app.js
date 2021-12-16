var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const db = require('./models')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const store = new SequelizeStore({ db: db.sequelize })
store.sync()
require('dotenv').config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var orderRouter = require('./routes/orders');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    session({
        secret: 'AprilMarch', // used to sign the cookie
        resave: false, // update session even w/ no changes
        saveUninitialized: true, // always create a session
        cookie: {
            secure: false, // true: only accept https req's
            maxAge: 2592000, // time in seconds
        },
        store: store,
    })
);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/orders', orderRouter);

module.exports = app;
