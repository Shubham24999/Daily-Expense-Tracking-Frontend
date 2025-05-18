import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress
} from '@mui/material';

export default function ExpenseDetails() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(1);

  useEffect(() => {
    fetch('http://127.0.0.1:8080/api/expense/get/1')
      .then((response) => response.json())
      .then((data) => {
        setExpenses(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching expenses:', error);
        setLoading(false);
      });
  }, []);

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ m: 2 }}>
        Expense List
      </Typography>
      {loading ? (
        <CircularProgress sx={{ m: 2 }} />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Spent Amount</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Created Time (Epoch)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.id}</TableCell>
                <TableCell>{expense.spentAmount}</TableCell>
                <TableCell>{expense.spentDetails}</TableCell>
                <TableCell>{new Date(expense.expenseCreatedTimeEpoch * 1000).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}
