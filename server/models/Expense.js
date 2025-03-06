const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Expense', ExpenseSchema);