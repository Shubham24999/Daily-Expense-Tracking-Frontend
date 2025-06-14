
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box, Typography, Paper, CircularProgress, Snackbar,
    Alert, Button, useMediaQuery, useTheme
} from '@mui/material';
import ExpenseForm from './ExpenseForm';
import ExpenseDetails from './ExpenseDetails';
import WhileLoadingPage from './WhileLoadingPage';
import UpdateBudgetForm from './UpdateBudgetForm';

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);

    const [summaryData, setSummaryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openForm, setOpenForm] = useState(false);
    const [openUpdateBudget, setOpenUpdateBudget] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const fetchSummary = () => {
        axios.get('http://127.0.0.1:8080/api/expense/summary/1')
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
        fetch('http://127.0.0.1:8080/api/expense/get/1')
            .then((response) => response.json())
            .then((res) => {
                setExpenses(res.data || []);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching expenses:', error);
                setLoading(false);
            });
    };


    useEffect(() => {
        fetchExpenses();
        fetchSummary();
    }, []);


    const getColor = (exceeded) => (exceeded ? '#f44336' : '#4caf50');

    const showValue = (exceeded) => (exceeded ? 'Extra Spent' : 'Remaining');

    if (loading) return <CircularProgress />;

    return (summaryData ?
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
                autoHideDuration={3000}
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
