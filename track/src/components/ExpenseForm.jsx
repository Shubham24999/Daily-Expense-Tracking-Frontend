import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Snackbar, Alert
} from '@mui/material';

import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ExpenseForm = ({ open, onClose, onSuccess }) => {
  var backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const token = localStorage.getItem('token'); // ✅ Retrieve token from storage

  const initialExpenseDetails = {
    spentDetails: '',
    spentAmount: '',
    date: Math.floor(Date.now() / 1000),
  };

  const [formData, setFormData] = useState(initialExpenseDetails);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (Number(formData.spentAmount) < 0) {
      toast.warn("Please use a valid number.");
      setFormData((prev) => ({ ...prev, spentAmount: '' }));
      return;
    }

    if (!formData.spentAmount || Number(formData.spentAmount) === 0) {
      setErrorMessage("Please add Spent Amount for the Expense.");
      setShowError(true);
      return;
    }

    const payload = {
      ...formData,
      spentAmount: Number(formData.spentAmount),
    };

    axios.post(`${backendUrl}/api/expense/add`, payload, {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Added token in header
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        onSuccess();
        onClose();
        setFormData(initialExpenseDetails);
        toast.success('Expense added successfully!');
      })
      .catch((err) => {
        console.error('Submit error', err);
        toast.error('Failed to add expense.');
      });
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

      {/* Snackbar for error messages */}
      <Snackbar
        open={showError}
        autoHideDuration={2000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowError(false)} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default ExpenseForm;
