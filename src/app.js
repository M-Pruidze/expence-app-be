require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const routes = require('./routes/route');

mongoose.connect(process.env.URI, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}))

app.use(cors());
app.use('/', routes);

module.exports = app;
