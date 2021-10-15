require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


const auth = require('./routes/auth.route');
const user = require('./routes/user.route');
const passport = require('passport');
require('../passport');
require('./data/db');

const routes = require('./routes/expense.route');

mongoose.connect(process.env.URI, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.json());

app.use(cors());

module.exports = app;

app.use(express.urlencoded({ extended: false }));
app.use('/auth', auth);
app.use(passport.initialize());
app.use('/user/:id', passport.authenticate('jwt', {session: false}), user);
app.use('/', passport.authenticate('jwt', {session: false}), routes);

