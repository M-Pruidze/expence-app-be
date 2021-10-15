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
    console.log(`err`, err)
    console.log(`user`, user)
    if (err || !user) return res.status(400).json({ info });
     console.log(`login user`, user)
      if (err) res.send(err);
      const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_TTL });
      return res.json( {user, token, note:"pass this token in header as a bearerToken :)))"});
  })(req, res);
});

// sign up
router.post('/', async (req, res, next) => {
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
    res.send('please Enter correct email');
    return false;
  }
  User.find({ email: req.body.email }, ( err, user) => {
    if (user.length > 0) {
      res.send(req.body.email + " already in use");
      return false;
    }
  });
  if (Object.keys(req.body).length == 0) {
    res.status(400).send("empty parameters");
    return false;
  }
  const invalidParameters = Validate.checkParamsPresent(req.body, ['email', 'password']);
  if (invalidParameters.length > 0) {
    res.status(400).send({
      status: 400,
      result: "invalid parameters: " + invalidParameters,
    });
    return false;
  }
  const user = new User({
    'email': req.body.email,
    'password': req.body.password,
  });
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;

  user.save((err, user) => {
    if (err) return next(err);
    console.log(`save user`, user)
    res.send({
      result: user,
    });
  });
});

module.exports = router;
