import { useEffect, useState } from "react";
import { showAllExpenses, filterExpenses, getTotalExpenses } from "../components/services/api";
import { Box, Button, Table, styled, TextField, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import Header from "../components/Header";
import Dropdown from "../components/Dropdown";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const Container = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    background: '#FFFFFF',
    alignItems: 'center',
    maxWidth: '1000px',
    margin: '0 auto 40px auto',
    padding: '0 70px',
    borderRadius: 20,
    gap: '10px',
    '& > *': {
        flex: 1,
        maxWidth: 'calc((1000px - 30px) / 3)',
    },
    '& > button': {
        fontSize: 18,
        height: '56px',
        alignItems: 'center',
        justifyContent: 'center',
    },
    '& > Dropdown': {
        fontSize: 15,
    }
})

const TotalExpenseContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    background: '#FFFFFF',
    alignItems: 'center',
    maxWidth: '1000px',
    margin: '0 auto 40px auto',
    padding: '0 70px',
    borderRadius: 20,
    gap: '10px',
    '& > *': {
        flex: 1,
        maxWidth: 'calc((1000px - 30px) / 3)',
    },
    '& > button': {
        fontSize: 18,
        height: '56px',
        alignItems: 'center',
        justifyContent: 'center',
    },
    '& > Dropdown': {
        fontSize: 15,
    }
})

const options = {
    category: ['Housing & Utilities', 'Food & Groceries', 'Transportation', 'Health & Medical', 'Personal & Lifestyle', 'Entertainment & Recreation', 'Education & Learning', 'Family & Dependents', 'Savings & Investments', 'Debt & Loans', 'Gifts & Donations', 'Miscellaneous'],

}

const AllExpense = () => {
    const [expenses, setExpenses] = useState([]);
    const [category, setCategory] = useState("");
    const [date, setDate] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }

    useEffect(() => {
        const fetchExpenses = async () => {
            const response = await showAllExpenses();
            if (response?.data) {
                setExpenses(response.data);
            }
        };
        fetchExpenses();
    }, []);

    const applyFilters = async () => {
        const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : null;

        const response = await filterExpenses(category, formattedDate);
        if (response?.data) {
            setExpenses(response.data);
        }
    };

    const calcTotalExpense = async() => {
        const formattedStartDate = startDate ? dayjs(startDate).format("YYYY-MM-DD") : null;
        const formattedEndDate = endDate ? dayjs(endDate).format("YYYY-MM-DD") : null;

        const response = await getTotalExpenses(formattedStartDate, formattedEndDate);
        if (response?.data?.total) {
            setTotalAmount(response.data.total);
        }else{
            setTotalAmount(0);
        }
    };

    return (
        <>
            <Header />
            <Typography variant="h4" align="center" style={{ margin: "100px 0 40px 0" }}>
                All Expenses
            </Typography>
            <Container>
                <Dropdown
                    label="Expense Category"
                    id='expense-category-filter'
                    value={category}
                    handleChange={handleCategoryChange}
                    name="category"
                    options={options.category}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Date"
                        value={date}
                        onChange={(date) => setDate(date)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>

                <Button variant="contained" onClick={applyFilters}>Apply</Button>
            </Container>

            <TotalExpenseContainer>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Start Date"
                        value={startDate}
                        onChange={(date) => setStartDate(date)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>


                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="End Date"
                        value={endDate}
                        onChange={(date) => setEndDate(date)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>

                <Button variant="contained" onClick={calcTotalExpense}>Get Total Expenses</Button>
            </TotalExpenseContainer>

            <Box style={{ maxWidth: 1000, margin: "0 auto 40px auto" }} align="center">
                <h3>Total Expenses based on the start and end Date: ₹{totalAmount}</h3> 
            </Box>
            

            <TableContainer component={Paper} style={{ maxWidth: 1000, margin: "auto", border: "2px solid grey"}}>
                <Table>
                    <TableHead>
                        <TableRow style={{ fontSize: "1500px" }}>
                            <TableCell style={{ width: "15%", fontSize: "18px" }}><b>Date</b></TableCell>
                            <TableCell style={{ width: "15%", fontSize: "18px" }}><b>Amount</b></TableCell>
                            <TableCell style={{ width: "20%", fontSize: "18px" }}><b>Category</b></TableCell>
                            <TableCell style={{ width: "50%", fontSize: "18px" }}><b>Description</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {expenses.length > 0 ? (
                            expenses.map((expense, index) => (
                                <TableRow key={index}>
                                    <TableCell style={{ width: "15%", fontSize: "18px" }}>{expense.date}</TableCell>
                                    <TableCell style={{ width: "15%", fontSize: "18px" }}>{expense.amount}</TableCell>
                                    <TableCell style={{ width: "20%", fontSize: "18px" }}>{expense.category}</TableCell>
                                    <TableCell style={{ width: "50%", fontSize: "18px" }}>{expense.description}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    No expenses found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default AllExpense;
