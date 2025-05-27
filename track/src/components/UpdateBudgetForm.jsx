import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button
} from '@mui/material';
import axios from 'axios';

const UpdateBudgetForm = ({ open, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    userId: 1,
    // spentDetails: '',
    budgetAmount: '',
    // spentAmount: '',
    // remainingAmount: '',
    // date: Math.floor(Date.now() / 1000),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = ['budgetAmount', 'spentAmount', 'remainingAmount'].includes(name)
      ? parseFloat(value)
      : value;

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue
    }));
  };

  const handleSubmit = () => {
    axios.post('http://127.0.0.1:8080/api/expense/update/budget', formData)
      .then(() => {
        onSuccess();
        onClose();
      })
      .catch((err) => console.error('Update error', err));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          p: 2,
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle>Update Budget</DialogTitle>
      <DialogContent>
        {/* <TextField
          label="Spent Details"
          name="spentDetails"
          value={formData.spentDetails}
          onChange={handleChange}
          fullWidth
          margin="normal"
        /> */}
        <TextField
          label="Budget Amount"
          name="budgetAmount"
          type="number"
          value={formData.budgetAmount}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        {/* <TextField
          label="Spent Amount"
          name="spentAmount"
          type="number"
          value={formData.spentAmount}
          onChange={handleChange}
          fullWidth
          margin="normal"
        /> */}

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateBudgetForm;
