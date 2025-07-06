import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import {
    Box, Typography, Paper, Snackbar,
    Alert, Button, useMediaQuery, useTheme
} from '@mui/material';
import ExpenseForm from './ExpenseForm';
import ExpenseDetails from './ExpenseDetails';
import LoadingPage from './LoadingPage';  // ✅ Removed WhileLoadingPage
import UpdateBudgetForm from './BudgetForm';

const Dashboard = ({ userLoggedIn }) => {
    const [expenses, setExpenses] = useState([]);
    const userId = localStorage.getItem('userId');

    const [summaryData, setSummaryData] = useState({
        totalSpent: 0,
        remaining: 0,
        budget: 0,
        exceeded: false
    });
    const [loading, setLoading] = useState(true);
    const [openForm, setOpenForm] = useState(false);
    const [openUpdateBudget, setOpenUpdateBudget] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const token = localStorage.getItem('token');  // ✅ Added for Authorization

    const fetchSummary = useCallback(() => {
        axios.get(`http://127.0.0.1:8080/api/expense/summary/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                setSummaryData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching summary", err);
                setLoading(false);
            });
    }, [userId, token]);

    const fetchExpenses = useCallback(() => {
        axios.get(`http://localhost:8080/api/expense/get/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => {
                setExpenses(res.data.data || []);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching expenses", error);
                setLoading(false);
            });
    }, [userId, token]);

    useEffect(() => {
        if (userLoggedIn) {
            fetchExpenses();
            fetchSummary();
        } else {
            const demoExpenses = localStorage.getItem('demoUserExpenses');
            const demoSummary = localStorage.getItem('demoUserSummary');
            try {
                const parsedExpenses = demoExpenses ? JSON.parse(demoExpenses) : [];
                const parsedSummary = demoSummary ? JSON.parse(demoSummary) : {
                    totalSpent: 1500, remaining: 500, budget: 2500, exceeded: false
                };
                setExpenses(parsedExpenses);
                setSummaryData(parsedSummary);
            } catch (error) {
                console.error("Failed to parse demo data", error);
                setExpenses([]);
                setSummaryData({ totalSpent: 0, remaining: 0, budget: 0, exceeded: false });
            }
            setLoading(false);
        }
    }, [userLoggedIn, fetchExpenses, fetchSummary]);

    const handleUpdateExpense = (id, updatedData) => {    // ✅ Fixed onUpdate
        axios.post(`http://localhost:8080/api/expense/update/${id}`, updatedData, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                setSuccessMessage('Expense updated successfully!');
                setShowSuccess(true);
                fetchExpenses();
                fetchSummary();
            })
            .catch(err => console.error("Error updating expense", err));
    };

    const handleDeleteExpense = (id) => {   // ✅ Fixed onDelete
        axios.post(`http://localhost:8080/api/expense/delete/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                setSuccessMessage('Expense deleted successfully!');
                setShowSuccess(true);
                fetchExpenses();
                fetchSummary();
            })
            .catch(err => console.error("Error deleting expense", err));
    };

    const getColor = (exceeded) => (exceeded ? '#f44336' : '#4caf50');
    const showValue = (exceeded) => (exceeded ? 'Extra Spent' : 'Remaining');

    if (loading) return <LoadingPage />;  // ✅ Removed WhileLoadingPage entirely

    return (
        <Box sx={{ p: { xs: 2, sm: 4 } }}>
            <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2, flex: 1 }}>
                    <Paper sx={{ flex: 1, p: 2, bgcolor: getColor(summaryData.exceeded), color: 'white' }}>
                        <Typography variant="h6">Expense</Typography>
                        <Typography variant="h5">{summaryData.totalSpent}</Typography>
                    </Paper>
                    <Paper sx={{ flex: 1, p: 2, bgcolor: 'primary.main', color: 'white' }}>
                        <Typography variant="h6">{showValue(summaryData.exceeded)}</Typography>
                        <Typography variant="h5">{summaryData.remaining}</Typography>
                    </Paper>
                    <Paper sx={{ flex: 1, p: 2, bgcolor: 'secondary.main', color: 'white' }}>
                        <Typography variant="h6">Budget</Typography>
                        <Typography variant="h5">{summaryData.budget}</Typography>
                    </Paper>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2, mt: 2 }}>
                <Button variant="contained" fullWidth={isMobile} sx={{ flex: isMobile ? 'none' : 4 }} onClick={() => setOpenForm(true)}>Add Expense</Button>
                <Button variant="contained" color="error" fullWidth={isMobile} sx={{ flex: isMobile ? 'none' : 4 }} onClick={() => setOpenUpdateBudget(true)}>Update Budget</Button>
            </Box>

            <ExpenseDetails
                expenseData={expenses}
                isLoading={loading}
                onUpdate={handleUpdateExpense}   // ✅ Corrected onUpdate
                onDelete={handleDeleteExpense}   // ✅ Corrected onDelete
            />

            <ExpenseForm
                open={openForm}
                onClose={() => setOpenForm(false)}
                onSuccess={() => {
                    setSuccessMessage('Expense added successfully!');
                    setShowSuccess(true);
                    fetchExpenses();
                    fetchSummary();
                }}
            />

            <UpdateBudgetForm
                open={openUpdateBudget}
                onClose={() => setOpenUpdateBudget(false)}
                onSuccess={() => {
                    setSuccessMessage('Budget updated successfully!');
                    setShowSuccess(true);
                    fetchSummary();
                }}
            />

            <Snackbar open={showSuccess} autoHideDuration={2000} onClose={() => setShowSuccess(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={() => setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
                    {successMessage || 'Operation successful!'}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Dashboard;
