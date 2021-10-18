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
    userId: {
        type: String,
        required: true,
      },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },

});

expenseSchema.set('timestamps', true);
const Expense = mongoose.model('expenses', expenseSchema);

module.exports = Expense;
