require("dotenv").config();
require('./passport');
require('./data/db');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const auth = require('./routes/auth.route');
const user = require('./routes/user.route');
const passport = require('passport');

const routes = require('./routes/expense.route');

mongoose.connect(process.env.URI, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.json());

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use('/auth', auth);
app.use(passport.initialize());
app.use('/user/:id', passport.authenticate('jwt', {session: false}), user);
app.use('/', passport.authenticate('jwt', {session: false}), routes);


module.exports = app;
