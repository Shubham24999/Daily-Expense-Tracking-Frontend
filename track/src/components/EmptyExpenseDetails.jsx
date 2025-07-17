

import React from 'react';
import {
  Box, Typography, Paper, IconButton, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, Button
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

export default function EmptyExpenseDetails({
  expenseData,
  handleEditOpen,
  handleEditClose,
  handleEditSave,
  editExpense,
  formState,
  setFormState,
  deleteConfirm,
  setDeleteConfirm,
  handleDelete
}) {
  const isEmpty = !expenseData || expenseData.length === 0;

  const renderExpenseCard = (expense, isPlaceholder = false) => (
    <Paper
      key={isPlaceholder ? 'placeholder' : expense.id}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        borderRadius: 2,
        boxShadow: 2,
        opacity: isPlaceholder ? 0.5 : 1
      }}
    >
      <Box>
        <Typography variant="subtitle1">
          {isPlaceholder ? '₹ 0.00' : `₹ ${expense.spentAmount.toFixed(2)}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {isPlaceholder ? 'No Expense Details' : expense.spentDetails}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          'DD/MM/YYYY HH:MM'
        </Typography>
      </Box>

      {!isPlaceholder && (
        <Box>
          <IconButton onClick={() => handleEditOpen(expense)} color="primary">
            <Edit />
          </IconButton>
          <IconButton onClick={() => setDeleteConfirm(expense)} color="error">
            <Delete />
          </IconButton>
        </Box>
      )}
    </Paper>
  );

  return (
    <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">Expense Details</Typography>

      {isEmpty
        ? renderExpenseCard({}, true)   // Placeholder card when no data
        : expenseData.map((expense) => renderExpenseCard(expense))
      }

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
          <Button onClick={handleEditSave} variant="contained">Save</Button>
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
          <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
