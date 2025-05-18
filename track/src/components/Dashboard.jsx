import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Typography,
    Paper,
    CircularProgress,
    Grid,
    Stack
} from '@mui/material';

const Dashboard = () => {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://127.0.0.1:8080/api/expense/summary/1')
            .then((response) => {
                setSummary(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching summary:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    const getColor = (exceeded) => (exceeded ? '#f44336' : '#4caf50'); // red : green

    return (
        <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ width: '100%' }}
                margin={{ xs: 2, sm: 2, md: 4 }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        p: 2,
                        backgroundColor: getColor(summary.exceeded),
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: { xs: 'row', sm: 'column', md: 'row' },
                        gap: 1
                    }}
                >
                    <Typography variant="h6">Expense</Typography>
                    <Typography variant="h6">{summary.totalSpent}</Typography>
                </Paper>

                <Paper
                    elevation={3}
                    sx={{
                        p: 2,
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: { xs: 'row', sm: 'column', md: 'row' },
                        gap: 1
                    }}
                >
                    <Typography variant="h6">Remaining</Typography>
                    <Typography variant="h6">{summary.remaining}</Typography>
                </Paper>

                <Paper
                    elevation={3}
                    sx={{
                        p: 2,
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: { xs: 'row', sm: 'column', md: 'row' },
                        gap: 1
                    }}
                >
                    <Typography variant="h6">Daily Budget</Typography>
                    <Typography variant="h6">{summary.budget}</Typography>
                </Paper>
            </Stack>
        </Box>
    );
};

export default Dashboard;