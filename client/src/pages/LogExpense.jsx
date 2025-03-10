import { Box, Button, styled, TextField, Typography } from "@mui/material";
import Header from "../components/Header";
import Dropdown from "../components/Dropdown";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routePath } from "../routes/route";
import { saveExpense } from "../components/services/api";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const Component = styled(Box)({
    padding: '80px 200px',
    background: '#F5F5F5'
})

const Container = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    background: '#FFFFFF',
    alignItems: 'center',
    padding: '0 70px',
    borderRadius: 20,
    '& > p': {
        fontSize: 35,
        fontWeight: 600,
        opacity: '0.7'
    }
})

const FormWrapper = styled(Box) ({
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    marginTop:20,
    borderRadius: 20,
    background: '#FFFFFF',
    '& > *':{
        marginTop: '20px !important'
    }
})

const defaultObj = {
    amount: 0,
    category: '',
    description: '',
    date: null,
}

const options = {
    category: ['Housing & Utilities', 'Food & Groceries', 'Transportation', 'Health & Medical', 'Personal & Lifestyle', 'Entertainment & Recreation', 'Education & Learning', 'Family & Dependents', 'Savings & Investments', 'Debt & Loans', 'Gifts & Donations', 'Miscellaneous'],

}

const LogExpense = () => {
    const [data, setData] = useState(defaultObj);
    const image = "expense2.png";

    const handleChange = (e, field) => {
        if (field === "date") {
            setData({ ...data, date: e ? dayjs(e).format("YYYY-MM-DD") : null });
        } else {
            setData({ ...data, [e.target.name]: e.target.value });
        }
    };

    const saveExpenses = async () => {
        await saveExpense(data);
        navigate(routePath.expenses);
    }

    const navigate = useNavigate();
    return(
        <>
        <Header/>
        <Component>
            <Container>
                <Typography>Log an Expense</Typography>
                <img src={image} alt="create" style={{width: 400, height: 350}}/>
            </Container>
            <FormWrapper>
                <TextField
                    placeholder="Amount"
                    name="amount"
                    onChange={handleChange}
                />
                <Dropdown
                    label="Expense Category"
                    id='expense-type-label'
                    value={data.category}
                    handleChange={handleChange}
                    name="category"
                    options={options.category}
                />
                <TextField
                    placeholder="Description"
                    name="description"
                    onChange={handleChange}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                    label="Select a Date" 
                    value={data.date ? dayjs(data.date) : null}
                    onChange={(newValue) => handleChange(newValue, "date")} 
                    renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                
                <Button variant="contained" onClick={() => saveExpenses()}>Save Expense</Button>
            </FormWrapper>
        </Component>
        </>
    )
}

export default LogExpense;