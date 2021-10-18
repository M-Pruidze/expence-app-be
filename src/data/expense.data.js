const Expense = require('../models/expense.model');

module.exports.allExpenses = async (user) => {
  const userIdToString = user._id.toString();
  const expenses = await Expense.find({userId: userIdToString});
  return expenses;
};

module.exports.newExpense = async (req, res) => {
  const expense = new Expense({
    text: req.body.text,
    cost: req.body.cost,
    userId: req.body.userId,
    // firstName: req.body.firstName,
    // lastName: req.body.lastName,
  });
  const newExpense = await expense.save();
  return newExpense;
};

module.exports.updatedExpense = async (req, res) => {
  const updatedExpense = await Expense.findOneAndUpdate({_id: req.params.id},{
    text: req.body.text,
    cost: req.body.cost,
  });
  return updatedExpense;
};

module.exports.deletedExpense = async (req, res) => {
  const deletedExpense = await Expense.findByIdAndRemove({_id: req.params.id});
  return deletedExpense;
};

// module.exports.deleteAllExpenses = async () => {
//   const deleteAllExpenses = await Expense.deleteMany({});
//   return deleteAllExpenses;
// };
