const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user.controller');
const expense = require('../routes/expense.route');

router.get('/profile', user_controller.profile);

router.use('/', expense);

module.exports = router;