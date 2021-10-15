const Expense = require('../models/expense.model');
const {
    allExpenses,
    newExpense,
    updatedExpense,
    deletedExpense,
    // deleteAllExpenses,
    } = require('../data/expense.data');

// get all expenses
module.exports.allExpenses = async (req,res) => {
    try {
        const result = await allExpenses(req.user._id);
        res.send(
            result,
        );
        console.log(`req.body`, req.body)
        console.log(`req.user`, req.user)
        console.log(`result`, result)
    } catch (error) {
        console.log(`error`, error)
        res.status(500)
            .send({
                message: "Internal server error",
                error: "Internal server",
                status: 500,
            });
    }
};



// create a new expense
module.exports.newExpense = async (req,res) => {
    try {
        if (typeof req.body.text == 'string' && typeof Number(req.body.cost) == 'number') {
            const result = await newExpense(req, res);
            res.send(result);
            console.log(`result`, result)
        } else {
            throw {
                message: "Invalid fields type",
                error: "Bad Request",
                status: 400,
            }
        }
    } catch (error) {
        console.log(`error`, error)
        if (error.status == 400) {
          res.status(error.status)
             .send(error);
        } else {
            console.log(`req.body`, req.body)
          res.status(500)
             .send({
                message: error.message,
                error: "Internal server",
                status: 500,
             });
        }

    }
};

// update an expense
module.exports.updatedExpense = async (req,res) => {
    try {
        if (typeof req.body.text == 'string' || typeof Number(req.body.cost) == 'number') {
            const result = await updatedExpense(req, res);
            res.send(result);
        } else {
            throw {
                message:"Invalid fields type",
                error: "Bad Request",
                status: 400,
            }
        }
    } catch (error) {
        if (error.status == 400) {
            res.status(error.status)
                .send(error);
        } else {
            res.status(500)
                .send({
                    message: "Internal server error",
                    error: "Internal server",
                    status: 500,
                });
        }
    }
};


// delete an expense
module.exports.deletedExpense = async (req,res) => {
    try {
        if (req.params.id && req.params.id.length >= 24) {
            const result = await deletedExpense(req, res);
            res.send(result);
        } else {
            throw {
                message: "Id not provided",
                error: "Bad Request",
                status: 400,
            }
        }
    } catch (error) {
        if (error.status == 400) {
            res.status(error.status)
               .send(error);
        } else {
            res.status(500)
                .send({
                    message: "Internal server error",
                    error: "Internal server",
                    status: 500,
                });
        }
    }
};
