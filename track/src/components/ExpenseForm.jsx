import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button
} from '@mui/material';
import axios from 'axios';

const ExpenseForm = ({ open, onClose, onSuccess }) => {
  
  var expenseDetails = {
    userId: 1,
    spentDetails: '',
    spentAmount: '',
    date: Math.floor(Date.now() / 1000),
  };

  const [formData, setFormData] = useState(expenseDetails);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'spentAmount' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = () => {
    axios.post('http://127.0.0.1:8080/api/expense/add', formData)
      .then(() => {
        onSuccess();
        onClose();
        setFormData(expenseDetails);
      })
      .catch((err) => console.error('Submit error', err));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"       // 'xs', 'sm', 'md', etc.
      fullWidth={true}   // limits width but doesn’t go full screen
      PaperProps={{
        sx: {
          p: 2,
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle>Add Expense</DialogTitle>
      <DialogContent>
        <TextField
          label="Spent Details"
          name="spentDetails"
          value={formData.spentDetails}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Spent Amount"
          name="spentAmount"
          type="number"
          value={formData.spentAmount}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExpenseForm;
