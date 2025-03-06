const express = require('express');
const { addExpense, getExpenses, filterExpenses, getTotalExpenses } = require('../controllers/expenseController');

const router = express.Router();

router.post('/log', addExpense);
router.get('/expenses', getExpenses);
router.get('/expenses/filter', filterExpenses);
router.get('/expenses/total', getTotalExpenses);

module.exports = router;