const Expense = require('../models/Expense');

const addExpense = async (req, res) => {
    try {
        const { description, amount, category, date } = req.body;
        const parsedDate = new Date(date + 'T00:00:00.000+05:30');

        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({ message: 'Invalid date format' });
        }
        const expense = new Expense({ description, amount, category, date: parsedDate });
        await expense.save();
        res.status(201).json({ message: 'Expense added successfully!', expense });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();
        const formattedExpenses = expenses.map(expense => ({
            ...expense._doc, 
            date: expense.date.toLocaleDateString('en-IN')
        }));
        res.status(200).json(formattedExpenses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

const filterExpenses = async (req, res) => {
    try {
        const { category, date } = req.query;
        const filter = {};
        if (category) filter.category = category;
        if (date) filter.date = new Date(date + 'T00:00:00.000+05:30');

        const expenses = await Expense.find(filter);
        const formattedExpenses = expenses.map(expense => ({
            ...expense._doc,
            date: expense.date.toLocaleDateString('en-IN')
        }));

        res.status(200).json(formattedExpenses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

const getTotalExpenses = async (req, res) => {
    try {
        const { start, end } = req.query;
        if (!start || !end) {
            return res.status(400).json({ message: "Start and end dates are required." });
        }
    
        const startDate = new Date(start + 'T00:00:00.000+05:30');
        const endDate = new Date(end + 'T23:59:59.999+05:30');
        endDate.setHours(23, 59, 59, 999);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.status(400).json({ message: "Invalid date format." });
        }

        const expenses = await Expense.find({
            date: { $gte: startDate, $lte: endDate }
        });

        const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
        res.status(200).json({ total });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

module.exports = { addExpense, getExpenses, filterExpenses, getTotalExpenses };
