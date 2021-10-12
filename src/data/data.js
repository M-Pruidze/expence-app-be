const Expense = require('../model/model');

module.exports.allExpenses = async () => {
  const expenses = await Expense.find();
  return expenses;
};

module.exports.newExpense = async (req, res) => {
  const task = new Expense({
    text: req.body.text,
    cost: req.body.cost,
  });
  const newExpense = await task.save();
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
