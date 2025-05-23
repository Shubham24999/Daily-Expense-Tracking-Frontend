
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box, Typography, Paper, CircularProgress, Snackbar,
    Alert, Button, useMediaQuery, useTheme
} from '@mui/material';
import ExpenseForm from './ExpenseForm';
import ExpenseDetails from './ExpenseDetails';

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);

    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openForm, setOpenForm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const fetchSummary = () => {
        axios.get('http://127.0.0.1:8080/api/expense/summary/1')
            .then(res => {
                console.log("Summary data", res.data);

                setSummary(res.data);
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
            .then((data) => {
                setExpenses(data.data || []);
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

    return (
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
                        bgcolor: getColor(summary.exceeded),
                        color: 'white'
                    }}>
                        <Typography variant="h6">Expense</Typography>
                        <Typography variant="h5">{summary.totalSpent}</Typography>
                    </Paper>

                    <Paper sx={{
                        flex: 1,
                        p: 2,
                        bgcolor: 'primary.main',
                        color: 'white'
                    }}>
                        <Typography variant="h6">{showValue(summary.exceeded)}</Typography>
                        <Typography variant="h5">{summary.remaining}</Typography>
                    </Paper>

                    <Paper sx={{
                        flex: 1,
                        p: 2,
                        bgcolor: 'secondary.main',
                        color: 'white'
                    }}>
                        <Typography variant="h6">Budget</Typography>
                        <Typography variant="h5">{summary.budget}</Typography>
                    </Paper>
                </Box>

            </Box>

            {/* Button below cards on mobile */}
            {isMobile ? (
                <Box mt={2}>
                    <Button variant="contained" fullWidth onClick={() => setOpenForm(true)}>
                        Add Expense
                    </Button>
                </Box>
            ) : (
                <Button variant="contained" onClick={() => setOpenForm(true)} sx={{ height: 'fit-content' }}>
                    Add Expense
                </Button>
            )}

            <ExpenseDetails expenseData={expenses} isLoading={loading} />

            {/* Add Expense Modal */}
            <ExpenseForm
                open={openForm}
                onClose={() => setOpenForm(false)}
                onSuccess={() => {
                    setShowSuccess(true);
                    fetchSummary();      // ✅ update summary
                    fetchExpenses();     // ✅ update list
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
        </Box>
    );
};

export default Dashboard;
