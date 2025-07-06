import React, { useState } from 'react';
import {
  Box, Typography, Paper, CircularProgress, IconButton,
  Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

export default function ExpenseDetails({ expenseData, isLoading, onUpdate, onDelete }) {
  const [editExpense, setEditExpense] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [formState, setFormState] = useState({ spentAmount: '', spentDetails: '' });

  const handleEditOpen = (expense) => {
    setEditExpense(expense);
    setFormState({
      spentAmount: expense.spentAmount,
      spentDetails: expense.spentDetails,
    });
  };


  const handleEditClose = () => {
    setEditExpense(null);
    setFormState({ spentAmount: '', spentDetails: '' });
  };

  const handleEditSave = () => {
    if (
      formState.spentAmount !== editExpense.spentAmount ||
      formState.spentDetails !== editExpense.spentDetails
    ) {
      onUpdate(editExpense.expenseId, formState); // Call update only if changed
    }
    handleEditClose();
  };

  const handleDelete = () => {
    onDelete(deleteConfirm.expenseId);
    setDeleteConfirm(null);
  };

  if (isLoading) return <CircularProgress sx={{ mt: 4 }} />;

  if (!expenseData || expenseData.length === 0) {
    return (
      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h6">No Expense Details Found</Typography>
        <Paper
          key={1}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <Box>
            <Typography variant="subtitle1">
              ₹ 0.00
            </Typography>
            <Typography variant="body2" color="text.secondary">
              spentDetails
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date().toLocaleString()}
            </Typography>
          </Box>

          <Box>
            <IconButton color="primary">
              <Edit />
            </IconButton>
            <IconButton color="error">
              <Delete />
            </IconButton>
          </Box>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">Expense Details</Typography>

      {expenseData.map((expense) => (
        <Paper
          key={expense.id}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <Box>
            <Typography variant="subtitle1">
              ₹ {expense.spentAmount.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {expense.spentDetails}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(expense.expenseCreatedTime * 1000).toLocaleString()}
            </Typography>
          </Box>

          <Box>
            <IconButton onClick={() => handleEditOpen(expense)} color="primary">
              <Edit />
            </IconButton>
            <IconButton onClick={() => setDeleteConfirm(expense)} color="error">
              <Delete />
            </IconButton>
          </Box>
        </Paper>
      ))}

      {/* Edit Dialog */}
      <Dialog open={!!editExpense} onClose={handleEditClose}>
        <DialogTitle>Edit Expense</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Spent Amount"
            type="number"
            fullWidth
            value={formState.spentAmount}
            onChange={(e) =>
              setFormState({ ...formState, spentAmount: parseFloat(e.target.value) || 0 })
            }
          />
          <TextField
            margin="dense"
            label="Spent Details"
            type="text"
            fullWidth
            value={formState.spentDetails}
            onChange={(e) => setFormState({ ...formState, spentDetails: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this expense: <strong>{deleteConfirm?.spentDetails}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}


