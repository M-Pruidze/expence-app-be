const express = require('express');
const router = express.Router();

// importing controllers
const {
    allExpenses,
    newExpense,
    updatedExpense,
    deletedExpense,
    // deleteAllExpenses,
  } = require('../controllers/expense.controller');

// expense routes
router.get('/expense', allExpenses);
router.post('/expense', newExpense);
router.put('/expense/:id', updatedExpense);
router.delete('/expense/:id', deletedExpense);
// router.delete('/expense/', deleteAllExpenses);


module.exports = router;
