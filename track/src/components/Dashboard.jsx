
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box, Typography, Paper, CircularProgress, Snackbar,
    Alert, Button, useMediaQuery, useTheme
} from '@mui/material';
import ExpenseForm from './ExpenseForm';
import ExpenseDetails from './ExpenseDetails';
import WhileLoadingPage from './WhileLoadingPage';
import UpdateBudgetForm from './BudgetForm';

const Dashboard = () => {

    // const userLoggedIn = localStorage.getItem('token') === null ? false : true;
    const userLoggedIn = !!localStorage.getItem('token'); // cleaner way

    const [expenses, setExpenses] = useState([]);
    var userId = localStorage.getItem('userId');

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

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const fetchSummary = () => {
        axios.get(`http://127.0.0.1:8080/api/expense/summary/${userId}`)
            .then(res => {
                console.log("Summary data", res.data);

                setSummaryData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching summary", err);
                setLoading(false);
            });
    };

    const fetchExpenses = () => {

        axios.get(`http://localhost:8080/api/expense/get/${userId}`)
            .then((res) => {
                console.log("Expenses data", res.data);
                setExpenses(res.data.data || []);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching expenses", error);
                setLoading(false);
            });

    };


    useEffect(() => {
        if (userLoggedIn) {
            fetchExpenses();
            fetchSummary();
        } else {
            // Load demo data from localStorage
            const demoExpenses = localStorage.getItem('demoUserExpenses');
            const demoSummary = localStorage.getItem('demoUserSummary');

            try {
                const parsedExpenses = demoExpenses ? JSON.parse(demoExpenses) : [];
                const parsedSummary = demoSummary ? JSON.parse(demoSummary) : {
                    totalSpent: 1500,
                    remaining: 500,
                    budget: 2500,
                    exceeded: false,
                };

                setExpenses(parsedExpenses);
                setSummaryData(parsedSummary);
            } catch (error) {
                console.error("Failed to parse demo user data", error);
                setExpenses([]);
                setSummaryData({
                    totalSpent: 0,
                    remaining: 0,
                    budget: 0,
                    exceeded: false,
                });
            }

            setLoading(false);
        }
    }, [userLoggedIn]);



    const getColor = (exceeded) => (exceeded ? '#f44336' : '#4caf50');

    const showValue = (exceeded) => (exceeded ? 'Extra Spent' : 'Remaining');

    if (loading) return <CircularProgress />;

    return (!loading ?
        <Box sx={{ p: { xs: 2, sm: 4 } }}>

            {/* Expenses + Add Button Container */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: 2,
                    alignItems: isMobile ? 'stretch' : 'center',
                    justifyContent: 'space-between',
                    mb: 3
                }}
            >
                {/* Cards Container */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: 2,
                        flex: 1
                    }}
                >
                    <Paper sx={{
                        flex: 1,
                        p: 2,
                        bgcolor: getColor(summaryData.exceeded),
                        color: 'white'
                    }}>
                        <Typography variant="h6">Expense</Typography>
                        <Typography variant="h5">{summaryData.totalSpent}</Typography>
                    </Paper>

                    <Paper sx={{
                        flex: 1,
                        p: 2,
                        bgcolor: 'primary.main',
                        color: 'white'
                    }}>
                        <Typography variant="h6">{showValue(summaryData.exceeded)}</Typography>
                        <Typography variant="h5">{summaryData.remaining}</Typography>
                    </Paper>

                    <Paper sx={{
                        flex: 1,
                        p: 2,
                        bgcolor: 'secondary.main',
                        color: 'white'
                    }}>
                        <Typography variant="h6">Budget</Typography>
                        <Typography variant="h5">{summaryData.budget}</Typography>
                    </Paper>
                </Box>

            </Box>

            {/* Buttons Section */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: 2,
                    mt: 2
                }}
            >
                <Button
                    variant="contained"
                    fullWidth={isMobile}
                    sx={{ flex: isMobile ? 'none' : 4 }}
                    onClick={() => setOpenForm(true)}
                >
                    Add Expense
                </Button>

                <Button
                    variant="contained"
                    color="error"
                    sx={{ flex: isMobile ? 'none' : 4 }}
                    fullWidth={isMobile}
                    onClick={() => setOpenUpdateBudget(true)}
                >
                    Update Budget
                </Button>
            </Box>

            <ExpenseDetails expenseData={expenses} isLoading={loading} />

            {/* Add Expense Modal */}
            <ExpenseForm
                open={openForm}
                onClose={() => setOpenForm(false)}
                onSuccess={() => {
                    setShowSuccess(true);
                    fetchSummary();
                    fetchExpenses();
                }}
            />

            <UpdateBudgetForm
                open={openUpdateBudget}
                onClose={() => setOpenUpdateBudget(false)}
                onSuccess={() => {
                    setShowSuccess(true);
                    fetchSummary();
                }}

            />


            {/* Toast */}
            <Snackbar
                open={showSuccess}
                autoHideDuration={2000}
                onClose={() => setShowSuccess(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
                    Expense added successfully!
                </Alert>
            </Snackbar>
        </Box> : <WhileLoadingPage />
    );
};

export default Dashboard;
