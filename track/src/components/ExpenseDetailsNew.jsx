import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Typography, CircularProgress, Box
} from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${TableCell.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${TableCell.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function ExpenseDetailsNew() {
    const [expenses, setExpenses] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
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
    }, []);

    return (
        <TableContainer component={Paper} sx={{ mt: 4, p: { xs: 1, sm: 2, md: 3 } }}>
            <Typography variant="h6" sx={{ m: 2 }}>
                Expense Details
            </Typography>

            {loading ? (
                <CircularProgress sx={{ m: 2 }} />
            ) : (
                <Box sx={{ overflowX: 'auto' }}>
                    <Table sx={{ minWidth: 500 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell align="right">Amount (₹)</StyledTableCell>
                                <StyledTableCell align="right">Details</StyledTableCell>
                                <StyledTableCell align="right">Created Time</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {expenses.map((expense) => (
                                <StyledTableRow key={expense.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {expense.id}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {expense.spentAmount.toFixed(2)}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{expense.spentDetails}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        {new Date(expense.expenseCreatedTimeEpoch * 1000).toLocaleString()}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            )}
        </TableContainer>
    );
}
