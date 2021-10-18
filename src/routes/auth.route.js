const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Validate = require('../libs/validate');
const bcrypt = require('bcrypt');

// login
router.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) return res.status(404).json({
      message: 'неверная почта или пароль',
      error: "Bad Request",
      statusCode: "404",
    });
    if (err) res.send(err);
    const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_TTL });
    return res.json({ user, token, note: "pass this token in header as a bearerToken :)))" });
  })(req, res);
});

// sign up
router.post('/', async (req, res, next) => {
  try {
    if (
      Object.keys(req.body.firstName).length == 0 ||
      Object.keys(req.body.email).length == 0 ||
      Object.keys(req.body.lastName).length == 0 ||
      Object.keys(req.body.password).length == 0
      ) {
      throw {
        message: 'пожалуйста, заполните все поля',
        error: "Bad request",
        status: '400',
      };
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
      throw new Error('пожалуйста, введите правильный адрес электронной почты');
    }
    const userEmail = await User.find({ email: req.body.email });
    if (userEmail.length > 0) {
      throw {
        message: `${req.body.email} уже используется`,
        error: 'Conflict',
        status: '409',
      };
    }

    const invalidParameters = Validate.checkParamsPresent(req.body, ['firstName', 'lastName', 'email', 'password']);
    if (invalidParameters.length > 0) {
      throw {
        message: "invalid parameters: " + invalidParameters,
        error: "Bad request",
        status: '400',
      };
    }
    const user = new User({
      'firstName': req.body.firstName,
      'lastName': req.body.lastName,
      'email': req.body.email,
      'password': req.body.password,
    });
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;

    user.save((err, user) => {
      if (err) return next(err);
      res.send({
        result: user,
      });
    });
  } catch (error) {
        if (error.status == '400') {
          res.status(error.status)
             .send(error);
        } else if (error.status == '409') {
          res.status(error.status)
             .send(error);
        } else {
          res.status('500')
             .send({
                message: error.message,
                error: "Internal server",
                status: 500,
             });
        }
  }
});

module.exports = router;
