const Expense = require('../models/expense.model');


module.exports.allExpenses = async (userId) => {
  const userIdToString = userId.toString();
  const expenses = await Expense.find({userId: userIdToString});
  console.log(`expenses`, expenses);
  return expenses;
};


module.exports.newExpense = async (req, res) => {
  const expense = new Expense({
    text: req.body.text,
    cost: req.body.cost,
    userId: req.body.userId,
  });
  console.log(`here`)
  const newExpense = await expense.save();
  console.log(`newExpense`, newExpense)
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
