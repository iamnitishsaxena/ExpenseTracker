import axios from 'axios'

const API_URL = "http://localhost:8080/api";
export const saveExpense = async (payload)=> {
    try {
    return await axios.post(`${API_URL}/log`, payload)
    } catch (error){
        console.log("Error: ", error.message);
        return error.response.data;
    }
}

export const showAllExpenses = async ()=> {
    try {
    return await axios.get(`${API_URL}/expenses`)
    } catch (error){
        console.log("Error: ", error.message);
        return error.response.data;
    }
}

export const filterExpenses = async (category, date)=> {
    try {
    return await axios.get(`${API_URL}/expenses/filter`, {
        params: {category, date}
    })
    } catch (error){
        console.log("Error: ", error.message);
        return error.response.data;
    }
}

export const getTotalExpenses = async (start, end)=> {
    try {
    return await axios.get(`${API_URL}/expenses/total`, {
        params: {start, end}
    })
    } catch (error){
        console.log("Error: ", error.message);
        return error.response.data;
    }
}