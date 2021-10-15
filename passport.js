const passport = require('passport');
const User = require('./src/models/user.model');
const localStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require('bcrypt');

passport.use(new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
},
  (email, password, cb) => {
  return User.findOne({ email: email})
         .then( async user => {
            const compare = await bcrypt.compare(password, user.password);
            console.log(`compare`, compare);
            if (!compare) return cb(null, false, { message: 'incorrect email or password' });
            return cb(null, user, { message: 'Logged in' });
         })
         .catch(err => cb(err));
  }
));


passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
},
  (jwtPayload, cb) => {
    return User.findById(jwtPayload._id)
           .then(user => {
             return cb(null, user);
           })
           .catch(err => {
             return cb(err);
           });
  }
));
