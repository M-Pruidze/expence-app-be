const mongoose = require('mongoose');
const {Schema} = mongoose;

const expenseSchema = new Schema({
    text: {
        type: String,
        required: true
      },
    cost: {
        type: Number,
        required: true
      },
});

const Expense = mongoose.model('expenses', expenseSchema);

module.exports = Expense;
