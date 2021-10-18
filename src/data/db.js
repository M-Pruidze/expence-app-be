const DBCONFIG = require('./config.js');
const mongoose = require('mongoose');
const url = 'mongodb://'+DBCONFIG.DBHOST+':'+DBCONFIG.DBPORT+'/'+DBCONFIG.DBNAME;
const mongoDB = process.env.URI || url;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true,});
mongoose.Promise =  global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
